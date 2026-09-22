// components/sections/SupportRequiredSection.jsx

import SectionCard from "../ui/SectionCard";
import FormField from "../ui/FormField";
import TextAreaField from "../ui/TextAreaField";
import CheckboxGroup from "../ui/CheckboxGroup";
import { SUPPORT_OPTIONS } from "../../lib/formSchema";

export default function SupportRequiredSection({
  data,
  onChange,
  onToggleOption,
}) {
  return (
    <SectionCard
      sectionLabel="Section G"
      title="Support Required from Pre-Incubation Centre"
    >
      <div className="space-y-7">
        {/* Section Introduction */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-institute-red text-sm font-bold text-white">
              G
            </div>

            <div>
              <h3 className="text-sm font-semibold text-institute-text">
                Pre-Incubation Support Requirements
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Select the areas where you would require support, mentoring,
                infrastructure, or guidance from the Pre-Incubation Centre to
                develop your idea.
              </p>
            </div>
          </div>
        </div>

        {/* Support Areas */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              1. Areas of Support Required
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Select all the areas in which you would like assistance.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <CheckboxGroup
              label="Support required"
              options={SUPPORT_OPTIONS}
              selected={data.options}
              onToggle={onToggleOption}
              columns={3}
            />
          </div>
        </div>

        {/* Other Support */}
        {data.options.includes("Other") && (
          <div>
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-institute-text">
                2. Other Support Requirement
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                If the required support is not listed above, please specify it
                below.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <FormField
                label="Other — Please Specify"
                name="otherSupport"
                value={data.otherSupport}
                onChange={onChange}
                className="sm:max-w-lg"
                placeholder="Specify the additional support you require"
              />
            </div>
          </div>
        )}

        {/* Support Description */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              {data.options.includes("Other") ? "3" : "2"}. Support Details
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Briefly explain what kind of assistance you expect from the
              Pre-Incubation Centre and how it would help you progress your
              idea.
            </p>
          </div>

          <TextAreaField
            label="Briefly describe the support required"
            name="description"
            value={data.description}
            onChange={onChange}
            rows={5}
            placeholder="Describe the specific guidance, resources, mentoring, facilities, or other support you require..."
          />
        </div>

        {/* Guidance Note */}
        <div className="flex items-start gap-3 rounded-md border-l-4 border-institute-red bg-red-50/50 px-4 py-3">
          <div className="mt-0.5 shrink-0 text-sm text-institute-red">ⓘ</div>

          <div>
            <p className="text-xs font-semibold text-institute-text">
              Guidance for Students
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              You may request support related to technical development,
              mentoring, business planning, intellectual property, market
              validation, funding guidance, infrastructure, networking, or other
              areas relevant to your idea.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
