// components/pdf/SubmissionPdfDocument.jsx
//
// Renders the filled-in submission as a genuine, selectable, A4
// text-based PDF (not a screenshot) using @react-pdf/renderer.
// The header and footer are marked `fixed` so they repeat on every
// page automatically, including the page-number counter.

import { Document, Page, View, Text, Image, StyleSheet, Font } from "@react-pdf/renderer";

// Disable automatic word hyphenation (e.g. "venky@exam-\nple.com") so long
// tokens like emails wrap cleanly at the next space instead of mid-word.
Font.registerHyphenationCallback((word) => [word]);
import {
  COLLEGE_NAME,
  CENTRE_NAME,
  DOCUMENT_TITLE,
  COLLEGE_ADDRESS_PLACEHOLDER,
  IDEA_CATEGORIES,
  IDEA_STAGES,
  IMPACT_AREAS,
  IP_STATUS_OPTIONS,
  SUPPORT_OPTIONS,
  TIMELINE_OPTIONS,
  EVALUATION_PARAMETERS,
} from "../../lib/formSchema";

const RED = "#8B1D1D";
const TEXT = "#1A1A1A";
const BORDER = "#C9C9C9";

const styles = StyleSheet.create({
  page: {
    paddingTop: 118,
    paddingBottom: 46,
    paddingHorizontal: 34,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: TEXT,
  },

  // ---------- Header / Footer (fixed) ----------
  headerFixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 34,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { width: 46, height: 46, objectFit: "contain" },
  headerCenter: { flex: 1, textAlign: "center", paddingHorizontal: 8 },
  collegeName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: RED,
    letterSpacing: 0.3,
  },
  centreName: { fontSize: 10, fontFamily: "Helvetica-Bold", marginTop: 2 },
  docTitleSmall: {
    fontSize: 8.5,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.2,
    color: "#444",
  },
  headerRule: { height: 2, backgroundColor: RED, marginTop: 8 },
  headerAddress: {
    fontSize: 7.5,
    color: "#555",
    textAlign: "center",
    marginTop: 4,
  },

  footerFixed: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 34,
    paddingBottom: 16,
  },
  footerRule: { height: 1, backgroundColor: RED, marginBottom: 4 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: "#555",
  },

  // ---------- Generic building blocks ----------
  infoBox: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 2,
    padding: 8,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 6,
  },
  infoGrid: { flexDirection: "row", flexWrap: "wrap" },
  infoCell: { width: "50%", marginBottom: 3, flexDirection: "row" },
  infoLabel: { fontFamily: "Helvetica-Bold", marginRight: 4 },

  purpose: {
    fontSize: 8.8,
    lineHeight: 1.4,
    marginBottom: 10,
    color: "#333",
    textAlign: "justify",
  },

  section: {
    marginBottom: 12,
  },
  sectionHeaderBar: {
    backgroundColor: RED,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  sectionHeaderText: {
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },
  sectionBody: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },

  fieldRow: { flexDirection: "row", marginBottom: 5, flexWrap: "wrap" },
  fieldLabel: { fontFamily: "Helvetica-Bold", width: 170 },
  fieldValue: { flex: 1, borderBottomWidth: 0.7, borderColor: "#999" },

  blockLabel: { fontFamily: "Helvetica-Bold", marginBottom: 2 },
  blockValue: {
    lineHeight: 1.4,
    minHeight: 28,
    borderWidth: 0.7,
    borderColor: "#D8D8D8",
    padding: 4,
    marginBottom: 6,
  },

  checkRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 4 },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "33%",
    marginBottom: 3,
    paddingRight: 4,
  },
  checkBoxMark: {
    width: 20,
    fontFamily: "Helvetica-Bold",
    flexShrink: 0,
  },
  checkLabel: { flex: 1 },

  table: { borderWidth: 0.7, borderColor: "#999", marginTop: 2, marginBottom: 4 },
  tr: { flexDirection: "row" },
  th: {
    backgroundColor: "#F1E4E4",
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    padding: 3,
    borderRightWidth: 0.7,
    borderColor: "#999",
    borderBottomWidth: 0.7,
  },
  td: {
    fontSize: 8.5,
    padding: 3,
    borderRightWidth: 0.7,
    borderColor: "#999",
    borderBottomWidth: 0.7,
    minHeight: 16,
  },

  note: {
    fontSize: 8,
    fontStyle: "italic",
    color: "#555",
    backgroundColor: "#F7F7F7",
    padding: 5,
    marginTop: 2,
  },

  adminHeader: {
    marginTop: 4,
    marginBottom: 10,
    borderWidth: 1.2,
    borderColor: RED,
    borderRadius: 2,
    padding: 6,
  },
  adminHeaderText: {
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: RED,
  },

  signatureRow: { flexDirection: "row", marginTop: 14, flexWrap: "wrap" },
  signatureBlock: { width: "33%", marginBottom: 10 },
  signatureLine: {
    borderBottomWidth: 0.7,
    borderColor: "#666",
    marginTop: 16,
    marginBottom: 2,
    width: "90%",
  },
  signatureCaption: { fontSize: 8 },
});

