import React from 'react';
import { LayoutDashboard, Bell, Search, UserCircle2 } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="bg-navy text-white px-8 py-4 flex justify-between items-center sticky top-0 z-[1000] shadow-2xl">
      <div className="flex items-center gap-4">
        {/* <div className="bg-saffron p-2 rounded-xl shadow-lg ring-4 ring-white/10 group-hover:scale-110 transition-transform">
          <LayoutDashboard size={24} className="text-white" />
        </div> */}
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
            className="bg-transparent text-sm focus:outline-none placeholder-blue-300/50 w-64"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <Bell size={20} className="text-blue-200" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-saffron rounded-full ring-2 ring-navy animate-pulse"></span>
          </button>
          
          <div className="h-8 w-px bg-white/10"></div>
          
          <button className="flex items-center gap-4 p-1 pl-3 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 group">
            <div className="text-right">
              <p className="text-xs font-bold font-syne uppercase tracking-wider group-hover:text-saffron transition-colors">Dharmendra Rai</p>
              <p className="text-[10px] font-medium text-blue-400">Bihar DEO Central</p>
            </div>
            <UserCircle2 size={32} className="text-blue-100" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
