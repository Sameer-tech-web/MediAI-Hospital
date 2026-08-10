import React, { useState } from 'react';
import { Stethoscope, Sparkles, CheckCircle } from 'lucide-react';

export default function DoctorPanel() {
  const [docData, setDocData] = useState({
    patient: 'John Doe (#1042)',
    diagnosis: 'Hypertensive Urgency with Hyperglycemia',
    medicine: '',
    notes:
      'Patient advised strict low-sodium diet and daily blood sugar monitoring.',
  });

  const medicineDatabase = [
    {
      name: 'Amlodipine 5mg',
      formula: 'Amlodipine Besylate - Anti-hypertensive',
    },
    {
      name: 'Amlodipine 10mg',
      formula: 'Amlodipine Besylate - Anti-hypertensive',
    },
    {
      name: 'Paracetamol 500mg',
      formula: 'Acetaminophen - Antipyretic/Analgesic',
    },
    {
      name: 'Insulin Regular 10 IU',
      formula: 'Human Insulin - Anti-diabetic',
    },
    {
      name: 'Metformin 500mg',
      formula: 'Biguanide - Glucose Control',
    },
  ];

  const [medQuery, setMedQuery] = useState('');
  const [filteredMeds, setFilteredMeds] = useState([]);

  const quickSymptoms = [
    'Chest Pain (Seene mein dard)',
    'Shortness of Breath',
    'Edema / Sojan (Haleema)',
    'High BP Spike',
    'High Blood Sugar',
    'Severe Headache',
  ];

  const handleMedQueryChange = (e) => {
    const query = e.target.value;

    setMedQuery(query);

    if (query.trim().length > 0) {
      const matches = medicineDatabase.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(query.toLowerCase()) ||
          medicine.formula.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredMeds(matches);
    } else {
      setFilteredMeds([]);
    }
  };

  const selectMedicine = (medName) => {
    const updated = docData.medicine
      ? `${docData.medicine}, ${medName}`
      : medName;

    setDocData({
      ...docData,
      medicine: updated,
    });

    setMedQuery('');
    setFilteredMeds([]);
  };

  const addSymptomToDiagnosis = (symptom) => {
    const updated = docData.diagnosis
      ? `${docData.diagnosis} | ${symptom}`
      : symptom;

    setDocData({
      ...docData,
      diagnosis: updated,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    alert('Clinical diagnosis and prescription saved successfully!');
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-medBlue" />
            <span>Doctor Examination & Smart Prescription</span>
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Fast 1-click symptoms tagging & medication formula search.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl">
          <Sparkles className="w-4 h-4 text-medBlue" />
          <span className="text-[10px] font-black text-medBlue uppercase tracking-wide">
            Smart Clinical Panel
          </span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Patient Selection */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
            Select Patient
          </label>

          <select
            value={docData.patient}
            onChange={(e) =>
              setDocData({
                ...docData,
                patient: e.target.value,
              })
            }
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20"
          >
            <option value="John Doe (#1042)">
              John Doe (#1042) - Ward 3, Bed 12
            </option>

            <option value="Emma Watson (#1043)">
              Emma Watson (#1043) - Ward 2, Bed 4
            </option>
          </select>
        </div>

        {/* Clinical Assessment */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Clinical Assessment
            </h3>

            <p className="text-[10px] text-slate-400 mt-1">
              Add common symptoms quickly or enter a detailed diagnosis.
            </p>
          </div>

          {/* Quick Symptoms */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              1-Click Quick Symptoms
            </label>

            <div className="flex flex-wrap gap-2">
              {quickSymptoms.map((symptom, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addSymptomToDiagnosis(symptom)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-medBlue font-bold text-xs rounded-xl border border-blue-200 transition-all"
                >
                  + {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Diagnosis Remarks
            </label>

            <textarea
              rows="3"
              value={docData.diagnosis}
              onChange={(e) =>
                setDocData({
                  ...docData,
                  diagnosis: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20 resize-y"
              placeholder="Enter clinical diagnosis and assessment..."
            />
          </div>

          {/* Clinical Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Clinical Notes
            </label>

            <textarea
              rows="3"
              value={docData.notes}
              onChange={(e) =>
                setDocData({
                  ...docData,
                  notes: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20 resize-y"
              placeholder="Enter additional clinical notes..."
            />
          </div>
        </div>

        {/* Medication */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-medBlue" />
              <span>Prescribe Medication (Formula Search)</span>
            </h3>

            <p className="text-[10px] text-slate-400 mt-1">
              Search by medicine name or generic formula.
            </p>
          </div>

          {/* Medicine Search */}
          <div className="relative">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Type Brand or Generic Formula
            </label>

            <input
              type="text"
              placeholder="Start typing medicine or formula..."
              value={medQuery}
              onChange={handleMedQueryChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20"
            />

            {/* Search Results */}
            {filteredMeds.length > 0 && (
              <div className="absolute z-20 left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                {filteredMeds.map((medicine, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectMedicine(medicine.name)}
                    className="w-full p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 border-slate-100 flex items-center justify-between gap-4 text-left transition-colors"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-black text-slate-900 block">
                        {medicine.name}
                      </span>

                      <span className="text-[10px] text-slate-500 block mt-1">
                        {medicine.formula}
                      </span>
                    </div>

                    <span className="shrink-0 text-xs font-black text-medBlue">
                      + Add
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {medQuery.trim() && filteredMeds.length === 0 && (
              <div className="mt-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500">
                No matching medicine found in the current database.
              </div>
            )}
          </div>

          {/* Prescribed List */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Prescribed List
            </label>

            <textarea
              rows="3"
              value={docData.medicine}
              onChange={(e) =>
                setDocData({
                  ...docData,
                  medicine: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20 resize-y"
              placeholder="Selected medicines will appear here..."
            />
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pb-10">
          <button
            type="submit"
            className="px-6 py-3 bg-medBlue hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Save Clinical Assessment
          </button>
        </div>
      </form>
    </div>
  );
}
