import React, { useState } from 'react';
import {
  Syringe,
  RefreshCw,
  HeartPulse,
  Activity,
} from 'lucide-react';

export default function NursePanel() {
  const [nurseData, setNurseData] = useState({
    patient: 'John Doe (#1042)',
    bp: '180/110',
    pulse: '98',
    sugar: '290',
    urineOutput: 'Normal Voiding',
    urineVolume: '450',
    stoolStatus: 'Normal Formed',
    edemaLevel: 'Mild (+1 Feet)',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNurseData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    alert('Vitals and Excretion Telemetry updated successfully!');
  };

  return (
    <div className="p-8 space-y-6 bg-medWhite min-h-full max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Syringe className="w-6 h-6 text-medSuccess" />
            <span>
              Nurse Station & Clinical Intake/Output Telemetry
            </span>
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Log periodic vitals, fluid elimination (Susu/Stool), and edema
            checks.
          </p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Patient Selection */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <label
            htmlFor="patient"
            className="block text-xs font-bold text-slate-700 uppercase mb-2"
          >
            Select Patient
          </label>

          <select
            id="patient"
            name="patient"
            value={nurseData.patient}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medSuccess/20"
          >
            <option value="John Doe (#1042)">
              John Doe (#1042) - Ward 3, Bed 12
            </option>

            <option value="Emma Watson (#1043)">
              Emma Watson (#1043) - Ward 2, Bed 4
            </option>
          </select>
        </div>

        {/* Standard Vitals */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-medDanger" />
            <span>Standard Vitals Telemetry</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Blood Pressure */}
            <div>
              <label
                htmlFor="bp"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Blood Pressure (mmHg)
              </label>

              <input
                id="bp"
                type="text"
                name="bp"
                value={nurseData.bp}
                onChange={handleChange}
                placeholder="e.g. 120/80"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-medDanger/20"
              />
            </div>

            {/* Pulse */}
            <div>
              <label
                htmlFor="pulse"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Pulse (bpm)
              </label>

              <input
                id="pulse"
                type="text"
                name="pulse"
                value={nurseData.pulse}
                onChange={handleChange}
                placeholder="e.g. 72"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-medDanger/20"
              />
            </div>

            {/* Blood Sugar */}
            <div>
              <label
                htmlFor="sugar"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Blood Sugar (mg/dL)
              </label>

              <input
                id="sugar"
                type="text"
                name="sugar"
                value={nurseData.sugar}
                onChange={handleChange}
                placeholder="e.g. 110"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-medDanger/20"
              />
            </div>
          </div>
        </div>

        {/* Fluid Elimination */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-medBlue" />
            <span>
              Fluid Elimination & Biological Excretion Check
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Urinary Status */}
            <div>
              <label
                htmlFor="urineOutput"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Urinary Status (Susu Output)
              </label>

              <select
                id="urineOutput"
                name="urineOutput"
                value={nurseData.urineOutput}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-medBlue/20"
              >
                <option value="Normal Voiding">
                  Normal Voiding
                </option>

                <option value="Reduced Output">
                  Reduced Output (Oliguria)
                </option>

                <option value="Foley Catheter Inserted">
                  Foley Catheter Inserted
                </option>

                <option value="Retention / Unable">
                  Urinary Retention
                </option>
              </select>
            </div>

            {/* Urine Volume */}
            <div>
              <label
                htmlFor="urineVolume"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Urine Volume (mL / shift)
              </label>

              <input
                id="urineVolume"
                type="text"
                name="urineVolume"
                value={nurseData.urineVolume}
                onChange={handleChange}
                placeholder="e.g. 450"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-medBlue/20"
              />
            </div>

            {/* Stool Status */}
            <div>
              <label
                htmlFor="stoolStatus"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Bowel Elimination (Stool / Tatti Output)
              </label>

              <select
                id="stoolStatus"
                name="stoolStatus"
                value={nurseData.stoolStatus}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-medBlue/20"
              >
                <option value="Normal Formed">
                  Normal Formed Stool
                </option>

                <option value="Loose / Diarrhea">
                  Loose Stool / Diarrhea
                </option>

                <option value="Constipated">
                  Constipated (No stool today)
                </option>
              </select>
            </div>

            {/* Edema */}
            <div>
              <label
                htmlFor="edemaLevel"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Edema Level (Sojan / Haleema Check)
              </label>

              <select
                id="edemaLevel"
                name="edemaLevel"
                value={nurseData.edemaLevel}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-medBlue/20"
              >
                <option value="None">
                  No Edema (Normal)
                </option>

                <option value="Mild (+1 Feet)">
                  Mild (+1 Feet / Ankle)
                </option>

                <option value="Moderate (+2 Legs)">
                  Moderate (+2 Legs)
                </option>

                <option value="Severe (+4 Generalized)">
                  Severe (+4 Generalized / Facial)
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-end pb-10">
          <button
            type="submit"
            className="px-6 py-3 bg-medSuccess hover:bg-green-700 text-white font-semibold text-sm rounded-xl shadow-md flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Update Telemetry Records
          </button>
        </div>
      </form>
    </div>
  );
}
