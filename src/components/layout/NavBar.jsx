import React, { useState } from 'react';
import { LayoutDashboard, Bell, Search, UserCircle2, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-navy text-white px-8 py-4 flex justify-between items-center sticky top-0 z-[1000] shadow-2xl">
      <div className="flex items-center gap-4">
        <img src="/logo1.svg" alt="Logo" className="h-10 w-10" />
        <div>
          <h1 className="font-syne font-extrabold text-xl tracking-tighter uppercase leading-none">VidyaTrack</h1>
          <p className="text-[10px] font-bold text-blue-300 tracking-[0.2em] uppercase mt-1 leading-none">DEO Intel Portal • ASER Data</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center bg-white/10 px-4 py-2 rounded-full border border-white/10 focus-within:ring-2 focus-within:ring-saffron transition-all">
          <Search size={16} className="text-blue-300 mr-3" />
          <input 
            type="text" 
            placeholder="Search districts, states..." 
            className="bg-transparent text-sm focus:outline-none placeholder-blue-300/50 w-64 uppercase font-bold tracking-widest text-[10px]"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <Bell size={20} className="text-blue-200" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-saffron rounded-full ring-2 ring-navy animate-pulse"></span>
          </button>
          
          <div className="h-8 w-px bg-white/10"></div>
          
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-4 p-1 pl-3 rounded-xl hover:bg-white/10 transition-all border border-transparent hover:border-white/10 group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold font-syne uppercase tracking-wider group-hover:text-saffron transition-colors">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[10px] font-medium text-blue-400">
                  {user?.role} • {user?.district}
                </p>
              </div>
              <div className="relative">
                <UserCircle2 size={32} className="text-blue-100" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-navy"></div>
              </div>
              <ChevronDown size={14} className={`text-blue-300 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 overflow-hidden animate-fade-in z-50">
                <div className="px-4 py-3 border-b border-gray-50 mb-2">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Session</p>
                   <p className="text-navy font-bold text-sm truncate">{user?.name}</p>
                </div>
                
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-navy transition-colors">
                  <UserCircle2 size={18} />
                  Profile Settings
                </button>
                
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  Terminate Session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

