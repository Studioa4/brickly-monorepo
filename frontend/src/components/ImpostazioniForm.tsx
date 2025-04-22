import React, { useEffect, useState } from "react";

export default function ImpostazioniForm() {
  const [voice, setVoice] = useState("female");
  const [sound, setSound] = useState(true);
  const [alwaysOn, setAlwaysOn] = useState(false);
  const [commands, setCommands] = useState<{ frase: string, azione: string, valore: string }[]>([]);
  const [newCommand, setNewCommand] = useState({ frase: "", azione: "navigate", valore: "" });

  useEffect(() => {
    setVoice(localStorage.getItem("brickly_voice_gender") || "female");
    setSound(localStorage.getItem("brickly_sound") !== "false");
    setAlwaysOn(localStorage.getItem("brickly_always_on") === "true");
    setCommands(JSON.parse(localStorage.getItem("brickly_custom_commands") || "[]"));
  }, []);

  const salva = () => {
    localStorage.setItem("brickly_voice_gender", voice);
    localStorage.setItem("brickly_sound", sound.toString());
    localStorage.setItem("brickly_always_on", alwaysOn.toString());
    localStorage.setItem("brickly_custom_commands", JSON.stringify(commands));
    alert("Impostazioni salvate");
  };

  const aggiungi = () => {
    if (newCommand.frase && newCommand.valore) {
      setCommands([...commands, newCommand]);
      setNewCommand({ frase: "", azione: "navigate", valore: "" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold">Voce assistente</h2>
      <select value={voice} onChange={e => setVoice(e.target.value)} className="border p-2 rounded">
        <option value="female">Femminile</option>
        <option value="male">Maschile</option>
      </select>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={sound} onChange={() => setSound(!sound)} />
          Suoni attivi (pling / click)
        </label>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={alwaysOn} onChange={() => setAlwaysOn(!alwaysOn)} />
          Attiva ascolto continuo (wake word: "Brickly")
        </label>
      </div>

      <h2 className="text-xl font-bold">Comandi personalizzati</h2>
      <div className="space-y-2">
        {commands.map((cmd, i) => (
          <div key={i} className="border p-2 rounded bg-gray-50">
            <strong>{cmd.frase}</strong> → {cmd.azione} → {cmd.valore}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <input placeholder="Frase" value={newCommand.frase} onChange={e => setNewCommand({ ...newCommand, frase: e.target.value })} className="border p-2 w-full" />
        <select value={newCommand.azione} onChange={e => setNewCommand({ ...newCommand, azione: e.target.value })} className="border p-2 w-full">
          <option value="navigate">Navigazione</option>
          <option value="api">Chiamata API</option>
        </select>
        <input placeholder="Valore" value={newCommand.valore} onChange={e => setNewCommand({ ...newCommand, valore: e.target.value })} className="border p-2 w-full" />
        <button onClick={aggiungi} className="bg-blue-500 text-white px-4 py-2 rounded">Aggiungi</button>
      </div>

      <button onClick={salva} className="bg-green-600 text-white px-6 py-2 rounded">Salva tutto</button>
    </div>
  );
}
