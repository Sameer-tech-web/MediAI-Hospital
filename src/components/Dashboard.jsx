import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  UserPlus,
  ArrowRightLeft,
  LogOut,
  X,
  CheckCircle2
} from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  // Live Patients State for Dashboard Table & Operations
  const [recentPatients, setRecentPatients] = useState([
    { id: "1042", name: "John Doe", age: 42, gender: "Male", ward: "ICU Bed 04", doctor: "Dr. Sarah Connor", status: "Critical" },
    { id: "1043", name: "Emma Watson", age: 32, gender: "Female", ward: "General Ward 03", doctor: "Dr. Chen", status: "Stable" },
    { id: "1044", name: "Michael V", age: 60, gender: "Male", ward: "ICU Bed 01", doctor: "Dr. Lisa Ray", status: "Critical" },
    { id: "1045", name: "Ayesha Khan", age: 28, gender: "Female", ward: "Private Room 12", doctor: "Dr. Sarah Connor", status: "Stable" }
  ]);

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'transfer' | 'discharge'
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [newWard, setNewWard] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Operational Handlers
  const handleDischarge = (e) => {
    e.preventDefault();
    if (!selectedPatientId) return;
    const patient = recentPatients.find(p => p.id === selectedPatientId);
    setRecentPatients(recentPatients.filter(p => p.id !== selectedPatientId));
    setActiveModal(null);
    setSelectedPatientId('');
    showToast(`Patient ${patient?.name || ''} successfully discharged.`);
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!selectedPatientId || !newWard) return;
    setRecentPatients(recentPatients.map(p => 
      p.id === selectedPatientId ? { ...p, ward: newWard } : p
    ));
    setActiveModal(null);
    setSelectedPatientId('');
    setNewWard('');
    showToast('Ward location updated successfully.');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto font-sans bg-slate-50/50 min-h-screen">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Hospital Live Command Center
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time overview of bed occupancy, clinical operational actions, and telemetry.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Admitted */}
        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Total Admitted
            </span>
            <Users className="w-5 h-5 text-blue-600 shrink-0" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">128</span>
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
            <span className="text-2xl sm:text-3xl font-black text-slate-900">14</span>
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
            <span className="text-2xl sm:text-3xl font-black text-slate-900">22</span>
            <span className="text-xs font-bold text-slate-400">Shift A</span>
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
            <span className="text-2xl sm:text-3xl font-black text-slate-900">84%</span>
            <span className="text-xs font-bold text-amber-600">High Capacity</span>
          </div>
        </div>
      </div>

      {/* Quick Operational Actions */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Quick Operational Actions
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Action 1: Admit Patient */}
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('add-patient')}
            className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-500/50 rounded-2xl text-left shadow-sm transition-all group flex items-start gap-4"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold block text-sm text-slate-900">Admit New Patient</span>
              <span className="text-xs text-slate-500 block mt-0.5">Register patient & assign doctor</span>
            </div>
          </button>

          {/* Action 2: Transfer Ward */}
          <button
            type="button"
            onClick={() => setActiveModal('transfer')}
            className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-500/50 rounded-2xl text-left shadow-sm transition-all group flex items-start gap-4"
          >
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold block text-sm text-slate-900">Transfer / Shift Ward</span>
              <span className="text-xs text-slate-500 block mt-0.5">Move patient to ICU or Ward</span>
            </div>
          </button>

          {/* Action 3: Discharge Patient */}
          <button
            type="button"
            onClick={() => setActiveModal('discharge')}
            className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-500/50 rounded-2xl text-left shadow-sm transition-all group flex items-start gap-4"
          >
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold block text-sm text-slate-900">Discharge Patient</span>
              <span className="text-xs text-slate-500 block mt-0.5">Release patient & clear bed</span>
            </div>
          </button>
        </div>
      </div>

      {/* Live Admitted Patients Directory */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Occupants Directory</h3>
            <p className="text-xs text-slate-500 mt-0.5">Real-time status of current ward and ICU beds</p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold">
            Live Stream
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="p-3 rounded-l-xl">MRN ID</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Assigned Bed / Ward</th>
                <th className="p-3">Doctor In-Charge</th>
                <th className="p-3">Condition</th>
                <th className="p-3 rounded-r-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-mono font-bold text-slate-900">#{patient.id}</td>
                  <td className="p-3 font-bold text-slate-900">
                    {patient.name} <span className="text-xs font-normal text-slate-400">({patient.gender}, {patient.age})</span>
                  </td>
                  <td className="p-3 text-slate-700">{patient.ward}</td>
                  <td className="p-3 text-slate-700">{patient.doctor}</td>
                  <td className="p-3">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold inline-block ${
                      patient.status === 'Critical' 
                        ? 'bg-red-50 text-red-600 border border-red-200' 
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => { setSelectedPatientId(patient.id); setActiveModal('discharge'); }}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 font-bold transition-all"
                    >
                      Discharge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Operational Action Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {activeModal === 'transfer' ? 'Transfer / Shift Ward' : 'Discharge Patient'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={activeModal === 'transfer' ? handleTransfer : handleDischarge} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Select Patient
                </label>
                <select
                  required
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Choose patient...</option>
                  {recentPatients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (#{p.id} - {p.ward})</option>
                  ))}
                </select>
              </div>

              {activeModal === 'transfer' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    New Ward / Bed Allocation
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ICU Bed 02 or General Ward 05"
                    value={newWard}
                    onChange={(e) => setNewWard(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  {activeModal === 'transfer' ? 'Confirm Transfer' : 'Confirm Discharge'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
