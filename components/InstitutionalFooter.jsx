// components/InstitutionalFooter.jsx

import { COLLEGE_NAME, CENTRE_NAME, COLLEGE_ADDRESS } from "../lib/formSchema";

export default function InstitutionalFooter() {
  return (
    <footer className="mx-auto mt-14 max-w-4xl px-4 pb-8 sm:px-0">
      {/* Main Footer Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Institutional Header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-6 text-center sm:px-8">
          <div className="mx-auto max-w-3xl">
            {/* College Name */}
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-institute-text sm:text-base">
              {COLLEGE_NAME}
            </h3>

            {/* Centre Name */}
            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-institute-red/50" />

              <p className="text-xs font-semibold uppercase tracking-wider text-institute-red">
                {CENTRE_NAME}
              </p>

              <span className="h-px w-8 bg-institute-red/50" />
            </div>

            {/* Address */}
            <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
              {COLLEGE_ADDRESS}
            </p>
          </div>
        </div>

        {/* Document Identity */}
        <div className="px-6 py-5 sm:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
            {/* Document Type */}
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Document
              </p>

              <p className="mt-1 text-xs font-medium text-institute-text">
                Student Startup / Innovation
                <span className="hidden sm:inline"> </span>
                Idea Submission Form
              </p>
            </div>

            {/* Official Document Badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-institute-red/20 bg-red-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-institute-red">
                <span className="h-1.5 w-1.5 rounded-full bg-institute-red" />
                Official Institutional Document
              </span>
            </div>

            {/* Centre */}
            <div className="text-center sm:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Issued By
              </p>

              <p className="mt-1 text-xs font-medium text-institute-text">
                {CENTRE_NAME}
              </p>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 sm:px-8">
          <p className="text-center text-[10px] leading-4 text-gray-400">
            This form is intended for institutional R&I D and innovation
            activities. Please retain a copy of the submitted application for
            your records.
          </p>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-institute-red" />
      </div>

      {/* Copyright / Institutional Reference */}
      <div className="mt-3 flex flex-col items-center justify-between gap-1 text-[10px] text-gray-400 sm:flex-row">
        <span>{COLLEGE_NAME}</span>

        <span>R&I D • Student Innovation Programme</span>
      </div>
    </footer>
  );
}
