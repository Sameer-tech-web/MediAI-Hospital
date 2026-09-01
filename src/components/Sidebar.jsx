import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Stethoscope,
  Clock,
  FlaskConical,
  Bot,
  BarChart3,
  Settings
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients Directory', icon: Users },
    { id: 'doctor', label: 'Doctor Panel', icon: Stethoscope },
    { id: 'nurse', label: 'Nurse Station & I/O', icon: UserCheck },
    { id: 'attendance', label: 'Staff Attendance & Rosters', icon: Clock },
    { id: 'laboratory', label: 'Laboratory', icon: FlaskConical },
    { id: 'ai-assistant', label: 'MediAI Assistant', icon: Bot },
    { id: 'reports', label: 'Reports & Financials', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] text-white flex flex-col justify-between shrink-0 font-sans border-r border-slate-800">
      <div>
        {/* Header Branding */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-800/60">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/30">
            M
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wide text-white leading-none">MediAI Hub</h1>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">ENTERPRISE EMR</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 translate-x-1'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Indicators */}
      <div className="p-4 border-t border-slate-800/60 text-[10px] font-bold text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM ONLINE
        </span>
        <span>• HIPAA ACTIVE</span>
      </div>
    </aside>
  );
}
