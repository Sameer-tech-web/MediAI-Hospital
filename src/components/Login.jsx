import React, { useState } from 'react';
import {
  Stethoscope,
  User,
  Lock,
  FileText,
  ArrowRight,
  ShieldCheck,
  Activity,
} from 'lucide-react';

export default function Login({ onLoginSuccess, onOpenPatientPortal }) {
  const [accessMode, setAccessMode] = useState('staff');

  // Staff State
  const [role, setRole] = useState('Doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Patient State
  const [patientId, setPatientId] = useState('');
  const [patientCnic, setPatientCnic] = useState('');

  const handleStaffSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('Please fill in all staff credentials.');
      return;
    }

    onLoginSuccess(role);
  };

  const handlePatientSubmit = (e) => {
    e.preventDefault();

    if (!patientId.trim()) {
      alert('Please enter a valid Patient ID (e.g. #1042).');
      return;
    }

    if (!patientCnic.trim()) {
      alert('Please enter your CNIC or contact number.');
      return;
    }

    onOpenPatientPortal({
      id: patientId.trim(),
      cnic: patientCnic.trim(),
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-medBlue text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Stethoscope className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-white">
            MediAI Smart Hospital
          </h1>

          <p className="text-xs text-slate-400 mt-2">
            Clinical EHR System & Public Patient Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Access Mode Toggle */}
          <div className="p-2 bg-slate-100 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAccessMode('staff')}
              className={`py-3 text-xs font-bold rounded-xl transition-all ${
                accessMode === 'staff'
                  ? 'bg-medBlue text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Hospital Staff
            </button>

            <button
              type="button"
              onClick={() => setAccessMode('patient')}
              className={`py-3 text-xs font-bold rounded-xl transition-all ${
                accessMode === 'patient'
                  ? 'bg-medBlue text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Patient Portal
            </button>
          </div>

          <div className="p-7">
            {accessMode === 'staff' ? (
              <form onSubmit={handleStaffSubmit} className="space-y-5">
                {/* Staff Login Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-medBlue" />
                    <h2 className="text-lg font-black text-slate-900">
                      Staff Authentication
                    </h2>
                  </div>

                  <p className="text-xs text-slate-500">
                    Authorized hospital personnel only.
                  </p>
                </div>

                {/* Hospital Role */}
                <div>
                  <label
                    htmlFor="staff-role"
                    className="block text-xs font-bold text-slate-700 uppercase mb-2"
                  >
                    Hospital Role
                  </label>

                  <select
                    id="staff-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20"
                  >
                    <option value="Admin">Hospital Administrator</option>
                    <option value="Doctor">Attending Doctor</option>
                    <option value="Nurse">Staff Nurse</option>
                    <option value="Lab Technician">Lab Technician</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="staff-email"
                    className="block text-xs font-bold text-slate-700 uppercase mb-2"
                  >
                    Staff Email / Employee ID
                  </label>

                  <div className="relative">
                    <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      id="staff-email"
                      type="email"
                      required
                      autoComplete="username"
                      placeholder="doctor@mediai.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="staff-password"
                    className="block text-xs font-bold text-slate-700 uppercase mb-2"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      id="staff-password"
                      type="password"
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-medBlue hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  Access Hospital Console
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handlePatientSubmit} className="space-y-5">
                {/* Patient Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-medSuccess" />
                    <h2 className="text-lg font-black text-slate-900">
                      Patient Portal
                    </h2>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Enter your assigned Patient ID and CNIC/Phone for safe
                    online access to your medical timeline and billing
                    statements.
                  </p>
                </div>

                {/* Patient ID */}
                <div>
                  <label
                    htmlFor="patient-id"
                    className="block text-xs font-bold text-slate-700 uppercase mb-2"
                  >
                    Patient ID *
                  </label>

                  <div className="relative">
                    <Activity className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      id="patient-id"
                      type="text"
                      required
                      placeholder="e.g. #1042"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20"
                    />
                  </div>
                </div>

                {/* CNIC */}
                <div>
                  <label
                    htmlFor="patient-cnic"
                    className="block text-xs font-bold text-slate-700 uppercase mb-2"
                  >
                    CNIC or Contact Number *
                  </label>

                  <div className="relative">
                    <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      id="patient-cnic"
                      type="text"
                      required
                      placeholder="42101-9988221-1 or +92 300 1234567"
                      value={patientCnic}
                      onChange={(e) => setPatientCnic(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-medSuccess hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  View Reports & Invoice
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Security Footer */}
          <div className="px-7 py-4 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Secure Clinical Access
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-500 mt-5">
          MediAI Smart Hospital • Enterprise Clinical EHR
        </p>
      </div>
    </div>
  );
}
