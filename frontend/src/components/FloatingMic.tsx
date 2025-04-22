import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const FloatingMic: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [capturedCommand, setCapturedCommand] = useState("");
  const recognitionRef = useRef<any>(null);
  const phaseRef = useRef<"initial" | "confirm">("initial");

  const playSound = (type: "start" | "end") => {
    const audio = new Audio(`/${type}.mp3`);
    audio.play().catch(() => {});
  };

  const speak = (text: string, callback?: () => void) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "it-IT";

    const gender = localStorage.getItem("brickly_voice_gender") || "female";
    utter.voice = synth
      .getVoices()
      .find((v) =>
        gender === "male"
          ? v.name.toLowerCase().includes("luca")
          : v.name.toLowerCase().includes("alice")
      ) || synth.getVoices()[0];

    if (callback) utter.onend = callback;
    synth.speak(utter);
  };

  const executeCommand = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("tema scuro")) {
      speak("Attivo il tema scuro.");
    } else if (t.includes("tema chiaro")) {
      speak("Attivo il tema chiaro.");
    } else if (t.includes("fornitori")) {
      speak("Apro la sezione fornitori.");
      navigate("/fornitori");
    } else if (t.includes("catasto")) {
      speak("Apro la sezione catasto.");
      navigate("/catasto");
    } else if (t.includes("logout")) {
      speak("Faccio il logout.");
      navigate("/login");
    } else {
      speak("Comando non riconosciuto.");
    }
    setTimeout(onClose, 1500);
  };

  const handleConfirmationResponse = (text: string) => {
    const t = text.toLowerCase();
    if (["sì", "si", "certo", "va bene"].some((w) => t.includes(w))) {
      executeCommand(capturedCommand);
    } else if (["no", "ripeti", "non ancora"].some((w) => t.includes(w))) {
      speak("Va bene, ripeti il comando.", () => startListening("initial"));
    } else if (t.includes("annulla")) {
      speak("Operazione annullata.");
      onClose();
    } else {
      speak("Non ho capito. Puoi ripetere?", () => startListening("confirm"));
    }
  };

  const startListening = (phase: "initial" | "confirm") => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "it-IT";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setListening(true);
      playSound("start");
    };

    recognition.onend = () => {
      setListening(false);
      playSound("end");
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;

      if (text.toLowerCase().includes("annulla")) {
        speak("Operazione annullata.");
        onClose();
        return;
      }

      if (phase === "initial") {
        setCapturedCommand(text);
        speak("Hai detto: " + text + ". Confermi?", () => startListening("confirm"));
        phaseRef.current = "confirm";
      } else {
        handleConfirmationResponse(text);
      }
    };

    recognition.onerror = () => {
      speak("Errore nel riconoscimento vocale.");
      onClose();
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  useEffect(() => {
    startListening("initial");
    return () => recognitionRef.current?.stop();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="w-32 h-32 rounded-full bg-red-600 animate-pulse flex items-center justify-center shadow-2xl">
        <span className="text-white text-5xl">🎤</span>
      </div>
    </div>
  );
};

export default FloatingMic;
