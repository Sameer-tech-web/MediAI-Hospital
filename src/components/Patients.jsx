import React, { useEffect, useMemo, useState } from 'react';
import { Eye, Search, Star, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'https://medi-ai-hospital-8vjx.vercel.app/api';

export default function Patients({ setActiveTab, setSelectedPatient }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPatients = async () => {
    const token = localStorage.getItem('mediai_token');

    if (!token) {
      setError('Authentication required. Please login again.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/patients`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load patients.');
      }

      setPatientList(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Unable to load patients.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return patientList;
    }

    return patientList.filter((patient) => {
      const patientName = patient.name?.toLowerCase() || '';
      const patientMrn = (patient.mrn || patient._id)?.toLowerCase() || '';
      const department = patient.department?.toLowerCase() || '';
      const doctorName = (
        typeof patient.assignedDoctor === 'object'
          ? patient.assignedDoctor?.name
          : patient.assignedDoctor
      )?.toLowerCase() || '';

      return (
        patientName.includes(query) ||
        patientMrn.includes(query) ||
        department.includes(query) ||
        doctorName.includes(query)
      );
    });
  }, [patientList, searchQuery]);

  const getPriorityLabel = (patient) => {
    if (patient.triageCategory === 'Emergency') {
      return 'Critical Priority';
    }

    if (patient.triageCategory === 'Urgent') {
      return 'Doctor Relative VIP';
    }

    return 'Standard';
  };

  const getStatusLabel = (patient) => {
    if (patient.triageCategory === 'Emergency') {
      return 'Critical Priority';
    }

    return patient.queueStatus || 'Waiting';
  };

  const handleSelect = (patient) => {
    if (typeof setSelectedPatient === 'function') {
      setSelectedPatient(patient);
    }
    if (typeof setActiveTab === 'function') {
      setActiveTab('patient-profile');
    }
  };

  const getDoctorName = (patient) => {
    if (!patient.assignedDoctor) return 'Not assigned';
    if (typeof patient.assignedDoctor === 'object') {
      return patient.assignedDoctor.name || 'Not assigned';
    }
    return patient.assignedDoctor;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
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
          onClick={() => setActiveTab && setActiveTab('add-patient')}
          className="w-full sm:w-fit px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          + Admit Patient
        </button>
      </div>

      <div className="relative w-full lg:max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search patient ID, name, department..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {isLoading && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-sm font-bold text-slate-600">
            Loading patients...
          </p>
        </div>
      )}

      {!isLoading && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-sm font-bold text-red-700">{error}</p>

          <button
            type="button"
            onClick={fetchPatients}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
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
                  {filteredPatients.map((patient) => {
                    const priority = getPriorityLabel(patient);
                    const status = getStatusLabel(patient);

                    return (
                      <tr
                        key={patient._id}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="px-5 py-5">
                          <div className="font-bold text-sm text-slate-900">
                            {patient.name}
                          </div>

                          <div className="text-[10px] text-slate-400 font-semibold mt-1">
                            {patient.mrn || patient._id}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <span className="text-xs font-semibold text-slate-700">
                            {patient.age} Yrs / {patient.gender}
                          </span>
                        </td>

                        <td className="px-5 py-5">
                          <div className="text-xs font-bold text-slate-800">
                            {patient.department || 'General Medicine'}
                          </div>

                          <div className="text-[10px] text-slate-400 font-semibold mt-1">
                            {getDoctorName(patient)}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <span
                            className={`px-2.5 py-1.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 w-fit ${
                              priority.includes('VIP')
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : priority.includes('Priority')
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {priority.includes('VIP') && (
                              <Star className="w-3 h-3 fill-current" />
                            )}

                            {priority.includes('Priority') &&
                              !priority.includes('VIP') && (
                                <AlertCircle className="w-3 h-3" />
                              )}

                            {priority}
                          </span>
                        </td>

                        <td className="px-5 py-5">
                          <span
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold inline-block ${
                              status === 'Critical Priority'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="px-5 py-5 text-right">
                          <button
                            type="button"
                            onClick={() => handleSelect(patient)}
                            className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold flex items-center gap-1 text-xs ml-auto transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Open Chart
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-4">
            {filteredPatients.map((patient) => {
              const priority = getPriorityLabel(patient);
              const status = getStatusLabel(patient);

              return (
                <div
                  key={patient._id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-black text-sm text-slate-900 truncate">
                        {patient.name}
                      </h3>

                      <p className="text-[10px] text-slate-400 font-semibold mt-1">
                        {patient.mrn || patient._id}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                        status === 'Critical Priority'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {status}
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
                        {patient.department || 'General Medicine'}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        Doctor
                      </span>

                      <span className="block text-xs font-bold text-slate-700 mt-1">
                        {getDoctorName(patient)}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                        Priority
                      </span>

                      <span
                        className={`px-2.5 py-1.5 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1 ${
                          priority.includes('VIP')
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : priority.includes('Priority')
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {priority.includes('VIP') && (
                          <Star className="w-3 h-3 fill-current" />
                        )}

                        {priority.includes('Priority') &&
                          !priority.includes('VIP') && (
                            <AlertCircle className="w-3 h-3" />
                          )}

                        {priority}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelect(patient)}
                    className="w-full mt-4 px-4 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold flex items-center justify-center gap-2 text-xs transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Open Patient Chart
                  </button>
                </div>
              );
            })}
          </div>

          {filteredPatients.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />

              <p className="text-sm font-bold text-slate-700">
                No patients found
              </p>

              <p className="text-xs text-slate-400 mt-1">
                No patients match your search criteria.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
