// components/sections/ProjectStatusSection.jsx

import SectionCard from "../ui/SectionCard";
import RadioGroup from "../ui/RadioGroup";

export default function ProjectStatusSection({
  data,
  onChangeNextActivity,
  onChangeTimeline,
  onChangeIntendsToStartup,
}) {
  return (
    <SectionCard sectionLabel="Section H" title="Project Status & Future Plan">
      <div className="space-y-7">
        {/* Section Introduction */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-institute-red text-sm font-bold text-white">
              H
            </div>

            <div>
              <h3 className="text-sm font-semibold text-institute-text">
                Project Status & Future Plan
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Outline the immediate steps you plan to take, your expected
                development timeline, and your intention to pursue the idea as a
                startup.
              </p>
            </div>
          </div>
        </div>

        {/* Next Activities */}
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-institute-text">
              1. Next Three Major Activities
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              List the three most important activities you plan to complete next
              to develop or validate your idea.
            </p>
          </div>

          <div className="space-y-3">
            {data.nextActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition focus-within:border-institute-red/50 focus-within:ring-2 focus-within:ring-institute-red/10"
              >
                {/* Activity Number */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-institute-text">
                  {index + 1}
                </div>

                {/* Activity Input */}
                <input
                  type="text"
                  value={activity}
                  placeholder={`Major activity ${index + 1}`}
                  onChange={(e) => onChangeNextActivity(index, e.target.value)}
                  className="w-full border-0 bg-transparent px-1 py-2 text-sm text-institute-text outline-none placeholder:text-gray-400 focus:ring-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Development Timeline */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              2. Expected Development Timeline
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Select the approximate time required to reach your next major
              development milestone.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <RadioGroup
              label="Expected development timeline"
              name="timeline"
              options={[
                "Less than 1 month",
                "1–3 months",
                "3–6 months",
                "6–12 months",
                "More than 12 months",
              ]}
              value={data.timeline}
              onChange={(_, value) => onChangeTimeline(value)}
            />
          </div>
        </div>

        {/* Startup Intent */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              3. Startup Intent
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Indicate whether you currently intend to develop this idea into a
              startup or would like guidance before making that decision.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <RadioGroup
              label="Do you intend to develop this idea into a startup?"
              name="intendsToStartup"
              options={["Yes", "No", "Maybe / Need Guidance"]}
              value={data.intendsToStartup}
              onChange={(_, value) => onChangeIntendsToStartup(value)}
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
              Your proposed activities and timeline may be adjusted during the
              R&I D Programme based on technical validation, mentor feedback,
              available resources, and project progress.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
