import React, { useState } from 'react';
import {
  Users,
  Clock,
  Fingerprint,
  Lock,
  Building,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  ShieldCheck,
  CalendarCheck,
  UserX
} from 'lucide-react';

export default function StaffAttendance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [wardFilter, setWardFilter] = useState('All');

  // Pure Staff Duty & Biometric Logs Data
  const [staffData] = useState([
    {
      id: "DOC-101",
      name: "Dr. Sarah Connor",
      role: "Doctor",
      designation: "ICU Specialist",
      assignedWard: "ICU Ward Bed 01-10",
      shift: "Morning (08:00 AM - 04:00 PM)",
      clockIn: "08:00 AM",
      clockOut: "--:--",
      dutyHours: "6.5 hrs (Active)",
      status: "Present",
      timingStatus: "On Time",
      daysPresent: 22,
      daysAbsent: 1,
      offDays: 3,
      deviceSource: "Biometric Scanner #BIO-ICU-01"
    },
    {
      id: "NRS-204",
      name: "Nurse Jessica",
      role: "Nurse",
      designation: "Ward Supervisor",
      assignedWard: "General Ward-A",
      shift: "Morning (08:00 AM - 04:00 PM)",
      clockIn: "07:45 AM",
      clockOut: "--:--",
      dutyHours: "6.75 hrs (Active)",
      status: "Present",
      timingStatus: "On Time",
      daysPresent: 24,
      daysAbsent: 0,
      offDays: 2,
      deviceSource: "Biometric Scanner #BIO-WARD-01"
    },
    {
      id: "DOC-108",
      name: "Dr. Chen",
      role: "Doctor",
      designation: "General Physician",
      assignedWard: "OPD Consultation Rm 4",
      shift: "Morning (08:00 AM - 04:00 PM)",
      clockIn: "08:35 AM",
      clockOut: "--:--",
      dutyHours: "6.0 hrs (Active)",
      status: "Present",
      timingStatus: "Late (35m)",
      daysPresent: 19,
      daysAbsent: 2,
      offDays: 5,
      deviceSource: "Biometric Scanner #BIO-OPD-02"
    },
    {
      id: "NRS-209",
      name: "Nurse Maria",
      role: "Nurse",
      designation: "Emergency Care Nurse",
      assignedWard: "Emergency Ward",
      shift: "Night Shift (12:00 AM - 08:00 AM)",
      clockIn: "12:00 AM",
      clockOut: "08:00 AM",
      dutyHours: "8.0 hrs",
      status: "Shift Completed",
      timingStatus: "On Time",
      daysPresent: 21,
      daysAbsent: 1,
      offDays: 4,
      deviceSource: "Biometric Scanner #BIO-EMG-01"
    },
    {
      id: "DOC-112",
      name: "Dr. Lisa Ray",
      role: "Doctor",
      designation: "Surgeon",
      assignedWard: "Operation Theater 2",
      shift: "Evening (04:00 PM - 12:00 AM)",
      clockIn: "--:--",
      clockOut: "--:--",
      dutyHours: "0 hrs",
      status: "Absent / Rostered Off",
      timingStatus: "Scheduled Off",
      daysPresent: 17,
      daysAbsent: 0,
      offDays: 9,
      deviceSource: "System Roster Off"
    }
  ]);

  // Filtering Logic
  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.assignedWard.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || staff.role === roleFilter;
    const matchesWard = wardFilter === 'All' || staff.assignedWard.includes(wardFilter);
    return matchesSearch && matchesRole && matchesWard;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto font-sans bg-slate-50 min-h-screen">
      
      {/* Top Header with Biometric Hardware Lock Alert */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-indigo-600" />
            <span>Staff Attendance & Ward Allocation Roster</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Exclusively tracking staff presence, duty wards, working hours, and physical biometric logs.
          </p>
        </div>

        {/* Biometric Hardened Protection Badge */}
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl">
          <Fingerprint className="w-6 h-6 text-emerald-600 animate-pulse" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-emerald-900">Biometric Terminal Active</span>
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
            </div>
            <p className="text-[10px] text-emerald-700 font-semibold">
              Manual punches blocked. Biometric Scanner Required.
            </p>
          </div>
        </div>
      </div>

      {/* Staff Only KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Staff Roster</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{staffData.length} Members</div>
          <p className="text-[11px] text-slate-400 font-semibold">Doctors, Nurses & Shift Staff</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Present & On Duty</span>
            <CalendarCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {staffData.filter(s => s.status === 'Present').length} Staff
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">Verified via Biometric Gates</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Late Arrivals</span>
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">
            {staffData.filter(s => s.timingStatus.includes('Late')).length} Staff
          </div>
          <p className="text-[11px] text-slate-400 font-semibold">Arrived after shift start time</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Scheduled Off / Absent</span>
            <UserX className="w-5 h-5 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-700">
            {staffData.filter(s => s.status.includes('Absent')).length} Staff
          </div>
          <p className="text-[11px] text-slate-400 font-semibold">Off duty or on approved leave</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search Staff Name, ID, or Assigned Ward..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 focus:outline-none"
            >
              <option value="All">All Staff Roles</option>
              <option value="Doctor">Doctors</option>
              <option value="Nurse">Nurses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dedicated Staff Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th className="p-4">Staff Member</th>
                <th className="p-4">Assigned Ward / Duty Area</th>
                <th className="p-4">Shift Schedule</th>
                <th className="p-4">Biometric Login</th>
                <th className="p-4">Biometric Logout</th>
                <th className="p-4">Total Hours</th>
                <th className="p-4">Monthly History</th>
                <th className="p-4">Device Verification</th>
                <th className="p-4 text-center">Duty Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Staff Info */}
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{staff.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{staff.id} • {staff.designation}</div>
                  </td>

                  {/* Ward Assignment */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Building className="w-3.5 h-3.5 text-indigo-600" />
                      {staff.assignedWard}
                    </span>
                  </td>

                  {/* Shift */}
                  <td className="p-4 font-medium text-slate-600">{staff.shift}</td>

                  {/* Biometric Clock In */}
                  <td className="p-4 font-bold text-emerald-600">
                    {staff.clockIn !== '--:--' ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {staff.clockIn}
                      </span>
                    ) : (
                      <span className="text-slate-400">--:--</span>
                    )}
                  </td>

                  {/* Biometric Clock Out */}
                  <td className="p-4 font-bold text-slate-900">
                    {staff.clockOut !== '--:--' ? (
                      staff.clockOut
                    ) : (
                      <span className="text-amber-600 text-[11px]">Active Shift</span>
                    )}
                  </td>

                  {/* Hours */}
                  <td className="p-4 font-bold text-slate-800 font-mono">{staff.dutyHours}</td>

                  {/* Days Attended vs Off */}
                  <td className="p-4">
                    <div className="text-[11px]">
                      <span className="text-emerald-700 font-bold">{staff.daysPresent} Days Attended</span>
                      <div className="text-slate-400 font-normal">
                        {staff.daysAbsent} Absent • {staff.offDays} Off
                      </div>
                    </div>
                  </td>

                  {/* Biometric Device Source */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-900 text-[10px] font-bold px-2.5 py-1 rounded-md border border-indigo-100">
                      <Fingerprint className="w-3.5 h-3.5 text-indigo-600" />
                      {staff.deviceSource}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="p-4 text-center">
                    {staff.status === 'Present' && (
                      <span className="bg-emerald-100 text-emerald-800 font-black text-[10px] px-2.5 py-1 rounded-full border border-emerald-300">
                        ON DUTY
                      </span>
                    )}
                    {staff.status === 'Shift Completed' && (
                      <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2.5 py-1 rounded-full">
                        COMPLETED
                      </span>
                    )}
                    {staff.status.includes('Absent') && (
                      <span className="bg-slate-100 text-slate-500 font-bold text-[10px] px-2.5 py-1 rounded-full">
                        OFF DAY
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
