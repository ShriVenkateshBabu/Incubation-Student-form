// components/sections/InnovationSection.jsx

import SectionCard from "../ui/SectionCard";
import TextAreaField from "../ui/TextAreaField";
import RadioGroup from "../ui/RadioGroup";
import { IDEA_STAGES } from "../../lib/formSchema";

export default function InnovationSection({ data, onChange, onChangeStage }) {
  return (
    <SectionCard sectionLabel="Section D" title="Innovation & Technology">
      <div className="space-y-7">
        {/* Section Introduction */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-institute-red text-sm font-bold text-white">
              D
            </div>

            <div>
              <h3 className="text-sm font-semibold text-institute-text">
                Innovation & Technology Overview
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Explain what makes your idea innovative, how it differs from
                existing approaches, and what technology or resources may be
                required to develop it.
              </p>
            </div>
          </div>
        </div>

        {/* Innovation */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              1. Innovation & Uniqueness
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Describe the unique feature, approach, process, or technology that
              makes your idea innovative.
            </p>
          </div>

          <TextAreaField
            label="What is innovative or unique about your idea?"
            name="uniqueness"
            value={data.uniqueness}
            onChange={onChange}
            rows={5}
            placeholder="Explain what makes your idea new, innovative, or unique..."
          />
        </div>

        {/* Differentiation */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              2. Differentiation from Existing Solutions
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Explain how your idea differs from existing products, services,
              technologies, or approaches.
            </p>
          </div>

          <TextAreaField
            label="How is your idea different from existing solutions?"
            name="differentiation"
            value={data.differentiation}
            onChange={onChange}
            rows={5}
            placeholder="Describe the key differences, improvements, or advantages of your approach..."
          />
        </div>

        {/* Technology & Resources */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              3. Technology & Resource Requirements
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Mention the technologies, equipment, software, infrastructure,
              expertise, or other resources required to develop your idea.
            </p>
          </div>

          <TextAreaField
            label="What technology, tools, or resources are required?"
            name="resourcesRequired"
            value={data.resourcesRequired}
            onChange={onChange}
            rows={5}
            placeholder="For example: software, hardware, AI/ML, laboratory facilities, cloud services, technical expertise..."
          />
        </div>

        {/* Current Stage */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              4. Current Stage of the Idea
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Select the stage that best represents the current development
              status of your idea.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <RadioGroup
              label="Current stage of your idea"
              name="currentStage"
              options={IDEA_STAGES}
              value={data.currentStage}
              onChange={(_, value) => onChangeStage(value)}
            />
          </div>
        </div>

        {/* Guidance Note */}
        <div className="flex items-start gap-3 rounded-md border-l-4 border-institute-red bg-red-50/50 px-4 py-3">
          <div className="mt-0.5 shrink-0 text-sm text-institute-red">ⓘ</div>

          <div>
            <p className="text-xs font-semibold text-institute-text">
              Guidance for Students
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              Your idea does not need to be fully developed at the time of
              application. You may describe an early-stage concept, proposed
              prototype, existing prototype, or a solution that is already being
              tested.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
