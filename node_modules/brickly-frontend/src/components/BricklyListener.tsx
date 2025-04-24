import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function BricklyListener() {
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleCommand = (text: string) => {
    const comando = text.toLowerCase().replace("brickly", "").trim();

    const custom = JSON.parse(localStorage.getItem("brickly_custom_commands") || "[]");
    const match = custom.find((c: any) => comando.includes(c.frase.toLowerCase()));
    if (match) {
      if (match.azione === "navigate") navigate(match.valore);
      else if (match.azione === "api") fetch(match.valore, { method: "POST" });
      speak("Comando eseguito.");
      return;
    }

    if (comando.includes("logout")) navigate("/login");
    else if (comando.includes("fornitori")) navigate("/fornitori");
    else if (comando.includes("catasto")) navigate("/catasto");
    else speak("Comando non riconosciuto.");
  };

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "it-IT";
    synth.speak(utter);
  };

  useEffect(() => {
    const alwaysOn = localStorage.getItem("brickly_always_on") === "true";
    if (!alwaysOn) return;

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = true;
    recognition.lang = "it-IT";
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      if (transcript.toLowerCase().startsWith("brickly")) {
        handleCommand(transcript);
      }
    };

    recognition.onerror = () => {
      setTimeout(() => recognition.start(), 2000); // retry
    };

    recognition.onend = () => {
      setTimeout(() => recognition.start(), 1000);
    };

    recognition.start();
    recognitionRef.current = recognition;

    return () => recognitionRef.current?.stop();
  }, []);

  return null;
}
