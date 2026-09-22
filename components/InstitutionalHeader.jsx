// components/InstitutionalHeader.jsx

import Image from "next/image";

import {
  COLLEGE_NAME,
  CENTRE_NAME,
  DOCUMENT_TITLE,
  COLLEGE_ADDRESS,
} from "../lib/formSchema";

export default function InstitutionalHeader() {
  return (
    <header className="mx-auto max-w-4xl px-4 pt-5 sm:px-0 sm:pt-7">
      {/* Main Institutional Header */}
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Top Accent */}
        <div className="h-1.5 bg-institute-red" />

        <div className="px-5 py-5 sm:px-8 sm:py-6">
          {/* College Identity Row */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* College Logo */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 sm:h-20 sm:w-20">
              <Image
                src="/aaa-college-logo.png"
                alt="AAA College of Engineering and Technology logo"
                width={80}
                height={80}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            {/* Institution Information */}
            <div className="min-w-0 flex-1 text-center">
              <h1 className="text-base font-bold leading-tight tracking-tight text-institute-red sm:text-2xl">
                {COLLEGE_NAME}
              </h1>

              <div className="mx-auto mt-2 flex items-center justify-center gap-2">
                <span className="h-px w-6 bg-institute-red/40 sm:w-10" />

                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-institute-text sm:text-sm">
                  {CENTRE_NAME}
                </p>

                <span className="h-px w-6 bg-institute-red/40 sm:w-10" />
              </div>

              {/* Address */}
              <p className="mx-auto mt-2 max-w-2xl text-[10px] leading-4 text-gray-500 sm:text-xs">
                {COLLEGE_ADDRESS}
              </p>
            </div>

            {/* University Logo */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 sm:h-20 sm:w-20">
              <Image
                src="/anna-university-logo.png"
                alt="Anna University logo"
                width={80}
                height={80}
                className="h-full w-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Document Title */}
          <div className="mt-6 rounded-lg border border-institute-red/15 bg-red-50/40 px-4 py-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-institute-red sm:text-xs">
              Official Application Document
            </p>

            <h2 className="mt-1 text-sm font-bold text-institute-text sm:text-lg">
              {DOCUMENT_TITLE}
            </h2>
          </div>
        </div>

        {/* Bottom Institutional Bar */}
        <div className="flex flex-col items-center justify-center gap-1 border-t border-gray-200 bg-gray-50 px-5 py-2.5 text-center sm:flex-row sm:gap-3 sm:px-8">
          <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
            Student Startup & Innovation Programme
          </span>

          <span className="hidden h-3 w-px bg-gray-300 sm:block" />

          <span className="text-[10px] font-medium text-gray-500 sm:text-xs">
            {CENTRE_NAME}
          </span>
        </div>
      </div>
    </header>
  );
}
