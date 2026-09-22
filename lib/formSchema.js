// lib/formSchema.js
// Single source of truth for the Pre-Incubation Submission Form's
// option lists and the shape of the form's state. Keeping this
// separate from the UI makes the PDF renderer and the web form
// consume identical data.

export const COLLEGE_NAME = "AAA COLLEGE OF ENGINEERING AND TECHNOLOGY";
export const CENTRE_NAME = "PRE-INCUBATION CENTRE";
export const DOCUMENT_TITLE =
  "PRE-INCUBATION STUDENT STARTUP / INNOVATION IDEA SUBMISSION FORM";

// TODO: Replace with the verified official postal address before
// this form is used for any real submission / institutional record.
export const COLLEGE_ADDRESS_PLACEHOLDER = "Official College Address";

export const IDEA_CATEGORIES = [
  "Technology / IT",
  "Artificial Intelligence / Machine Learning",
  "Healthcare",
  "Agriculture",
  "Education",
  "FinTech",
  "Manufacturing",
  "Environment / Sustainability",
  "Social Innovation",
  "Food / Agriculture",
  "IoT / Electronics",
  "Robotics",
  "Biotechnology",
  "Consumer Products / Services",
  "Other",
];

export const IDEA_STAGES = [
  "Initial Idea",
  "Concept Developed",
  "Research Completed",
  "Prototype in Progress",
  "Prototype Completed",
  "Proof of Concept (PoC)",
  "Minimum Viable Product (MVP)",
  "Tested with Users",
  "Existing Startup / Business",
];

export const IMPACT_AREAS = [
  "Commercial",
  "Social",
  "Environmental",
  "Educational",
  "Healthcare",
  "Technological",
  "Other",
];

export const IP_STATUS_OPTIONS = [
  "Patent",
  "Copyright",
  "Trademark",
  "Design Registration",
  "None",
  "Not Applicable",
];

export const SUPPORT_OPTIONS = [
  "Idea Validation",
  "Technical Mentoring",
  "Business Mentoring",
  "Market Research",
  "Prototype Development",
  "Laboratory / Infrastructure",
  "Software / Technology Support",
  "Industry Connect",
  "Legal / IP Guidance",
  "Funding / Grant Guidance",
  "Pitch Deck Preparation",
  "Startup Registration Guidance",
  "Team Building",
  "Marketing / Branding",
  "Other",
];

export const TIMELINE_OPTIONS = [
  "Less than 1 month",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "More than 12 months",
];

export const EVALUATION_PARAMETERS = [
  "Problem Relevance",
  "Innovation / Novelty",
  "Technical Feasibility",
  "Market Potential",
  "Social / Economic Impact",
  "Scalability",
  "Team Capability",
  "Prototype / PoC Readiness",
  "Overall Assessment",
];

export const TEAM_MEMBER_ROW_COUNT = 5;

export function createEmptyTeamMember() {
  return { name: "", registerNumber: "", department: "", role: "" };
}

export function createEmptyFormState() {
  return {
    documentInfo: {
      applicationId: "",
      submissionDate: "",
      academicYear: "",
      department: "",
    },
    studentDetails: {
      studentName: "",
      registerNumber: "",
      department: "",
      programme: "",
      yearSemester: "",
      email: "",
      mobileNumber: "",
    },
    teamDetails: {
      submissionType: "", // "Individual" | "Team"
      members: Array.from(
        { length: TEAM_MEMBER_ROW_COUNT },
        createEmptyTeamMember
      ),
      teamLeaderName: "",
    },
    ideaDetails: {
      title: "",
      categories: [],
      otherCategory: "",
      briefDescription: "",
      problemAddressed: "",
      intendedUsers: "",
      proposedSolution: "",
    },
    innovationTechnology: {
      uniqueness: "",
      differentiation: "",
      resourcesRequired: "",
      currentStage: "",
    },
    marketPotential: {
      potentialCustomers: "",
      revenueModel: "",
      hasCompetitors: "", // "Yes" | "No"
      competitorDetails: "",
      impactAreas: [],
    },
    intellectualProperty: {
      hasProtectableIp: "", // "Yes" | "No" | "Not Sure"
      ipStatus: [],
      ipDetails: "",
    },
    supportRequired: {
      options: [],
      otherSupport: "",
      description: "",
    },
    projectStatus: {
      nextActivities: ["", "", ""],
      timeline: "",
      intendsToStartup: "", // "Yes" | "No" | "Maybe / Need Guidance"
    },
    declaration: {
      studentName: "",
      date: "",
      agreed: false,
    },
  };
}



export const COLLEGE_ADDRESS =
  "AAA College of Engineering and Technology, Sivakasi Road, Sivakasi, Tamil Nadu – 626 123";
