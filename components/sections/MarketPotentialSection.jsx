// components/sections/MarketPotentialSection.jsx

import SectionCard from "../ui/SectionCard";
import TextAreaField from "../ui/TextAreaField";
import RadioGroup from "../ui/RadioGroup";
import CheckboxGroup from "../ui/CheckboxGroup";
import { IMPACT_AREAS } from "../../lib/formSchema";

export default function MarketPotentialSection({
  data,
  onChange,
  onChangeHasCompetitors,
  onToggleImpactArea,
}) {
  return (
    <SectionCard sectionLabel="Section E" title="Market & Business Potential">
      <div className="space-y-7">
        {/* Section Introduction */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-institute-red text-sm font-bold text-white">
              E
            </div>

            <div>
              <h3 className="text-sm font-semibold text-institute-text">
                Market & Business Potential
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Describe the people or organisations that may use your solution,
                how the idea could be sustained financially, and whether similar
                solutions or competitors already exist.
              </p>
            </div>
          </div>
        </div>

        {/* Potential Customers */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              1. Target Market & Customers
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Identify the primary users, customers, beneficiaries, or
              organisations that may need your product or service.
            </p>
          </div>

          <TextAreaField
            label="Who are the potential customers / users?"
            name="potentialCustomers"
            value={data.potentialCustomers}
            onChange={onChange}
            rows={4}
            placeholder="Describe your potential customers, users, beneficiaries, or target market..."
          />
        </div>

        {/* Revenue Model */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              2. Revenue & Sustainability
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Explain how the idea could generate revenue or remain financially
              sustainable. An early estimate or possible approach is sufficient
              at this stage.
            </p>
          </div>

          <TextAreaField
            label="How could the idea generate revenue or sustain itself?"
            name="revenueModel"
            value={data.revenueModel}
            onChange={onChange}
            rows={4}
            placeholder="For example: product sales, subscriptions, licensing, service fees, institutional partnerships, or other models..."
          />
        </div>

        {/* Competition */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              3. Existing Solutions & Competition
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Indicate whether you are aware of products, services, startups, or
              organisations addressing a similar problem.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <RadioGroup
              label="Have you identified similar existing products or competitors?"
              name="hasCompetitors"
              options={["Yes", "No"]}
              value={data.hasCompetitors}
              onChange={(_, value) => onChangeHasCompetitors(value)}
            />
          </div>

          {/* Competitor Details */}
          {data.hasCompetitors === "Yes" && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <TextAreaField
                label="Competitor / Existing Solution Details"
                name="competitorDetails"
                value={data.competitorDetails}
                onChange={onChange}
                rows={4}
                placeholder="Mention known competitors or existing solutions and briefly explain how your idea differs..."
              />
            </div>
          )}
        </div>

        {/* Potential Impact */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              4. Potential Impact
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Select the areas where your idea could potentially create
              meaningful social, economic, environmental, or technological
              impact.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <CheckboxGroup
              label="Potential impact area(s)"
              options={IMPACT_AREAS}
              selected={data.impactAreas}
              onToggle={onToggleImpactArea}
              columns={3}
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
              You are not expected to have a complete business model or detailed
              market research at the application stage. Provide your current
              understanding of the potential market, customers, competitors, and
              impact of your idea.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
