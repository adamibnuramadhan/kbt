import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/useUIStore';

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const navigate = useNavigate();
  const [hoveredTooltip, setHoveredTooltip] = useState(null);

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: '▦' },
    { name: 'Fleet', path: '/fleet', icon: '🚛', badge: 12 },
    { name: 'Reports', path: '/reports', icon: '📊' },
    { name: 'Settings', path: '/settings', icon: '⚙' },
    { name: 'Support', path: '/support', icon: '❓' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('fg_auth');
    navigate('/login');
  };

  return (
    <div
      className={`bg-[#2d2d2d] border-r border-[#404040] h-screen overflow-hidden flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo Section */}
      <div className="p-5 border-b border-[#404040] relative">
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-5 w-6 h-6 bg-[#2d2d2d] border border-[#404040] rounded-full flex items-center justify-center text-[#808080] hover:text-[#1abc9c] transition-colors"
        >
          {sidebarOpen ? '←' : '→'}
        </button>

        {sidebarOpen ? (
          <div>
            <p className="font-display text-lg font-bold text-[#1abc9c]">FuelGuard</p>
            <p className="font-body text-xs text-[#808080] uppercase tracking-widest">Fuel Monitoring System</p>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="w-8 h-8 rounded-full bg-[#1abc9c] flex items-center justify-center">
              <span className="font-display text-xs font-bold text-white">FG</span>
            </div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-2 mt-4 space-y-1">
        {navItems.map((item) => (
          <div
            key={item.path}
            className="relative"
            onMouseEnter={() => !sidebarOpen && setHoveredTooltip(item.name)}
            onMouseLeave={() => setHoveredTooltip(null)}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${
                  isActive
                    ? 'bg-[#1abc9c] text-white border-l-3 border-[#48dbfb]'
                    : 'text-[#808080] hover:bg-[#3a3a3a] hover:text-[#b0b0b0]'
                } ${!sidebarOpen ? 'justify-center' : ''}`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="font-body text-sm font-medium">{item.name}</span>}
              {!sidebarOpen && item.badge && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {item.badge}
                </div>
              )}
            </NavLink>

            {/* Tooltip */}
            {hoveredTooltip === item.name && !sidebarOpen && (
              <div className="absolute left-20 top-2.5 bg-[#2d2d2d] border border-[#404040] rounded-md px-3 py-1.5 text-xs text-white font-body whitespace-nowrap z-50 animate-fadeIn">
                {item.name}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-2 border-t border-[#404040]">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[#808080] hover:bg-[#3a3a3a] hover:text-[#b0b0b0] transition-all ${
            !sidebarOpen ? 'justify-center' : ''
          }`}
        >
          <span className="text-lg">🚪</span>
          {sidebarOpen && <span className="font-body text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
