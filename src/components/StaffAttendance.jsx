import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  Edit3, 
  Search,
  Filter,
  X,
  LogIn,
  LogOut,
  Fingerprint,
  Lock,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function StaffAttendance() {
  // Initial Mock Data with Monthly Aggregates & Biometric Device Info
  const [staffMembers, setStaffMembers] = useState([
    {
      id: "DOC-101",
      name: "Dr. Sarah Connor",
      role: "Doctor",
      dept: "ICU Specialist",
      shift: "Morning (08:00 AM - 04:00 PM)",
      clockIn: "08:00 AM",
      clockOut: "04:00 PM",
      totalHours: "8.0 hrs",
      status: "Present",
      timingStatus: "On Time",
      daysPresent: 22,
      daysOff: 4,
      deviceSource: "Biometric #BIO-ICU-01"
    },
    {
      id: "DOC-108",
      name: "Dr. Chen",
      role: "Doctor",
      dept: "General Physician",
      shift: "Morning (08:00 AM - 04:00 PM)",
      clockIn: "08:35 AM",
      clockOut: "--:--",
      totalHours: "In Progress",
      status: "Present",
      timingStatus: "Late (35m)",
      daysPresent: 20,
      daysOff: 6,
      deviceSource: "Biometric #BIO-OPD-02"
    },
    {
      id: "NRS-204",
      name: "Nurse Jessica",
      role: "Nurse",
      dept: "Ward-A Supervisor",
      shift: "Evening (04:00 PM - 12:00 AM)",
      clockIn: "03:55 PM",
      clockOut: "11:30 PM",
      totalHours: "7.5 hrs",
      status: "Present",
      timingStatus: "Early Exit (30m)",
      daysPresent: 24,
      daysOff: 2,
      deviceSource: "Biometric #BIO-WARD-01"
    },
    {
      id: "DOC-112",
      name: "Dr. Lisa Ray",
      role: "Doctor",
      dept: "Cardiology",
      shift: "Night (12:00 AM - 08:00 AM)",
      clockIn: "--:--",
      clockOut: "--:--",
      totalHours: "0 hrs",
      status: "Absent",
      timingStatus: "Off Duty",
      daysPresent: 18,
      daysOff: 8,
      deviceSource: "System Rostered Off"
    }
  ]);

  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedStaffForShift, setSelectedStaffForShift] = useState(null);
  const [newShiftValue, setNewShiftValue] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Toast Function
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Shift Change Handler
  const handleShiftUpdate = (e) => {
    e.preventDefault();
    if (!selectedStaffForShift || !newShiftValue) return;

    setStaffMembers(staffMembers.map(staff => 
      staff.id === selectedStaffForShift.id ? { ...staff, shift: newShiftValue } : staff
    ));

    showToast(`Shift updated for ${selectedStaffForShift.name}`);
    setSelectedStaffForShift(null);
    setNewShiftValue('');
  };

  // Filtering Logic
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.dept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || staff.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto font-sans bg-slate-50/50 min-h-screen">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Anti-Proxy Biometric Badge */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-indigo-600" />
            <span>Staff Attendance, Rosters & Duty History</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time arrival timestamps, duty hours, monthly off counts, and biometric verification logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Biometric Lock Status Indicator */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
            <Fingerprint className="w-4 h-4 text-emerald-600 animate-pulse" />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-emerald-900">Biometric Sync Active</span>
                <Lock className="w-3 h-3 text-emerald-700" />
              </div>
              <p className="text-[10px] text-emerald-700 font-semibold">Manual Punches Locked (Anti-Proxy)</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 shadow-xs">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Today: September 1, 2026</span>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total On Roster</span>
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-slate-900">{staffMembers.length}</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Currently Present</span>
            <LogIn className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-emerald-600">
            {staffMembers.filter(s => s.status === 'Present').length}
          </span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Late Arrivals</span>
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-2xl font-black text-amber-600">
            {staffMembers.filter(s => s.timingStatus.includes('Late')).length}
          </span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Early Exits / Off</span>
            <LogOut className="w-5 h-5 text-red-500" />
          </div>
          <span className="text-2xl font-black text-slate-900">
            {staffMembers.filter(s => s.timingStatus.includes('Early') || s.status === 'Absent').length}
          </span>
        </div>
      </div>

      {/* Controls & Filters Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by staff name, ID, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Role:</span>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Doctor">Doctors</option>
            <option value="Nurse">Nurses</option>
          </select>
        </div>
      </div>

      {/* Main Attendance & Roster Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th className="p-3.5">Staff Info</th>
                <th className="p-3.5">Assigned Shift</th>
                <th className="p-3.5">Clock-In (Login)</th>
                <th className="p-3.5">Clock-Out (Logout)</th>
                <th className="p-3.5">Duty Hours</th>
                <th className="p-3.5">Monthly Attendance</th>
                <th className="p-3.5">Verification Source</th>
                <th className="p-3.5">Timing Status</th>
                <th className="p-3.5 text-right">Roster Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Staff Info */}
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{staff.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{staff.id} • {staff.dept}</div>
                  </td>

                  {/* Shift Timing */}
                  <td className="p-3.5 font-semibold text-slate-700">
                    {staff.shift}
                  </td>

                  {/* Clock In */}
                  <td className="p-3.5 text-emerald-700 font-bold">
                    {staff.clockIn}
                  </td>

                  {/* Clock Out */}
                  <td className="p-3.5 text-slate-900 font-bold">
                    {staff.clockOut}
                  </td>

                  {/* Total Duty Hours */}
                  <td className="p-3.5 font-bold font-mono text-slate-800">
                    {staff.totalHours}
                  </td>

                  {/* Monthly Present / Off Summary */}
                  <td className="p-3.5">
                    <div className="text-[11px]">
                      <span className="text-emerald-700 font-bold">{staff.daysPresent} Days Attended</span>
                      <span className="text-slate-400 font-normal"> / {staff.daysOff} Off</span>
                    </div>
                  </td>

                  {/* Biometric Device Log */}
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-md">
                      <Fingerprint className="w-3 h-3 text-indigo-600" />
                      {staff.deviceSource}
                    </span>
                  </td>

                  {/* Timing Status Badge */}
                  <td className="p-3.5">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                      staff.timingStatus === 'On Time' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      staff.timingStatus.includes('Late') ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      staff.timingStatus.includes('Early') ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {staff.timingStatus}
                    </span>
                  </td>

                  {/* Roster Shift Change Action */}
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => { setSelectedStaffForShift(staff); setNewShiftValue(staff.shift); }}
                      className="inline-flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 font-bold transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3 text-slate-500" />
                      <span>Edit Shift</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SHIFT CHANGE MODAL */}
      {selectedStaffForShift && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Change Assigned Duty Shift</h3>
              <button onClick={() => setSelectedStaffForShift(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleShiftUpdate} className="space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Staff Member</span>
                <p className="text-sm font-bold text-slate-900">{selectedStaffForShift.name} ({selectedStaffForShift.id})</p>
                <p className="text-xs text-slate-500">{selectedStaffForShift.dept}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Select New Roster Schedule
                </label>
                <select
                  required
                  value={newShiftValue}
                  onChange={(e) => setNewShiftValue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Morning (08:00 AM - 04:00 PM)">Morning Shift (08:00 AM - 04:00 PM)</option>
                  <option value="Evening (04:00 PM - 12:00 AM)">Evening Shift (04:00 PM - 12:00 AM)</option>
                  <option value="Night (12:00 AM - 08:00 AM)">Night Shift (12:00 AM - 08:00 AM)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStaffForShift(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl cursor-pointer"
                >
                  Save Shift Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
