// components/sections/DeclarationSection.jsx

import SectionCard from "../ui/SectionCard";
import FormField from "../ui/FormField";

export default function DeclarationSection({
  data,
  errors,
  onChange,
  onToggleAgreed,
}) {
  return (
    <SectionCard
      sectionLabel="Section I"
      title="Student Declaration & Confirmation"
    >
      <div className="space-y-6">
        {/* Declaration Information */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-institute-red text-sm font-semibold text-white">
              I
            </div>

            <h3 className="text-sm font-semibold text-institute-text">
              Declaration
            </h3>
          </div>

          <p className="text-sm leading-6 text-gray-700">
            I hereby declare that the information provided in this application
            is true, complete, and accurate to the best of my knowledge. I
            understand that submission of this application does not
            automatically guarantee admission into the Pre-Incubation Programme.
          </p>

          <p className="mt-3 text-sm leading-6 text-gray-700">
            I agree to participate in the evaluation process and provide any
            additional information, clarification, or supporting documentation
            that may be required by the R&I D.
          </p>
        </div>

        {/* Agreement Checkbox */}
        <div
          className={`rounded-lg border p-4 transition ${
            errors.agreed
              ? "border-red-300 bg-red-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={data.agreed}
              onChange={(e) => onToggleAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-institute-red focus:ring-2 focus:ring-institute-red"
            />

            <span className="text-sm leading-6 text-institute-text">
              I have read, understood, and agree to the declaration stated
              above. I confirm that the information submitted in this
              application is accurate and complete.
              <span className="ml-1 font-semibold text-institute-red">*</span>
            </span>
          </label>

          {errors.agreed && (
            <p className="mt-2 ml-7 text-xs font-medium text-red-600">
              {errors.agreed}
            </p>
          )}
        </div>

        {/* Student Details */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              Applicant Confirmation
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Please verify your name and the date before submitting the
              application.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Student Name"
              name="studentName"
              value={data.studentName}
              onChange={onChange}
              required
            />

            <FormField
              label="Date"
              name="date"
              type="date"
              value={data.date}
              onChange={onChange}
              required
            />
          </div>
        </div>

        {/* Signature Information */}
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/70 p-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-8 text-xs font-medium uppercase tracking-wide text-gray-500">
                Student Signature
              </p>

              <div className="border-b border-gray-400" />

              <p className="mt-2 text-xs text-gray-500">
                Signature to be provided on the printed copy
              </p>
            </div>

            <div>
              <p className="mb-8 text-xs font-medium uppercase tracking-wide text-gray-500">
                Date
              </p>

              <div className="border-b border-gray-400" />

              <p className="mt-2 text-xs text-gray-500">Date of declaration</p>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="flex gap-3 rounded-md border-l-4 border-institute-red bg-red-50/50 px-4 py-3">
          <div className="mt-0.5 shrink-0 text-institute-red">ⓘ</div>

          <p className="text-xs leading-5 text-gray-600">
            <span className="font-semibold text-institute-text">
              Important:
            </span>{" "}
            Submission of this application indicates your willingness to
            participate in the Pre-Incubation Programme evaluation process.
            Selection and admission will be subject to the applicable evaluation
            criteria and institutional guidelines.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
