import React, { useState } from 'react';
import { UserPlus, CheckCircle } from 'lucide-react';

export default function AddPatient({ setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    cnic: '',
    phone: '',
    dept: 'Cardiology',
    doctor: 'Dr. Sarah Jenkins',
    vipTag: 'Standard Patient',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    // Current frontend behavior: simulate successful admission.
    setTimeout(() => {
      alert('Patient admitted and registered into system!');
      setIsSubmitting(false);
      setActiveTab('patients');
    }, 500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
          <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-medBlue shrink-0" />

          <span>New Patient Admission</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Register new hospital patient and assign priority status.
        </p>
      </div>

      {/* Admission Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-5"
      >
        {/* Name + Age/Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="patient-name"
              className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-2"
            >
              Full Name *
            </label>

            <input
              id="patient-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-medBlue/20 focus:border-medBlue transition-all"
            />
          </div>

          {/* Age + Gender */}
          <div>
            <label
              htmlFor="patient-age"
              className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-2"
            >
              Age & Gender *
            </label>

            <div className="flex flex-col xs:flex-row sm:flex-row gap-2">
              <input
                id="patient-age"
                name="age"
                type="number"
                min="0"
                max="150"
                required
                inputMode="numeric"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full sm:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-medBlue/20 focus:border-medBlue transition-all"
              />

              <select
                id="patient-gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full sm:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20 focus:border-medBlue transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* CNIC + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* CNIC */}
          <div>
            <label
              htmlFor="patient-cnic"
              className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-2"
            >
              CNIC / ID Number *
            </label>

            <input
              id="patient-cnic"
              name="cnic"
              type="text"
              required
              inputMode="numeric"
              autoComplete="off"
              placeholder="42101-XXXXXXX-X"
              value={formData.cnic}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-medBlue/20 focus:border-medBlue transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="patient-phone"
              className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-2"
            >
              Phone Number
            </label>

            <input
              id="patient-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="03XX-XXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-medBlue/20 focus:border-medBlue transition-all"
            />
          </div>
        </div>

        {/* Department + Doctor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label
              htmlFor="patient-dept"
              className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-2"
            >
              Department
            </label>

            <select
              id="patient-dept"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20 focus:border-medBlue transition-all"
            >
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="ICU Critical">ICU Critical</option>
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label
              htmlFor="patient-doctor"
              className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-2"
            >
              Assigned Doctor
            </label>

            <select
              id="patient-doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20 focus:border-medBlue transition-all"
            >
              <option value="Dr. Sarah Jenkins">
                Dr. Sarah Jenkins
              </option>

              <option value="Dr. Robert Chen">
                Dr. Robert Chen
              </option>

              <option value="Dr. Lisa Ray">
                Dr. Lisa Ray
              </option>
            </select>
          </div>
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="patient-priority"
            className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase mb-2"
          >
            Priority Flag
          </label>

          <select
            id="patient-priority"
            name="vipTag"
            value={formData.vipTag}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20 focus:border-medBlue transition-all"
          >
            <option value="Standard Patient">
              Standard Patient
            </option>

            <option value="Doctor Relative VIP">
              Doctor Relative / Staff VIP
            </option>

            <option value="Critical Priority">
              Critical Priority
            </option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 bg-medBlue hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
        >
          <CheckCircle className="w-4 h-4" />

          {isSubmitting
            ? 'Saving Admission...'
            : 'Save & Complete Admission'}
        </button>
      </form>
    </div>
  );
}
