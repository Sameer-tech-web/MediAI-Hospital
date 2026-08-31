import React, { useState } from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  CheckCircle, 
  Plus, 
  X, 
  History, 
  Pill, 
  FlaskConical, 
  FileText 
} from 'lucide-react';

// Mock Patient Database to demonstrate auto-load feature
const MOCK_PATIENTS_DATA = {
  'John Doe (#1042)': {
    diagnosis: 'Hypertensive Urgency with Hyperglycemia',
    symptoms: ['High BP Spike', 'High Blood Sugar'],
    notes: 'Patient advised strict low-sodium diet and daily blood sugar monitoring.',
    medicines: [
      { id: 101, name: 'Amlodipine 5mg', dosage: '1-0-1', timing: 'After Meal', duration: '14 Days' },
      { id: 102, name: 'Metformin 500mg', dosage: '1-0-1', timing: 'Before Meal', duration: '30 Days' }
    ],
    labTests: ['Fasting Blood Sugar (FBS)', 'ECG 12-Lead']
  },
  'Emma Watson (#1043)': {
    diagnosis: 'Acute Gastritis & Tension Headache',
    symptoms: ['Mild Headache', 'Acidity / Heartburn'],
    notes: 'Avoid spicy food. Drink at least 3 liters of water daily.',
    medicines: [
      { id: 201, name: 'Paracetamol 500mg', dosage: '1-0-1', timing: 'After Meal', duration: '3 Days' }
    ],
    labTests: ['CBC (Complete Blood Count)']
  }
};

const MEDICINE_DATABASE = [
  { name: 'Amlodipine 5mg', formula: 'Amlodipine Besylate - Anti-hypertensive' },
  { name: 'Amlodipine 10mg', formula: 'Amlodipine Besylate - Anti-hypertensive' },
  { name: 'Paracetamol 500mg', formula: 'Acetaminophen - Antipyretic/Analgesic' },
  { name: 'Insulin Regular 10 IU', formula: 'Human Insulin - Anti-diabetic' },
  { name: 'Metformin 500mg', formula: 'Biguanide - Glucose Control' },
  { name: 'Omeprazole 20mg (Risek)', formula: 'PPI - Anti-Ulcerant / Acidity' },
  { name: 'Ibuprofen 400mg (Brufen)', formula: 'NSAID - Pain Relief' },
  { name: 'Cefixime 400mg', formula: 'Cephalosporin - Antibiotic' }
];

const CATEGORIZED_SYMPTOMS = {
  'General & Pain': ['Mild Headache', 'Severe Headache', 'Body Ache', 'Joint Pain'],
  'Cardiac & Vital': ['Chest Pain (Seene mein dard)', 'High BP Spike', 'High Blood Sugar', 'Shortness of Breath'],
  'Gastro & Renal': ['Acidity / Heartburn', 'Stomach Cramps', 'Nausea / Vomiting', 'Edema / Sojan (Haleema)']
};

const COMMON_LAB_TESTS = [
  'CBC (Complete Blood Count)',
  'LFT (Liver Function Test)',
  'RFT (Renal Function Test)',
  'Fasting Blood Sugar (FBS)',
  'HbA1c',
  'Chest X-Ray (PA View)',
  'ECG 12-Lead',
  'Urine Routine'
];

