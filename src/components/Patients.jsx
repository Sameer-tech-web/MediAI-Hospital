import React, { useState } from 'react';
import { Eye, Search, Star, AlertCircle } from 'lucide-react';

export default function Patients({ setActiveTab, setSelectedPatient }) {
  const [searchQuery, setSearchQuery] = useState('');

  const patientList = [
    {
      id: '#1042',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      dept: 'Cardiology',
      doctor: 'Dr. Sarah Jenkins',
      status: 'Admitted',
      vip: 'Doctor Relative VIP',
    },
    {
      id: '#1043',
      name: 'Emma Watson',
      age: 32,
      gender: 'Female',
      dept: 'Neurology',
      doctor: 'Dr. Robert Chen',
      status: 'Admitted',
      vip: 'Standard',
    },
    {
      id: '#1044',
      name: 'Michael Vance',
      age: 60,
      gender: 'Male',
      dept: 'ICU Critical',
      doctor: 'Dr. Lisa Ray',
      status: 'Critical Priority',
      vip: 'High Priority',
    },
  ];

  const filteredPatients = patientList.filter((patient) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    return (
      patient.name.toLowerCase().includes(query) ||
      patient.id.toLowerCase().includes(query) ||
      patient.dept.toLowerCase().includes(query) ||
      patient.doctor.toLowerCase().includes(query)
    );
  });

  const handleSelect = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('patient-profile');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Patients Directory
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Active ward admissions and medical records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('add-patient')}
          className="w-full sm:w-fit px-5 py-2.5 bg-medBlue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          + Admit Patient
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full lg:max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search patient ID, name, department..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20"
        />
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Patient ID / Name
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Age / Gender
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Department & Doctor
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Priority Tag
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition-colors"
                >
                  <td className="px-5 py-5">
                    <div className="font-bold text-sm text-slate-900">
                      {patient.name}
                    </div>

                    <div className="text-[10px] text-slate-400 font-semibold mt-1">
                      {patient.id}
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <span className="text-xs font-semibold text-slate-700">
                      {patient.age} Yrs / {patient.gender}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <div className="text-xs font-bold text-slate-800">
                      {patient.dept}
                    </div>

                    <div className="text-[10px] text-slate-400 font-semibold mt-1">
                      {patient.doctor}
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={`px-2.5 py-1.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 w-fit ${
                        patient.vip.includes('VIP')
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : patient.vip.includes('Priority')
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {patient.vip.includes('VIP') && (
                        <Star className="w-3 h-3 fill-current" />
                      )}

                      {patient.vip.includes('Priority') &&
                        !patient.vip.includes('VIP') && (
                          <AlertCircle className="w-3 h-3" />
                        )}

                      {patient.vip}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold inline-block ${
                        patient.status === 'Critical Priority'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td className="px-5 py-5 text-right">
                    <button
                      type="button"
                      onClick={() => handleSelect(patient)}
                      className="px-3 py-2 bg-blue-50 text-medBlue hover:bg-blue-100 rounded-xl font-bold flex items-center gap-1 text-xs ml-auto transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Open Chart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-black text-sm text-slate-900 truncate">
                  {patient.name}
                </h3>

                <p className="text-[10px] text-slate-400 font-semibold mt-1">
                  {patient.id}
                </p>
              </div>

              <span
                className={`shrink-0 px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                  patient.status === 'Critical Priority'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {patient.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                  Age / Gender
                </span>

                <span className="block text-xs font-bold text-slate-700 mt-1">
                  {patient.age} Yrs / {patient.gender}
                </span>
              </div>

              <div>
                <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                  Department
                </span>

                <span className="block text-xs font-bold text-slate-700 mt-1">
                  {patient.dept}
                </span>
              </div>

              <div className="col-span-2">
                <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                  Doctor
                </span>

                <span className="block text-xs font-bold text-slate-700 mt-1">
                  {patient.doctor}
                </span>
              </div>

              <div className="col-span-2">
                <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  Priority
                </span>

                <span
                  className={`px-2.5 py-1.5 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1 ${
                    patient.vip.includes('VIP')
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : patient.vip.includes('Priority')
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {patient.vip.includes('VIP') && (
                    <Star className="w-3 h-3 fill-current" />
                  )}

                  {patient.vip.includes('Priority') &&
                    !patient.vip.includes('VIP') && (
                      <AlertCircle className="w-3 h-3" />
                    )}

                  {patient.vip}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSelect(patient)}
              className="w-full mt-4 px-4 py-2.5 bg-blue-50 text-medBlue hover:bg-blue-100 rounded-xl font-bold flex items-center justify-center gap-2 text-xs transition-colors"
            >
              <Eye className="w-4 h-4" />
              Open Patient Chart
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPatients.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />

          <p className="text-sm font-bold text-slate-700">
            No patients found
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Try searching with another patient name, ID, department, or doctor.
          </p>
        </div>
      )}
    </div>
  );
}
