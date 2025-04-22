import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserMenu: React.FC = () => {
  const { utente, logout } = useAuth();

  return (
    <div className="flex items-center gap-4 text-sm text-gray-700">
      <span className="hidden sm:inline">
        Benvenuto, <strong>{utente?.email}</strong>
      </span>
      <button
        onClick={logout}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
