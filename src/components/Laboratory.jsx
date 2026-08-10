import React, { useRef, useState } from 'react';
import { FlaskConical, Upload, CheckCircle, FileText, X } from 'lucide-react';

export default function Laboratory() {
  const fileInputRef = useRef(null);

  const [selectedPatient, setSelectedPatient] = useState('#1042');
  const [testCategory, setTestCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please select a PDF, PNG, or JPG file.');
      e.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be 10MB or less.');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!testCategory.trim()) {
      alert('Please enter the test category first.');
      return;
    }

    if (!selectedFile) {
      alert('Please select a laboratory report first.');
      return;
    }

    alert('Lab report uploaded & attached to patient file!');

    setTestCategory('');
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-purple-600" />
          <span>Pathology Diagnostic Laboratory</span>
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Upload and verify clinical laboratory results.
        </p>
      </div>

      {/* Laboratory Form */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        {/* Patient */}
        <div>
          <label
            htmlFor="lab-patient"
            className="block text-xs font-bold text-slate-700 uppercase mb-2"
          >
            Select Patient ID
          </label>

          <select
            id="lab-patient"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="#1042">John Doe (#1042)</option>
            <option value="#1043">Emma Watson (#1043)</option>
            <option value="#1044">Michael Vance (#1044)</option>
          </select>
        </div>

        {/* Test Category */}
        <div>
          <label
            htmlFor="test-category"
            className="block text-xs font-bold text-slate-700 uppercase mb-2"
          >
            Test Category
          </label>

          <input
            id="test-category"
            type="text"
            value={testCategory}
            onChange={(e) => setTestCategory(e.target.value)}
            placeholder="e.g. Complete Blood Count (CBC) / Lipid Profile"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 p-8 rounded-2xl text-center space-y-2 bg-slate-50/50 hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-all"
        >
          <Upload className="w-8 h-8 text-slate-400 mx-auto" />

          <span className="text-xs font-bold text-slate-700 block">
            Drag & Drop PDF Report or Click to Upload
          </span>

          <span className="text-[10px] text-slate-400 block">
            Supported formats: PDF, PNG, JPG (Max 10MB)
          </span>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Selected File */}
        {selectedFile && (
          <div className="flex items-center justify-between gap-3 p-4 bg-purple-50 border border-purple-100 rounded-xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {selectedFile.name}
                </p>

                <p className="text-[10px] text-slate-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeSelectedFile}
              className="p-2 hover:bg-white rounded-lg text-slate-500 hover:text-red-600 transition-colors"
              aria-label="Remove selected file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <button
          type="button"
          onClick={handleUpload}
          className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Upload Certified Lab Report
        </button>
      </div>
    </div>
  );
}
