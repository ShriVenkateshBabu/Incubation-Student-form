"use client";

function Row({ label, value }) {
  const displayValue =
    value !== undefined && value !== null && String(value).trim() !== ""
      ? String(value)
      : "—";

  return (
    <div className="grid grid-cols-1 gap-2 border-b border-gray-100/80 py-4 last:border-b-0 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
      <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500">
        {label}
      </dt>

      <dd
        className={`text-[13px] leading-6 ${
          displayValue === "—" ? "italic text-gray-400" : "text-gray-800"
        }`}
      >
        {displayValue}
      </dd>
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="relative mb-6 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_8px_30px_-18px_rgba(0,0,0,0.28)] transition-shadow duration-200 hover:shadow-[0_12px_34px_-18px_rgba(0,0,0,0.32)]">
      <div className="border-b border-gray-200/80 bg-gradient-to-r from-gray-50 to-white px-5 py-4.5 sm:px-6">
        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-institute-red">
          {title}
        </h3>

        {description && (
          <p className="mt-1.5 text-xs leading-5 text-gray-500">
            {description}
          </p>
        )}
      </div>

      <dl className="divide-y-0 px-5 sm:px-6">{children}</dl>
    </section>
  );
}

function ValueList({ values }) {
  if (!Array.isArray(values) || values.length === 0) {
    return <span className="italic text-gray-400">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {values.filter(Boolean).map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-semibold text-gray-700 shadow-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function PreviewModal({ formData, onClose }) {
  const {
    documentInfo = {},
    studentDetails = {},
    teamDetails = {},
    ideaDetails = {},
    innovationTechnology = {},
    marketPotential = {},
    intellectualProperty = {},
    supportRequired = {},
    projectStatus = {},
    declaration = {},
  } = formData || {};

  const categories = Array.isArray(ideaDetails.categories)
    ? ideaDetails.categories
    : [];

  const impactAreas = Array.isArray(marketPotential.impactAreas)
    ? marketPotential.impactAreas
    : [];

  const ipStatus = Array.isArray(intellectualProperty.ipStatus)
    ? intellectualProperty.ipStatus
    : [];

  const supportOptions = Array.isArray(supportRequired.options)
    ? supportRequired.options
    : [];

  const nextActivities = Array.isArray(projectStatus.nextActivities)
    ? projectStatus.nextActivities.filter(Boolean)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-2.5 backdrop-blur-md sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-preview-title"
    >
      <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.25rem] border border-white/20 bg-white shadow-[0_28px_80px_-24px_rgba(0,0,0,0.55)]">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-gray-200/80 bg-white px-5 py-4.5 sm:px-8">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-institute-red">
              Pre-Incubation Application
            </p>

            <h2
              id="application-preview-title"
              className="mt-1 text-xl font-extrabold tracking-tight text-gray-950 sm:text-2xl"
            >
              Application Preview
            </h2>

            <p className="mt-1.5 text-xs text-gray-500">
              Review the information before submitting the application.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close application preview"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl leading-none text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-institute-red/10"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        {/* Content */}
        <main className="overflow-y-auto bg-[#f7f8fa] px-3 py-5 sm:px-7 sm:py-7">
          {/* Application Summary */}
          <div className="relative mb-6 overflow-hidden rounded-2xl border border-institute-red/10 bg-white p-5 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.3)] sm:p-6">
            <div className="absolute inset-y-0 left-0 w-1 bg-institute-red" />
            <div className="flex flex-col gap-5 pl-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500">
                  Application ID
                </p>

                <p className="mt-1 text-lg font-extrabold tracking-tight text-gray-950">
                  {documentInfo.applicationId || "Not Generated"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3.5 sm:min-w-[150px]">
                <p className="text-xs font-medium text-gray-500">
                  Submission Status
                </p>

                <p className="mt-1 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                  Preview
                </p>
              </div>
            </div>
          </div>

          {/* Document Information */}
          <Section
            title="Document Information"
            description="Basic information associated with this application."
          >
            <Row label="Application ID" value={documentInfo.applicationId} />
            <Row
              label="Date of Submission"
              value={documentInfo.submissionDate}
            />
            <Row label="Academic Year" value={documentInfo.academicYear} />
            <Row label="Department" value={documentInfo.department} />
          </Section>

          {/* Section A */}
          <Section
            title="Section A — Student Details"
            description="Personal and academic information of the applicant."
          >
            <Row label="Student Name" value={studentDetails.studentName} />
            <Row
              label="Register Number"
              value={studentDetails.registerNumber}
            />
            <Row label="Department" value={studentDetails.department} />
            <Row label="Programme" value={studentDetails.programme} />
            <Row label="Year / Semester" value={studentDetails.yearSemester} />
            <Row label="Email" value={studentDetails.email} />
            <Row label="Mobile Number" value={studentDetails.mobileNumber} />
          </Section>

          {/* Section B */}
          <Section
            title="Section B — Team Details"
            description="Information about the project team and submission type."
          >
            <Row label="Submission Type" value={teamDetails.submissionType} />
            <Row label="Team Leader" value={teamDetails.teamLeaderName} />
          </Section>

          {/* Section C */}
          <Section
            title="Section C — Idea Details"
            description="Overview of the proposed innovation or startup idea."
          >
            <Row label="Idea Title" value={ideaDetails.title} />

            <div className="grid grid-cols-1 gap-2 border-b border-gray-100/80 py-4 last:border-b-0 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
              <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500">
                Categories
              </dt>

              <dd>
                <ValueList values={categories} />
              </dd>
            </div>

            <Row
              label="Brief Description"
              value={ideaDetails.briefDescription}
            />
            <Row
              label="Problem Addressed"
              value={ideaDetails.problemAddressed}
            />
            <Row label="Intended Users" value={ideaDetails.intendedUsers} />
            <Row
              label="Proposed Solution"
              value={ideaDetails.proposedSolution}
            />
          </Section>

          {/* Section D */}
          <Section
            title="Section D — Innovation & Technology"
            description="Technology, innovation, resources and development stage."
          >
            <Row label="Uniqueness" value={innovationTechnology.uniqueness} />
            <Row
              label="Differentiation"
              value={innovationTechnology.differentiation}
            />
            <Row
              label="Resources Required"
              value={innovationTechnology.resourcesRequired}
            />
            <Row
              label="Current Stage"
              value={innovationTechnology.currentStage}
            />
          </Section>

          {/* Section E */}
          <Section
            title="Section E — Market & Business Potential"
            description="Market opportunity, customers, competition and business impact."
          >
            <Row
              label="Potential Customers"
              value={marketPotential.potentialCustomers}
            />
            <Row label="Revenue Model" value={marketPotential.revenueModel} />
            <Row
              label="Has Competitors"
              value={marketPotential.hasCompetitors}
            />
            <Row
              label="Competitor Details"
              value={marketPotential.competitorDetails}
            />

            <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
              <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500">
                Impact Areas
              </dt>

              <dd>
                <ValueList values={impactAreas} />
              </dd>
            </div>
          </Section>

          {/* Section F */}
          <Section
            title="Section F — Intellectual Property"
            description="Information related to intellectual property protection."
          >
            <Row
              label="Protectable IP"
              value={intellectualProperty.hasProtectableIp}
            />

            <div className="grid grid-cols-1 gap-2 border-b border-gray-100/80 py-4 last:border-b-0 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
              <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500">
                IP Status
              </dt>

              <dd>
                <ValueList values={ipStatus} />
              </dd>
            </div>

            <Row label="IP Details" value={intellectualProperty.ipDetails} />
          </Section>

          {/* Section G */}
          <Section
            title="Section G — Support Required"
            description="Support, facilities or mentoring required from the R&I D."
          >
            <div className="grid grid-cols-1 gap-2 border-b border-gray-100/80 py-4 last:border-b-0 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
              <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500">
                Support Options
              </dt>

              <dd>
                <ValueList values={supportOptions} />
              </dd>
            </div>

            <Row label="Description" value={supportRequired.description} />
          </Section>

          {/* Section H */}
          <Section
            title="Section H — Project Status"
            description="Current project status, next activities and startup intention."
          >
            <div className="grid grid-cols-1 gap-2 border-b border-gray-100/80 py-4 last:border-b-0 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
              <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500">
                Next Activities
              </dt>

              <dd>
                {nextActivities.length > 0 ? (
                  <ul className="space-y-1.5">
                    {nextActivities.map((activity, index) => (
                      <li
                        key={`${activity}-${index}`}
                        className="relative pl-4 text-sm leading-6 text-gray-800"
                      >
                        <span
                          className="absolute left-0 top-3 h-1.5 w-1.5 rounded-full bg-institute-red"
                          aria-hidden="true"
                        />
                        {activity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="italic text-gray-400">—</span>
                )}
              </dd>
            </div>

            <Row label="Timeline" value={projectStatus.timeline} />

            <Row
              label="Intends to Start Up"
              value={projectStatus.intendsToStartup}
            />
          </Section>

          {/* Section I */}
          <Section
            title="Section I — Declaration"
            description="Applicant declaration and confirmation."
          >
            <Row
              label="Declaration Accepted"
              value={declaration.agreed ? "Yes" : "No"}
            />

            <Row label="Student Name" value={declaration.studentName} />

            <Row label="Date" value={declaration.date} />
          </Section>

          {/* Final Notice */}
          <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-white p-5 shadow-sm">
            <p className="text-sm font-bold text-amber-900">
              Please review all information carefully.
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700">
              Make sure the details provided are accurate before proceeding with
              the final submission of the pre-incubation application.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-gray-200/80 bg-white px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-institute-red px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_-10px_rgba(0,0,0,0.55)] transition-all hover:-translate-y-0.5 hover:bg-institute-redDark hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-institute-red/15"
          >
            Continue
          </button>
        </footer>
      </div>
    </div>
  );
}
