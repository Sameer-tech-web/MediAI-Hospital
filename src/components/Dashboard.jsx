import React from 'react';
import {
  Users,
  UserCheck,
  AlertTriangle,
  Activity,
  ArrowUpRight,
} from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Hospital Live Command Center
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time overview of bed occupancy, clinical alerts, and patient
          telemetry.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Admitted */}
        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Total Admitted
            </span>

            <Users className="w-5 h-5 text-medBlue shrink-0" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              128
            </span>

            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" />
              +4%
            </span>
          </div>
        </div>

        {/* Critical Cases */}
        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Critical Cases (ICU)
            </span>

            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              14
            </span>

            <span className="text-xs font-bold text-red-500 flex items-center">
              <ArrowUpRight className="w-3 h-3" />
              +1
            </span>
          </div>
        </div>

        {/* Doctors On Duty */}
        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Doctors On Duty
            </span>

            <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              22
            </span>

            <span className="text-xs font-bold text-slate-400">
              Shift A
            </span>
          </div>
        </div>

        {/* Bed Occupancy */}
        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Bed Occupancy Rate
            </span>

            <Activity className="w-5 h-5 text-amber-500 shrink-0" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              84%
            </span>

            <span className="text-xs font-bold text-amber-600">
              High Capacity
            </span>
          </div>
        </div>
      </div>

      {/* Quick Launch Shortcuts */}
      <div className="bg-slate-900 p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl text-white space-y-4">
        <h3 className="text-base sm:text-lg font-black">
          Clinical Fast Shortcuts
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Doctor */}
          <button
            type="button"
            onClick={() => setActiveTab('doctor')}
            className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-left border border-slate-700 transition-all"
          >
            <span className="font-bold block text-sm">
              Doctor Examination
            </span>

            <span className="text-xs text-slate-400 block mt-1">
              Prescribe meds & smart diagnosis
            </span>
          </button>

          {/* Nurse */}
          <button
            type="button"
            onClick={() => setActiveTab('nurse')}
            className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-left border border-slate-700 transition-all"
          >
            <span className="font-bold block text-sm">
              Nurse Station & I/O
            </span>

            <span className="text-xs text-slate-400 block mt-1">
              Record vitals, urine & stool output
            </span>
          </button>

          {/* Add Patient */}
          <button
            type="button"
            onClick={() => setActiveTab('add-patient')}
            className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-left border border-slate-700 transition-all"
          >
            <span className="font-bold block text-sm">
              Admit New Patient
            </span>

            <span className="text-xs text-slate-400 block mt-1">
              Register patient & assign doctor
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