// ---------- Small reusable pieces ----------

function Field({ label, value, width }) {
  return (
    <View style={[styles.fieldRow, width ? { width } : { width: "50%" }]}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      <Text style={styles.fieldValue}>{value ? value : " "}</Text>
    </View>
  );
}

function TextBlock({ label, value }) {
  return (
    <View wrap={false}>
      <Text style={styles.blockLabel}>{label}</Text>
      <Text style={styles.blockValue}>
        {value && value.trim() ? value : "—"}
      </Text>
    </View>
  );
}

function CheckOptions({ options, selected = [] }) {
  return (
    <View style={styles.checkRow} wrap={false}>
      {options.map((option) => (
        <View style={styles.checkItem} key={option}>
          <Text style={styles.checkBoxMark}>
            {selected.includes(option) ? "[X]" : "[ ]"}
          </Text>
          <Text style={styles.checkLabel}>{option}</Text>
        </View>
      ))}
    </View>
  );
}

function SingleChoice({ options, value }) {
  return (
    <View style={styles.checkRow} wrap={false}>
      {options.map((option) => (
        <View style={styles.checkItem} key={option}>
          <Text style={styles.checkBoxMark}>
            {value === option ? "[X]" : "[ ]"}
          </Text>
          <Text style={styles.checkLabel}>{option}</Text>
        </View>
      ))}
    </View>
  );
}

