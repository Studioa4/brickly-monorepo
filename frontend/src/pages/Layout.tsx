
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import FloatingMic from "../components/FloatingMic";
import BricklyListener from "../components/BricklyListener";

export default function Layout() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showAssistant, setShowAssistant] = useState(false);
  const alwaysOn = localStorage.getItem("brickly_always_on") === "true";

  const toggleMenu = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className={`${darkMode ? "dark" : ""} h-screen flex flex-col`}>
      <header className="bg-white border-b p-4 flex justify-center items-center shadow-sm relative z-10">
        <h1 onClick={() => navigate('/')} className="text-3xl font-extrabold text-gray-800 text-center cursor-pointer">
          BRICKLY
        </h1>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
          <button
            onClick={() => setShowAssistant(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-xl font-semibold shadow transition"
          >
            Brickly IA 🎤
          </button>
          <UserMenu />
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          onMouseLeave={() => setOpenMenu(null)}
          className="group relative w-[60px] hover:w-[220px] transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 shadow-md overflow-hidden"
        >
          <nav className="flex flex-col px-4 py-6 gap-3 text-sm text-gray-800 dark:text-white">
            {/* Banche dati */}
            <div className="relative">
              <button onClick={() => toggleMenu("banche")} className="text-left w-full px-2 py-1 rounded flex items-center gap-4 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">
                <span className="text-xl">🗃️</span>
                <span className="opacity-100 transition-all whitespace-nowrap text-lg font-medium group-hover:block hidden">Banche dati</span>
              </button>
              <div className={`transition-all overflow-hidden duration-300 ${openMenu === "banche" ? "max-h-60" : "max-h-0"} flex flex-col space-y-2 pl-10`}>
                <button onClick={() => navigate("/catasto")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">📍 Catasto</button>
                <button onClick={() => navigate("/fornitori")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">🧑‍🔧 Fornitori</button>
                <button onClick={() => navigate("/province")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">🗺️ Province</button>
                <button onClick={() => navigate("/comuni")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">🏛️ Comuni</button>
              </div>
            </div>

            {/* Archivi */}
            <div className="relative">
              <button onClick={() => toggleMenu("archivi")} className="text-left w-full px-2 py-1 rounded flex items-center gap-4 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">
                <span className="text-xl">📁</span>
                <span className="opacity-100 transition-all whitespace-nowrap text-lg font-medium group-hover:block hidden">Archivi</span>
              </button>
              <div className={`transition-all overflow-hidden duration-300 ${openMenu === "archivi" ? "max-h-60" : "max-h-0"} flex flex-col space-y-2 pl-10`}>
                <button onClick={() => navigate("/condomini")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">🏢 Condomini</button>
                <button onClick={() => navigate("/unita")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">🏠 Unità Immobiliari</button>
                <button onClick={() => navigate("/anagrafiche")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">👤 Anagrafiche</button>
                <button onClick={() => navigate("/tabelle")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">📊 Tabelle</button>
                <button onClick={() => navigate("/parti-comuni")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">🧱 Parti comuni</button>
                <button onClick={() => navigate("/impianti")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">🔌 Impianti</button>
              </div>
            </div>

            {/* Contabilità */}
            <div className="relative">
              <button onClick={() => toggleMenu("contabilita")} className="text-left w-full px-2 py-1 rounded flex items-center gap-4 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">
                <span className="text-xl">💰</span>
                <span className="opacity-100 transition-all whitespace-nowrap text-lg font-medium group-hover:block hidden">Contabilità</span>
              </button>
              <div className={`transition-all overflow-hidden duration-300 ${openMenu === "contabilita" ? "max-h-60" : "max-h-0"} flex flex-col space-y-2 pl-10`}>
                <button onClick={() => navigate("/piano-conti")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">🧾 Piano dei conti</button>
                <button onClick={() => navigate("/fatture")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">📑 Fatture</button>
                <button onClick={() => navigate("/banca")} className="text-left text-sm px-2 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">🏦 Banca</button>
              </div>
            </div>

            {/* Impostazioni */}
            <button onClick={() => navigate("/impostazioni")} className="text-left w-full px-2 py-1 rounded flex items-center gap-4 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">
              <span className="text-xl">⚙️</span>
              <span className="opacity-100 transition-all whitespace-nowrap text-lg font-medium group-hover:block hidden">Impostazioni</span>
            </button>

            {/* Logout */}
            <button onClick={() => navigate("/login")} className="text-left w-full px-2 py-1 rounded flex items-center gap-4 text-red-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors">
              <span className="text-xl">🔓</span>
              <span className="opacity-100 transition-all whitespace-nowrap text-lg font-medium group-hover:block hidden">Logout</span>
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 text-black dark:text-white overflow-auto">
          <Outlet />
        </main>
      </div>
      {showAssistant && <FloatingMic onClose={() => setShowAssistant(false)} />}
      <BricklyListener />
      {alwaysOn && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" title="Brickly in ascolto"></div>
        </div>
      )}
    </div>
  );
}
