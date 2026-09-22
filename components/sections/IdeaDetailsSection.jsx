// components/sections/IdeaDetailsSection.jsx

import SectionCard from "../ui/SectionCard";
import FormField from "../ui/FormField";
import TextAreaField from "../ui/TextAreaField";
import CheckboxGroup from "../ui/CheckboxGroup";
import { IDEA_CATEGORIES } from "../../lib/formSchema";

export default function IdeaDetailsSection({
  data,
  errors,
  onChange,
  onToggleCategory,
}) {
  return (
    <SectionCard sectionLabel="Section C" title="Idea Details">
      <div className="space-y-7">
        {/* Section Introduction */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-institute-red text-sm font-bold text-white">
              C
            </div>

            <div>
              <h3 className="text-sm font-semibold text-institute-text">
                Your Startup Idea
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Describe your idea clearly and explain the problem it aims to
                solve. The information provided here will help the
                Pre-Incubation Centre understand and evaluate your idea.
              </p>
            </div>
          </div>
        </div>

        {/* Idea Identity */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              1. Idea Identification
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Provide a clear and concise name for your idea or proposed
              startup.
            </p>
          </div>

          <FormField
            label="Title of the Idea / Startup"
            name="title"
            value={data.title}
            onChange={onChange}
            required
            error={errors.title}
            placeholder="Enter the name of your idea or startup"
          />
        </div>

        {/* Idea Category */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              2. Category of Idea
            </h3>

            <p className="mb-4 mt-1 text-xs text-gray-500">
              Select one or more categories that best describe your idea.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <CheckboxGroup
              label="Select applicable category / categories"
              options={IDEA_CATEGORIES}
              selected={data.categories}
              onToggle={onToggleCategory}
              columns={3}
            />
          </div>

          {/* Other Category */}
          {data.categories.includes("Other") && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <FormField
                label="Other Category — Please Specify"
                name="otherCategory"
                value={data.otherCategory}
                onChange={onChange}
                className="sm:max-w-md"
                placeholder="Specify the category"
              />
            </div>
          )}
        </div>

        {/* Idea Description */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              3. Idea Overview
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Give a simple overview of what your idea is and how it works.
            </p>
          </div>

          <TextAreaField
            label="Brief Description of the Idea"
            name="briefDescription"
            value={data.briefDescription}
            onChange={onChange}
            rows={5}
            placeholder="Describe your idea in simple and clear terms..."
          />
        </div>

        {/* Problem Statement */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              4. Problem Statement
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Clearly explain the real-world problem, need, or gap that your
              idea intends to address.
            </p>
          </div>

          <TextAreaField
            label="What problem does your idea address?"
            name="problemAddressed"
            value={data.problemAddressed}
            onChange={onChange}
            required
            error={errors.problemAddressed}
            rows={5}
            placeholder="Describe the problem, need, or gap your idea addresses..."
          />
        </div>

        {/* Target Users */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              5. Target Users / Beneficiaries
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Identify the people, organizations, or communities who may use or
              benefit from your solution.
            </p>
          </div>

          <TextAreaField
            label="Who are the intended users / beneficiaries / customers?"
            name="intendedUsers"
            value={data.intendedUsers}
            onChange={onChange}
            rows={4}
            placeholder="For example: students, farmers, hospitals, small businesses, rural communities..."
          />
        </div>

        {/* Proposed Solution */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              6. Proposed Solution
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Explain how your proposed product, service, or technology will
              address the identified problem.
            </p>
          </div>

          <TextAreaField
            label="What is your proposed solution?"
            name="proposedSolution"
            value={data.proposedSolution}
            onChange={onChange}
            required
            error={errors.proposedSolution}
            rows={5}
            placeholder="Explain your proposed solution and how it addresses the identified problem..."
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
              You do not need to have a fully developed business or prototype at
              this stage. Clearly explain the problem you have identified, your
              proposed approach, and the people who may benefit from your idea.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