function SectionBox({ label, title, children }) {
  return (
    <View style={styles.section} minPresenceAhead={60}>
      <View style={styles.sectionHeaderBar}>
        <Text style={styles.sectionHeaderText}>
          {label} — {title}
        </Text>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function HeaderFixed() {
  return (
    <View style={styles.headerFixed} fixed>
      <View style={styles.headerRow}>
        <Image style={styles.logo} src="/aaa-college-logo.png" />
        <View style={styles.headerCenter}>
          <Text style={styles.collegeName}>{COLLEGE_NAME}</Text>
          <Text style={styles.centreName}>{CENTRE_NAME}</Text>
          <Text style={styles.docTitleSmall}>{DOCUMENT_TITLE}</Text>
        </View>
        <Image style={styles.logo} src="/anna-university-logo.png" />
      </View>
      <View style={styles.headerRule} />
      <Text style={styles.headerAddress}>
        {COLLEGE_ADDRESS_PLACEHOLDER} · Website: _______________ · Email:
        _______________ · Phone: _______________
      </Text>
    </View>
  );
}

function FooterFixed() {
  return (
    <View style={styles.footerFixed} fixed>
      <View style={styles.footerRule} />
      <View style={styles.footerRow}>
        <Text>
          {COLLEGE_NAME}{"\n"}
          {CENTRE_NAME}
        </Text>
        <Text>Student Startup / Innovation Idea Submission Form</Text>
        <Text
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </View>
    </View>
  );
}

export default function SubmissionPdfDocument({ formData }) {
  const {
    documentInfo,
    studentDetails,
    teamDetails,
    ideaDetails,
    innovationTechnology,
    marketPotential,
    intellectualProperty,
    supportRequired,
    projectStatus,
    declaration,
  } = formData;

  const filledMembers = teamDetails.members.filter((m) =>
    Object.values(m).some((v) => v && v.trim())
  );
  const membersToShow =
    filledMembers.length > 0 ? filledMembers : teamDetails.members;

  return (
    <Document
      title={DOCUMENT_TITLE}
      author={COLLEGE_NAME}
      subject="Pre-Incubation Student Startup / Innovation Idea Submission"
    >
      {/* ---------------- PAGE(S) 1..N — STUDENT SUBMISSION ---------------- */}
      <Page size="A4" style={styles.page} wrap>
        <HeaderFixed />
        <FooterFixed />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>{DOCUMENT_TITLE}</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Application ID:</Text>
              <Text>{documentInfo.applicationId || "—"}</Text>
            </View>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Date of Submission:</Text>
              <Text>{documentInfo.submissionDate || "—"}</Text>
            </View>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Academic Year:</Text>
              <Text>{documentInfo.academicYear || "—"}</Text>
            </View>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Department:</Text>
              <Text>{documentInfo.department || "—"}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.purpose}>
          This form is intended for students of {COLLEGE_NAME} who wish to
          submit an innovative idea, startup concept, product, service,
          technology solution, prototype, or social innovation idea for
          evaluation and potential admission into the Pre-Incubation
          Programme of the College.
        </Text>

        {/* Section A */}
        <SectionBox label="Section A" title="Student Details">
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Field label="Student Name" value={studentDetails.studentName} />
            <Field
              label="Register No. / ID"
              value={studentDetails.registerNumber}
            />
            <Field label="Department" value={studentDetails.department} />
            <Field label="Programme / Course" value={studentDetails.programme} />
            <Field label="Year / Semester" value={studentDetails.yearSemester} />
            <Field label="Email ID" value={studentDetails.email} />
            <Field label="Mobile Number" value={studentDetails.mobileNumber} />
          </View>
        </SectionBox>

        {/* Section B */}
        <SectionBox label="Section B" title="Team Details">
          <SingleChoice
            options={["Individual", "Team"]}
            value={teamDetails.submissionType}
          />
          <View style={styles.table}>
            <View style={styles.tr}>
              <Text style={[styles.th, { width: "8%" }]}>S.No.</Text>
              <Text style={[styles.th, { width: "28%" }]}>Name</Text>
              <Text style={[styles.th, { width: "22%" }]}>Register No.</Text>
              <Text style={[styles.th, { width: "22%" }]}>Department</Text>
              <Text style={[styles.th, { width: "20%", borderRightWidth: 0 }]}>
                Role
              </Text>
            </View>
            {membersToShow.map((member, idx) => (
              <View style={styles.tr} key={idx} wrap={false}>
                <Text style={[styles.td, { width: "8%" }]}>{idx + 1}</Text>
                <Text style={[styles.td, { width: "28%" }]}>
                  {member.name || "—"}
                </Text>
                <Text style={[styles.td, { width: "22%" }]}>
                  {member.registerNumber || "—"}
                </Text>
                <Text style={[styles.td, { width: "22%" }]}>
                  {member.department || "—"}
                </Text>
                <Text style={[styles.td, { width: "20%", borderRightWidth: 0 }]}>
                  {member.role || "—"}
                </Text>
              </View>
            ))}
          </View>
          <Field label="Team Leader Name" value={teamDetails.teamLeaderName} />
        </SectionBox>

        {/* Section C */}
        <SectionBox label="Section C" title="Idea Details">
          <Field label="Title of the Idea / Startup" value={ideaDetails.title} width="100%" />
          <Text style={styles.blockLabel}>Category of Idea</Text>
          <CheckOptions options={IDEA_CATEGORIES} selected={ideaDetails.categories} />
          {ideaDetails.categories.includes("Other") && (
            <Field label="Other category" value={ideaDetails.otherCategory} width="100%" />
          )}
          <TextBlock label="Brief Description of the Idea" value={ideaDetails.briefDescription} />
          <TextBlock
            label="What problem does your idea address?"
            value={ideaDetails.problemAddressed}
          />
          <TextBlock
            label="Who are the intended users / beneficiaries / customers?"
            value={ideaDetails.intendedUsers}
          />
          <TextBlock label="Proposed Solution" value={ideaDetails.proposedSolution} />
        </SectionBox>

        {/* Section D */}
        <SectionBox label="Section D" title="Innovation & Technology">
          <TextBlock
            label="What is innovative or unique about your idea?"
            value={innovationTechnology.uniqueness}
          />
          <TextBlock
            label="How is your idea different from existing solutions?"
            value={innovationTechnology.differentiation}
          />
          <TextBlock
            label="What technology, tools, or resources are required?"
            value={innovationTechnology.resourcesRequired}
          />
          <Text style={styles.blockLabel}>Current Stage of the Idea</Text>
          <SingleChoice options={IDEA_STAGES} value={innovationTechnology.currentStage} />
        </SectionBox>

        {/* Section E */}
        <SectionBox label="Section E" title="Market & Business Potential">
          <TextBlock
            label="Who are the potential customers / users?"
            value={marketPotential.potentialCustomers}
          />
          <TextBlock
            label="How could the idea generate revenue or sustain itself?"
            value={marketPotential.revenueModel}
          />
          <Text style={styles.blockLabel}>
            Have you identified similar existing products or competitors?
          </Text>
          <SingleChoice options={["Yes", "No"]} value={marketPotential.hasCompetitors} />
          {marketPotential.hasCompetitors === "Yes" && (
            <TextBlock label="Details" value={marketPotential.competitorDetails} />
          )}
          <Text style={styles.blockLabel}>Potential Impact</Text>
          <CheckOptions options={IMPACT_AREAS} selected={marketPotential.impactAreas} />
        </SectionBox>

        {/* Section F */}
        <SectionBox label="Section F" title="Intellectual Property">
          <Text style={styles.blockLabel}>
            Does your idea contain potentially protectable intellectual property?
          </Text>
          <SingleChoice
            options={["Yes", "No", "Not Sure"]}
            value={intellectualProperty.hasProtectableIp}
          />
          <Text style={styles.blockLabel}>IP Status</Text>
          <CheckOptions
            options={IP_STATUS_OPTIONS}
            selected={intellectualProperty.ipStatus}
          />
          <TextBlock label="IP Details" value={intellectualProperty.ipDetails} />
          <Text style={styles.note}>
            Students are advised not to publicly disclose confidential
            technical details before obtaining appropriate intellectual
            property guidance.
          </Text>
        </SectionBox>

        {/* Section G */}
        <SectionBox label="Section G" title="Support Required from Pre-Incubation Centre">
          <CheckOptions options={SUPPORT_OPTIONS} selected={supportRequired.options} />
          {supportRequired.options.includes("Other") && (
            <Field label="Other support" value={supportRequired.otherSupport} width="100%" />
          )}
          <TextBlock
            label="Briefly describe the support required"
            value={supportRequired.description}
          />
        </SectionBox>

        {/* Section H */}
        <SectionBox label="Section H" title="Project Status & Future Plan">
          <Text style={styles.blockLabel}>Next three major activities</Text>
          {projectStatus.nextActivities.map((activity, idx) => (
            <Text key={idx} style={{ marginBottom: 3 }}>
              {idx + 1}. {activity && activity.trim() ? activity : "—"}
            </Text>
          ))}
          <Text style={[styles.blockLabel, { marginTop: 4 }]}>
            Expected Development Timeline
          </Text>
          <SingleChoice options={TIMELINE_OPTIONS} value={projectStatus.timeline} />
          <Text style={styles.blockLabel}>
            Do you intend to develop this idea into a startup?
          </Text>
          <SingleChoice
            options={["Yes", "No", "Maybe / Need Guidance"]}
            value={projectStatus.intendsToStartup}
          />
        </SectionBox>

        {/* Section I */}
        <SectionBox label="Section I" title="Student Declaration">
          <Text style={{ lineHeight: 1.4, marginBottom: 6, textAlign: "justify" }}>
            I hereby declare that the information provided in this form is
            true and accurate to the best of my knowledge. I understand that
            submission of this form does not automatically guarantee
            admission into the Pre-Incubation Programme. I agree to
            participate in the evaluation process and provide additional
            information or documentation if required by the Pre-Incubation
            Centre.
          </Text>
          <Text style={{ marginBottom: 4 }}>
            Declaration Accepted: {declaration.agreed ? "[X] Yes" : "[ ] No"}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Field label="Student Name" value={declaration.studentName} />
            <Field label="Date" value={declaration.date} />
          </View>
          <View style={styles.signatureRow} wrap={false}>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureCaption}>Signature of Student</Text>
            </View>
          </View>
        </SectionBox>
      </Page>

      {/* ---------------- PAGE — CENTRE USE ONLY ---------------- */}
      <Page size="A4" style={styles.page} wrap>
        <HeaderFixed />
        <FooterFixed />

        <View style={styles.adminHeader}>
          <Text style={styles.adminHeaderText}>
            FOR PRE-INCUBATION CENTRE USE ONLY
          </Text>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Field label="Application ID" value="" />
          <Field label="Date Received" value="" />
        </View>

        <Text style={styles.blockLabel}>Initial Screening</Text>
        <SingleChoice
          options={[
            "Accepted for Evaluation",
            "Additional Information Required",
            "Not Eligible",
            "Rejected",
          ]}
          value=""
        />

        <Text style={[styles.blockLabel, { marginTop: 8 }]}>Idea Evaluation</Text>
        <View style={styles.table}>
          <View style={styles.tr}>
            <Text style={[styles.th, { width: "65%" }]}>Parameter</Text>
            <Text style={[styles.th, { width: "35%", borderRightWidth: 0 }]}>
              Score / Remarks
            </Text>
          </View>
          {EVALUATION_PARAMETERS.map((param) => (
            <View style={styles.tr} key={param} wrap={false}>
              <Text style={[styles.td, { width: "65%" }]}>{param}</Text>
              <Text style={[styles.td, { width: "35%", borderRightWidth: 0 }]}> </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.blockLabel, { marginTop: 8 }]}>
          Committee Recommendation
        </Text>
        <SingleChoice
          options={[
            "Proceed to Pre-Incubation",
            "Revise and Resubmit",
            "Further Evaluation Required",
            "Not Selected",
          ]}
          value=""
        />

        <View style={styles.signatureRow} wrap={false}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureCaption}>Evaluator Name</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureCaption}>Designation</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureCaption}>Signature</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureCaption}>Date</Text>
          </View>
        </View>

        <View style={[styles.adminHeader, { marginTop: 16 }]} wrap={false}>
          <Text style={styles.adminHeaderText}>PRE-INCUBATION ADMISSION</Text>
        </View>
        <Text style={styles.blockLabel}>Status</Text>
        <SingleChoice options={["Admitted", "Not Admitted", "Waitlisted"]} value="" />

        <View style={styles.signatureRow} wrap={false}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureCaption}>Mentor Assigned</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureCaption}>Start Date</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureCaption}>Expected Review Date</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureCaption}>Pre-Incubation Coordinator</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureCaption}>Signature</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
