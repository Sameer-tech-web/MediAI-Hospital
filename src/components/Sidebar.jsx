import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Stethoscope,
  Syringe,
  FlaskConical,
  Bot,
  FileSpreadsheet,
  Settings,
  X,
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'patients',
      label: 'Patients Directory',
      icon: Users,
    },
    {
      id: 'add-patient',
      label: 'Admit Patient',
      icon: UserPlus,
    },
    {
      id: 'doctor',
      label: 'Doctor Panel',
      icon: Stethoscope,
    },
    {
      id: 'nurse',
      label: 'Nurse Station & I/O',
      icon: Syringe,
    },
    {
      id: 'laboratory',
      label: 'Laboratory',
      icon: FlaskConical,
    },
    {
      id: 'ai-assistant',
      label: 'MediAI Assistant',
      icon: Bot,
    },
    {
      id: 'reports',
      label: 'Reports & Financials',
      icon: FileSpreadsheet,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop (Mobile me background dark karne ke liye) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen && setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 w-64 shrink-0 h-screen bg-slate-950 text-white border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="px-5 py-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-medBlue flex items-center justify-center font-black text-lg shadow-lg shadow-blue-600/20">
              M
            </div>

            <div className="min-w-0">
              <h1 className="text-sm font-black text-white truncate">
                MediAI Hub
              </h1>

              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Enterprise EMR
              </p>
            </div>
          </div>

          {/* Close Button for Mobile */}
          {setIsOpen && (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-5 space-y-1"
          aria-label="Hospital navigation"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  if (setIsOpen) setIsOpen(false); // Mobile pe click hote hi menu close ho jaye
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-medBlue text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />

                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* System Status */}
        <div className="px-4 py-4 border-t border-slate-800">
          <div className="flex items-center gap-2 px-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
              aria-hidden="true"
            />

            <span>System Online</span>

            <span className="text-slate-600">•</span>

            <span>HIPAA Active</span>
          </div>
        </div>
      </aside>
    </>
  );
}
