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
  CheckCircle2,
  Clock,
  LogIn,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  // 1. Live Patients State
  const [recentPatients, setRecentPatients] = useState([
    { id: "1042", name: "John Doe", age: 42, gender: "Male", ward: "ICU Bed 04", doctor: "Dr. Sarah Connor", status: "Critical" },
    { id: "1043", name: "Emma Watson", age: 32, gender: "Female", ward: "General Ward 03", doctor: "Dr. Chen", status: "Stable" },
    { id: "1044", name: "Michael V", age: 60, gender: "Male", ward: "ICU Bed 01", doctor: "Dr. Lisa Ray", status: "Critical" },
    { id: "1045", name: "Ayesha Khan", age: 28, gender: "Female", ward: "Private Room 12", doctor: "Dr. Sarah Connor", status: "Stable" }
  ]);

  // 2. Staff Attendance & Duty Tracker State
  const [staffDutyList, setStaffDutyList] = useState([
    { id: "DOC-101", name: "Dr. Sarah Connor", role: "Doctor", dept: "ICU Specialist", clockIn: "08:00 AM", clockOut: "--:--", status: "On Duty" },
    { id: "NRS-204", name: "Nurse Jessica", role: "Nurse", dept: "Ward-A Supervisor", clockIn: "07:45 AM", clockOut: "--:--", status: "On Duty" },
    { id: "DOC-108", name: "Dr. Chen", role: "Doctor", dept: "General Physician", clockIn: "08:15 AM", clockOut: "--:--", status: "On Duty" },
    { id: "NRS-210", name: "Nurse Maria", role: "Nurse", dept: "Emergency Care", clockIn: "12:00 AM", clockOut: "08:00 AM", status: "Off Duty" },
  ]);

  // Modals & UI States
  const [activeModal, setActiveModal] = useState(null); // 'transfer' | 'discharge' | 'attendance'
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [newWard, setNewWard] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Attendance Punch State
  const [punchStaffId, setPunchStaffId] = useState('');
  const [punchAction, setPunchAction] = useState('in'); // 'in' or 'out'

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

  const handleAttendancePunch = (e) => {
    e.preventDefault();
    if (!punchStaffId) return;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setStaffDutyList(staffDutyList.map(member => {
      if (member.id === punchStaffId || member.name.toLowerCase().includes(punchStaffId.toLowerCase())) {
        if (punchAction === 'in') {
          return { ...member, status: 'On Duty', clockIn: currentTime, clockOut: '--:--' };
        } else {
          return { ...member, status: 'Off Duty', clockOut: currentTime };
        }
      }
      return member;
    }));

    setActiveModal(null);
    setPunchStaffId('');
    showToast(`Staff ${punchAction === 'in' ? 'Clocked-In' : 'Clocked-Out'} successfully at ${currentTime}`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto font-sans bg-slate-50/50 min-h-screen">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Hospital Live Command Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time overview of bed occupancy, clinical operational actions, and live staff duty.
          </p>
        </div>
        <button
          onClick={() => setActiveModal('attendance')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <Clock className="w-4 h-4" />
          <span>Punch Attendance / Shift</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Total Admitted</span>
            <Users className="w-5 h-5 text-blue-600 shrink-0" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">128</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center"><ArrowUpRight className="w-3 h-3" />+4%</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Critical Cases (ICU)</span>
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">14</span>
            <span className="text-xs font-bold text-red-500 flex items-center"><ArrowUpRight className="w-3 h-3" />+1</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Doctors On Duty</span>
            <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">22</span>
            <span className="text-xs font-bold text-slate-400">Shift A</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Bed Occupancy Rate</span>
            <Activity className="w-5 h-5 text-amber-500 shrink-0" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">84%</span>
            <span className="text-xs font-bold text-amber-600">High Capacity</span>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN DASHBOARD LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (2/3 Width): Operations & Patient Table */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Quick Operational Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('add-patient')}
                className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-500/50 rounded-2xl text-left shadow-sm transition-all group flex items-start gap-3"
              >
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block text-sm text-slate-900">Admit Patient</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Register & assign bed</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('transfer')}
                className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-500/50 rounded-2xl text-left shadow-sm transition-all group flex items-start gap-3"
              >
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block text-sm text-slate-900">Ward Transfer</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Shift ward location</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('discharge')}
                className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-500/50 rounded-2xl text-left shadow-sm transition-all group flex items-start gap-3"
              >
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                  <LogOut className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block text-sm text-slate-900">Discharge</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Release patient</span>
                </div>
              </button>
            </div>
          </div>

          {/* Active Occupants Directory */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Occupants Directory</h3>
                <p className="text-[11px] text-slate-500">Real-time status of current ward and ICU beds</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                Live
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="p-2.5 rounded-l-lg">MRN</th>
                    <th className="p-2.5">Patient Name</th>
                    <th className="p-2.5">Bed / Ward</th>
                    <th className="p-2.5">Doctor</th>
                    <th className="p-2.5">Condition</th>
                    <th className="p-2.5 rounded-r-lg text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {recentPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-2.5 font-mono font-bold text-slate-900">#{patient.id}</td>
                      <td className="p-2.5 font-bold text-slate-900">{patient.name}</td>
                      <td className="p-2.5 text-slate-700">{patient.ward}</td>
                      <td className="p-2.5 text-slate-700">{patient.doctor}</td>
                      <td className="p-2.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          patient.status === 'Critical' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-right">
                        <button
                          onClick={() => { setSelectedPatientId(patient.id); setActiveModal('discharge'); }}
                          className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md border border-slate-300 font-bold"
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

        </div>

        {/* RIGHT COLUMN (1/3 Width): NEW LIVE STAFF DUTY & ATTENDANCE WIDGET */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Live Staff Duty Tracker</h3>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold">
                Shift A Active
              </span>
            </div>

            <div className="space-y-3">
              {staffDutyList.map((staff) => (
                <div key={staff.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900">{staff.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({staff.role})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>{staff.dept}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 text-[10px]">
                      <span className="text-emerald-600 font-medium">In: {staff.clockIn}</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-500">Out: {staff.clockOut}</span>
                    </div>
                  </div>

                  <div>
                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold ${
                      staff.status === 'On Duty' 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {staff.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal('attendance')}
              className="w-full text-center py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Punch Clock In / Clock Out</span>
            </button>

          </div>
        </div>

      </div>

      {/* ATTENDANCE PUNCH MODAL */}
      {activeModal === 'attendance' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Staff Shift Terminal</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAttendancePunch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Action Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPunchAction('in')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      punchAction === 'in' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Clock In (Arrival)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPunchAction('out')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      punchAction === 'out' ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Clock Out (Departure)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Select Staff Member / Doctor / Nurse
                </label>
                <select
                  required
                  value={punchStaffId}
                  onChange={(e) => setPunchStaffId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Choose Staff Member...</option>
                  {staffDutyList.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.role} - {s.dept})</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl"
                >
                  Confirm Timestamp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DISCHARGE / TRANSFER MODALS (Intact) */}
      {(activeModal === 'transfer' || activeModal === 'discharge') && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl"
                >
                  Confirm Command
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
