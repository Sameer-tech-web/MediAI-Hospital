import React from 'react';
import { FileSpreadsheet, Printer } from 'lucide-react';

export default function Reports() {
  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-medBlue" />
            <span>Hospital Executive & Financial Reports</span>
          </h2>

          <p className="text-xs text-slate-500">
            Consolidated analytics for clinical operations and revenue billing.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1"
        >
          <Printer className="w-4 h-4" />
          Print Full Summary
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Clinical Summary */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
            Monthly Clinical Summary
          </h3>

          <div className="space-y-2 text-xs font-semibold">
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span>Total Admissions:</span>
              <span className="font-black">342</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-50">
              <span>Discharged Recovered:</span>
              <span className="font-black text-emerald-600">310</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Transferred Cases:</span>
              <span className="font-black text-amber-600">18</span>
            </div>
          </div>
        </div>

        {/* Financial Revenue Ledger */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
            Financial Revenue Ledger
          </h3>

          <div className="space-y-2 text-xs font-semibold">
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span>Gross Billing Invoiced:</span>
              <span className="font-black">PKR 12,450,000</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-50">
              <span>Collected Payments:</span>
              <span className="font-black text-emerald-600">
                PKR 10,200,000
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span>Outstanding Receivables:</span>
              <span className="font-black text-red-600">
                PKR 2,250,000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
