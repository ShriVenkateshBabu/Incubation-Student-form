// components/sections/StudentDetailsSection.jsx

import SectionCard from "../ui/SectionCard";
import FormField from "../ui/FormField";

export default function StudentDetailsSection({ data, errors, onChange }) {
  return (
    <SectionCard sectionLabel="Section A" title="Student Details">
      <div className="space-y-7">
        {/* Section Introduction */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-institute-red text-sm font-bold text-white">
              A
            </div>

            <div>
              <h3 className="text-sm font-semibold text-institute-text">
                Applicant Information
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Provide your official student and contact details as recorded by
                the institution. Please ensure that all information is accurate
                and up to date.
              </p>
            </div>
          </div>
        </div>

        {/* Student Identity */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              1. Student Identity
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Enter your official student identification details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Student Name"
              name="studentName"
              value={data.studentName}
              onChange={onChange}
              required
              error={errors.studentName}
              placeholder="Enter your full name"
            />

            <FormField
              label="Register Number / Student ID"
              name="registerNumber"
              value={data.registerNumber}
              onChange={onChange}
              required
              error={errors.registerNumber}
              placeholder="Enter your register number / student ID"
            />
          </div>
        </div>

        {/* Academic Information */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              2. Academic Information
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Provide your current programme and academic details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Department"
              name="department"
              value={data.department}
              onChange={onChange}
              required
              error={errors.department}
              placeholder="e.g. Computer Science & Engineering"
            />

            <FormField
              label="Programme / Course"
              name="programme"
              value={data.programme}
              onChange={onChange}
              required
              error={errors.programme}
              placeholder="e.g. B.E. / B.Tech. / M.E."
            />

            <FormField
              label="Year / Semester"
              name="yearSemester"
              value={data.yearSemester}
              onChange={onChange}
              placeholder="e.g. III Year / VI Semester"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              3. Contact Information
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Provide an active email address and mobile number for R&I D
              communication.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Student Email ID"
              name="email"
              type="email"
              value={data.email}
              onChange={onChange}
              required
              error={errors.email}
              placeholder="student@example.com"
            />

            <FormField
              label="Mobile Number"
              name="mobileNumber"
              type="tel"
              value={data.mobileNumber}
              onChange={onChange}
              required
              error={errors.mobileNumber}
              placeholder="Enter your mobile number"
            />
          </div>
        </div>

        {/* Information Notice */}
        <div className="flex items-start gap-3 rounded-md border-l-4 border-institute-red bg-red-50/50 px-4 py-3">
          <div className="mt-0.5 shrink-0 text-sm text-institute-red">ⓘ</div>

          <div>
            <p className="text-xs font-semibold text-institute-text">
              Important
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              Please use your official student details and an active contact
              number and email address. These details may be used by the R&I D
              for application-related communication.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