export default function DoctorPanel() {
  const [selectedPatient, setSelectedPatient] = useState('John Doe (#1042)');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['High BP Spike', 'High Blood Sugar']);
  const [diagnosis, setDiagnosis] = useState('Hypertensive Urgency with Hyperglycemia');
  const [notes, setNotes] = useState('Patient advised strict low-sodium diet and daily blood sugar monitoring.');
  
  // Structured Prescribed Medicines Array
  const [prescribedMeds, setPrescribedMeds] = useState([
    { id: 1, name: 'Amlodipine 5mg', dosage: '1-0-1', timing: 'After Meal', duration: '14 Days' }
  ]);
  
  // Selected Lab Tests
  const [selectedLabTests, setSelectedLabTests] = useState(['Fasting Blood Sugar (FBS)']);

  // Medicine Search & Configurator State
  const [medQuery, setMedQuery] = useState('');
  const [filteredMeds, setFilteredMeds] = useState([]);
  const [tempMedConfig, setTempMedConfig] = useState({
    name: '',
    dosage: '1-0-1',
    timing: 'After Meal',
    duration: '5 Days'
  });

  // Handle Patient Switching (Auto Populate existing patient data)
  const handlePatientChange = (patientKey) => {
    setSelectedPatient(patientKey);
    const data = MOCK_PATIENTS_DATA[patientKey];
    if (data) {
      setDiagnosis(data.diagnosis || '');
      setSelectedSymptoms(data.symptoms || []);
      setNotes(data.notes || '');
      setPrescribedMeds(data.medicines || []);
      setSelectedLabTests(data.labTests || []);
    }
  };

  // Toggle Symptom Tags
  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Toggle Lab Test Tags
  const toggleLabTest = (test) => {
    if (selectedLabTests.includes(test)) {
      setSelectedLabTests(selectedLabTests.filter((t) => t !== test));
    } else {
      setSelectedLabTests([...selectedLabTests, test]);
    }
  };

  // Search Medicines
  const handleMedQueryChange = (e) => {
    const query = e.target.value;
    setMedQuery(query);
    setTempMedConfig({ ...tempMedConfig, name: query });

    if (query.trim().length > 0) {
      const matches = MEDICINE_DATABASE.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.formula.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMeds(matches);
    } else {
      setFilteredMeds([]);
    }
  };

  // Add Medicine with Dosage & Schedule
  const addMedicineToPrescription = (medNameOverride) => {
    const finalName = medNameOverride || tempMedConfig.name;
    if (!finalName.trim()) return;

    const newMedItem = {
      id: Date.now(),
      name: finalName,
      dosage: tempMedConfig.dosage,
      timing: tempMedConfig.timing,
      duration: tempMedConfig.duration
    };

    setPrescribedMeds([...prescribedMeds, newMedItem]);
    setMedQuery('');
    setFilteredMeds([]);
    setTempMedConfig({ name: '', dosage: '1-0-1', timing: 'After Meal', duration: '5 Days' });
  };

  // Remove Individual Medicine
  const removeMedicine = (id) => {
    setPrescribedMeds(prescribedMeds.filter((m) => m.id !== id));
  };

  // Repeat Previous Prescription Feature
  const handleRepeatPreviousRx = () => {
    const pastData = MOCK_PATIENTS_DATA[selectedPatient];
    if (pastData && pastData.medicines) {
      setPrescribedMeds(pastData.medicines);
      setSelectedLabTests(pastData.labTests || []);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Smart Prescription & Clinical Assessment saved successfully!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-blue-600" />
            <span>Doctor Examination & Smart Prescription</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Fast 1-click symptoms tagging, structured dosage builder & instant lab order panel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRepeatPreviousRx}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-colors"
          >
            <History className="w-4 h-4" />
            <span>Repeat Past Rx</span>
          </button>
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wide">
              Smart Clinical Panel
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* Patient Selection Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
            Select Patient (Auto-loads Previous History)
          </label>
          <select
            value={selectedPatient}
            onChange={(e) => handlePatientChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            <option value="John Doe (#1042)">John Doe (#1042) - Ward 3, Bed 12</option>
            <option value="Emma Watson (#1043)">Emma Watson (#1043) - Ward 2, Bed 4</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Symptoms, Diagnosis & Medicine Builder */}
          <div className="lg:col-span-2 space-y-6">

            {/* Categorized Symptoms */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>1-Click Symptoms Tagging</span>
                <span className="text-[10px] text-slate-400 font-normal">Click to toggle symptoms</span>
              </h3>

              {Object.entries(CATEGORIZED_SYMPTOMS).map(([category, symptoms]) => (
                <div key={category} className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{category}</span>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom);
                      return (
                        <button
                          key={symptom}
                          type="button"
                          onClick={() => toggleSymptom(symptom)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                          }`}
                        >
                          {isSelected ? <CheckCircle className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                          {symptom}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Diagnosis & Notes */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Diagnosis Remarks
                </label>
                <textarea
                  rows="2"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter clinical diagnosis..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Clinical Notes / Diet Advice
                </label>
                <textarea
                  rows
