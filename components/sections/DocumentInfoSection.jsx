// components/sections/DocumentInfoSection.jsx

import SectionCard from "../ui/SectionCard";
import FormField from "../ui/FormField";
import { DOCUMENT_TITLE } from "../../lib/formSchema";

export default function DocumentInfoSection({ data, onChange }) {
  return (
    <SectionCard sectionLabel="Document Information" title={DOCUMENT_TITLE}>
      <div className="space-y-6">
        {/* Document Introduction */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-institute-red text-sm font-bold text-white">
              01
            </div>

            <div>
              <h3 className="text-sm font-semibold text-institute-text">
                Application Details
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Provide the basic information associated with this R&I D
                application. Fields marked as assigned by the Centre will be
                completed by the R&I D.
              </p>
            </div>
          </div>
        </div>

        {/* Application Identification */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              Application Identification
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Information used to identify and track the application.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Application ID"
              name="applicationId"
              value={data.applicationId}
              onChange={onChange}
              placeholder="Assigned by the R&I D"
            />

            <FormField
              label="Date of Submission"
              name="submissionDate"
              type="date"
              value={data.submissionDate}
              onChange={onChange}
            />
          </div>
        </div>

        {/* Academic Information */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              Academic Information
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Enter your current academic year and department details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Academic Year"
              name="academicYear"
              value={data.academicYear}
              onChange={onChange}
              placeholder="e.g. 2026-2027"
            />

            <FormField
              label="Department"
              name="department"
              value={data.department}
              onChange={onChange}
              placeholder="Enter your department"
            />
          </div>
        </div>

        {/* Administrative Note */}
        <div className="flex items-start gap-3 rounded-md border-l-4 border-institute-red bg-red-50/50 px-4 py-3">
          <div className="mt-0.5 shrink-0 text-sm text-institute-red">ⓘ</div>

          <div>
            <p className="text-xs font-semibold text-institute-text">
              Administrative Information
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              The Application ID may be assigned by the R&I D during the
              application processing stage. Please retain the assigned
              Application ID for future communication and reference.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
