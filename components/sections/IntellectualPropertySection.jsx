// components/sections/IntellectualPropertySection.jsx

import SectionCard from "../ui/SectionCard";
import TextAreaField from "../ui/TextAreaField";
import RadioGroup from "../ui/RadioGroup";
import CheckboxGroup from "../ui/CheckboxGroup";
import { IP_STATUS_OPTIONS } from "../../lib/formSchema";

export default function IntellectualPropertySection({
  data,
  onChange,
  onChangeHasProtectableIp,
  onToggleIpStatus,
}) {
  return (
    <SectionCard sectionLabel="Section F" title="Intellectual Property">
      <div className="space-y-7">
        {/* Section Introduction */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-institute-red text-sm font-bold text-white">
              F
            </div>

            <div>
              <h3 className="text-sm font-semibold text-institute-text">
                Intellectual Property Information
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Provide information about any potentially protectable
                intellectual property associated with your idea, including
                patents, copyrights, trademarks, designs, or other forms of
                intellectual property.
              </p>
            </div>
          </div>
        </div>

        {/* Protectable IP */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              1. Protectable Intellectual Property
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Indicate whether your idea may contain intellectual property that
              could potentially be protected.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <RadioGroup
              label="Does your idea contain potentially protectable intellectual property?"
              name="hasProtectableIp"
              options={["Yes", "No", "Not Sure"]}
              value={data.hasProtectableIp}
              onChange={(_, value) => onChangeHasProtectableIp(value)}
            />
          </div>
        </div>

        {/* IP Status */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              2. Current IP Status
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Select all options that describe the current intellectual property
              status of your idea.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <CheckboxGroup
              label="IP status"
              options={IP_STATUS_OPTIONS}
              selected={data.ipStatus}
              onToggle={onToggleIpStatus}
              columns={3}
            />
          </div>
        </div>

        {/* IP Details */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              3. Intellectual Property Details
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Provide a brief description of any existing or potential
              intellectual property. Avoid including confidential technical
              information.
            </p>
          </div>

          <TextAreaField
            label="IP Details"
            name="ipDetails"
            value={data.ipDetails}
            onChange={onChange}
            rows={5}
            placeholder="Briefly describe any patent, copyright, trademark, design, invention, software, process, or other IP associated with your idea..."
          />
        </div>

        {/* Confidentiality Notice */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0 text-amber-700">⚠</div>

            <div>
              <p className="text-xs font-semibold text-amber-900">
                Intellectual Property & Confidentiality Notice
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-800">
                Students are advised not to publicly disclose confidential
                technical details, unpublished inventions, source code,
                proprietary designs, or other sensitive information before
                obtaining appropriate intellectual property guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Centre Support Note */}
        <div className="flex items-start gap-3 rounded-md border-l-4 border-institute-red bg-red-50/50 px-4 py-3">
          <div className="mt-0.5 shrink-0 text-sm text-institute-red">ⓘ</div>

          <div>
            <p className="text-xs font-semibold text-institute-text">
              Pre-Incubation Centre Support
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              If you are unsure whether your idea contains protectable
              intellectual property, select{" "}
              <span className="font-medium">"Not Sure"</span>. The Centre may
              guide you on the appropriate next steps.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
