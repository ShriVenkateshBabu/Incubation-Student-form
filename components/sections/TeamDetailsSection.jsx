// components/sections/TeamDetailsSection.jsx

import SectionCard from "../ui/SectionCard";
import RadioGroup from "../ui/RadioGroup";
import FormField from "../ui/FormField";

const MEMBER_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "registerNumber", label: "Register No." },
  { key: "department", label: "Department" },
  { key: "role", label: "Role" },
];

export default function TeamDetailsSection({
  data,
  onChangeSubmissionType,
  onChangeTeamLeader,
  onChangeMember,
}) {
  const isTeam = data.submissionType === "Team";

  return (
    <SectionCard sectionLabel="Section B" title="Team Details">
      <div className="space-y-7">
        {/* Section Introduction */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-institute-red text-sm font-bold text-white">
              B
            </div>

            <div>
              <h3 className="text-sm font-semibold text-institute-text">
                Submission & Team Information
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Indicate whether the idea is being submitted individually or by
                a team. If submitted as a team, provide the details of all
                participating members.
              </p>
            </div>
          </div>
        </div>

        {/* Submission Type */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-institute-text">
              1. Submission Type
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Select how this idea is being submitted.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <RadioGroup
              label="Are you submitting this idea as"
              name="submissionType"
              options={["Individual", "Team"]}
              value={data.submissionType}
              onChange={(_, value) => onChangeSubmissionType(value)}
            />
          </div>
        </div>

        {/* Team Information */}
        {isTeam && (
          <>
            {/* Team Members */}
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-institute-text">
                  2. Team Members
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Enter the details of each student participating in the
                  proposed idea. Please use the official register number and
                  department information.
                </p>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="w-14 border-b border-gray-200 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-600">
                          S.No.
                        </th>

                        {MEMBER_COLUMNS.map((col) => (
                          <th
                            key={col.key}
                            className="border-b border-gray-200 px-3 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600"
                          >
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {data.members.map((member, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="transition-colors hover:bg-gray-50"
                        >
                          <td className="border-b border-gray-100 px-3 py-2.5 text-center text-xs font-medium text-gray-500">
                            {rowIndex + 1}
                          </td>

                          {MEMBER_COLUMNS.map((col) => (
                            <td
                              key={col.key}
                              className="border-b border-gray-100 p-2"
                            >
                              <input
                                type="text"
                                value={member[col.key]}
                                onChange={(e) =>
                                  onChangeMember(
                                    rowIndex,
                                    col.key,
                                    e.target.value,
                                  )
                                }
                                placeholder={col.label}
                                className="w-full rounded-md border border-transparent bg-transparent px-2.5 py-2 text-sm text-institute-text outline-none transition placeholder:text-gray-400 focus:border-institute-red/30 focus:bg-white focus:ring-2 focus:ring-institute-red/10"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-institute-text">
                      Note:
                    </span>{" "}
                    Ensure that the information provided for each team member
                    matches the institution's student records.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Leader */}
            <div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-institute-text">
                  3. Team Leader
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Identify the student who will serve as the primary point of
                  contact for this application.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <FormField
                  label="Team Leader Name"
                  name="teamLeaderName"
                  value={data.teamLeaderName}
                  onChange={(_, value) => onChangeTeamLeader(value)}
                  className="sm:max-w-md"
                  placeholder="Enter team leader's full name"
                />
              </div>
            </div>

            {/* Team Guidance */}
            <div className="flex items-start gap-3 rounded-md border-l-4 border-institute-red bg-red-50/50 px-4 py-3">
              <div className="mt-0.5 shrink-0 text-sm text-institute-red">
                ⓘ
              </div>

              <div>
                <p className="text-xs font-semibold text-institute-text">
                  Team Submission Guidance
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  The team leader will be the primary contact for
                  application-related communication. All team members are
                  expected to participate in the development and evaluation
                  process as required.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Individual Submission Notice */}
        {!isTeam && (
          <div className="flex items-start gap-3 rounded-md border-l-4 border-institute-red bg-red-50/50 px-4 py-3">
            <div className="mt-0.5 shrink-0 text-sm text-institute-red">ⓘ</div>

            <div>
              <p className="text-xs font-semibold text-institute-text">
                Individual Submission
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                You are submitting this idea as an individual applicant. Team
                member information is not required.
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
