import { useEffect, useState, useCallback } from "react";
import Head from "next/head";

import InstitutionalHeader from "../components/InstitutionalHeader";
import InstitutionalFooter from "../components/InstitutionalFooter";
import PreviewModal from "../components/PreviewModal";

import DocumentInfoSection from "../components/sections/DocumentInfoSection";
import StudentDetailsSection from "../components/sections/StudentDetailsSection";
import TeamDetailsSection from "../components/sections/TeamDetailsSection";
import IdeaDetailsSection from "../components/sections/IdeaDetailsSection";
import InnovationSection from "../components/sections/InnovationSection";
import MarketPotentialSection from "../components/sections/MarketPotentialSection";
import IntellectualPropertySection from "../components/sections/IntellectualPropertySection";
import SupportRequiredSection from "../components/sections/SupportRequiredSection";
import ProjectStatusSection from "../components/sections/ProjectStatusSection";
import DeclarationSection from "../components/sections/DeclarationSection";

import { createEmptyFormState, DOCUMENT_TITLE } from "../lib/formSchema";
import { validateForm } from "../lib/validateForm";

const DRAFT_STORAGE_KEY = "aaaPreIncubationDraft";

const EMPTY_ERRORS = { studentDetails: {}, ideaDetails: {}, declaration: {} };

export default function Home() {
  const [formData, setFormData] = useState(createEmptyFormState);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [showPreview, setShowPreview] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Load a previously saved draft, if any, once the component mounts.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setFormData((prev) => ({ ...prev, ...parsed }));
        setStatusMessage("A saved draft was restored.");
      }
    } catch (err) {
      console.error("Could not restore saved draft:", err);
    }
  }, []);

  useEffect(() => {
    if (!statusMessage) return undefined;
    const timer = setTimeout(() => setStatusMessage(""), 4000);
    return () => clearTimeout(timer);
  }, [statusMessage]);

  // ---------- Generic section-level update helpers ----------

  const updateSectionField = useCallback((sectionKey) => {
    return (fieldName, value) => {
      setFormData((prev) => ({
        ...prev,
        [sectionKey]: { ...prev[sectionKey], [fieldName]: value },
      }));
    };
  }, []);

  const toggleArrayValue = useCallback((sectionKey, fieldName) => {
    return (option) => {
      setFormData((prev) => {
        const current = prev[sectionKey][fieldName];
        const next = current.includes(option)
          ? current.filter((item) => item !== option)
          : [...current, option];
        return {
          ...prev,
          [sectionKey]: { ...prev[sectionKey], [fieldName]: next },
        };
      });
    };
  }, []);

  const setSectionValue = useCallback((sectionKey, fieldName) => {
    return (value) => {
      setFormData((prev) => ({
        ...prev,
        [sectionKey]: { ...prev[sectionKey], [fieldName]: value },
      }));
    };
  }, []);

  const updateTeamMember = useCallback((index, fieldName, value) => {
    setFormData((prev) => {
      const members = prev.teamDetails.members.map((member, i) =>
        i === index ? { ...member, [fieldName]: value } : member,
      );
      return {
        ...prev,
        teamDetails: { ...prev.teamDetails, members },
      };
    });
  }, []);

  const updateNextActivity = useCallback((index, value) => {
    setFormData((prev) => {
      const nextActivities = prev.projectStatus.nextActivities.map((a, i) =>
        i === index ? value : a,
      );
      return {
        ...prev,
        projectStatus: { ...prev.projectStatus, nextActivities },
      };
    });
  }, []);

  // ---------- Top-level actions ----------

  function handleSaveDraft() {
    try {
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      setStatusMessage("Draft saved on this device.");
    } catch (err) {
      console.error(err);
      setStatusMessage("Could not save draft.");
    }
  }

  function handleClearForm() {
    setShowClearConfirm(true);
  }

  function confirmClearForm() {
    setFormData(createEmptyFormState());
    setErrors(EMPTY_ERRORS);
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    setShowClearConfirm(false);
    setStatusMessage("Form cleared.");
  }

  function handlePreview() {
    setShowPreview(true);
  }

  async function handleDownloadPdf() {
    const { errors: validationErrors, isValid } = validateForm(formData);
    setErrors(validationErrors);

    if (!isValid) {
      setStatusMessage(
        "Please complete all required fields before downloading.",
      );
      return;
    }

    setIsGeneratingPdf(true);
    setStatusMessage("");

    try {
      const [{ pdf }, pdfDocModule] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../components/pdf/SubmissionPdfDocument"),
      ]);
      const SubmissionPdfDocument = pdfDocModule.default;

      const instance = pdf(<SubmissionPdfDocument formData={formData} />);
      const blob = await instance.toBlob();
      const url = URL.createObjectURL(blob);

      const idPart =
        formData.studentDetails.registerNumber?.trim() || "application";
      const link = document.createElement("a");
      link.href = url;
      link.download = `AAA-PreIncubation-Form-${idPart}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setStatusMessage("PDF downloaded successfully.");
    } catch (err) {
      console.error(err);
      setStatusMessage(
        "Something went wrong while generating the PDF. Please try again.",
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  return (
    <>
      <Head>
        <title>{DOCUMENT_TITLE}</title>
      </Head>

      <div className="min-h-screen bg-slate-50 text-slate-800">
        <InstitutionalHeader />

        <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-5 sm:px-6 lg:px-8">
          {/* =========================================================
            TOP ACTION BAR
        ========================================================= */}
          <div className="sticky top-3 z-40 mb-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-lg shadow-slate-200/40 backdrop-blur-md">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                {/* Left information */}
                <div className="flex items-center gap-3 px-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-institute-red">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 3v5h5"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Pre-Incubation Idea Submission
                    </p>
                    <p className="text-xs text-slate-500">
                      Complete all required fields before submission
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleSaveDraft}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 4h11l3 3v13H5V4z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 4v6h8V4M8 20v-6h8v6"
                      />
                    </svg>
                    Save Draft
                  </button>

                  <button
                    onClick={handlePreview}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                      />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                    Preview
                  </button>

                  <button
                    onClick={handleDownloadPdf}
                    type="button"
                    disabled={isGeneratingPdf}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-institute-red px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-red-200/50 transition-all hover:bg-institute-redDark hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isGeneratingPdf ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="opacity-30"
                          />
                          <path
                            d="M21 12a9 9 0 00-9-9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v12m0 0l-4-4m4 4l4-4"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 20h14"
                          />
                        </svg>
                        Download PDF
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleClearForm}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:border-red-200 hover:bg-red-100 active:scale-[0.98]"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
                      />
                    </svg>
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
            STATUS MESSAGE
        ========================================================= */}
          {statusMessage && (
            <div className="mb-6 animate-[fadeIn_.2s_ease-out]">
              <div className="flex items-start gap-3 rounded-2xl border border-institute-red/15 bg-white px-5 py-4 shadow-sm">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-institute-red">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12l4 4L19 6"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Form Status
                  </p>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {statusMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
            PAGE INTRODUCTION
        ========================================================= */}
          <section className="mb-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Accent strip */}
            <div className="h-1.5 bg-institute-red" />

            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-institute-red">
                    <span className="h-1.5 w-1.5 rounded-full bg-institute-red" />
                    Student Innovation Programme
                  </div>

                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    Pre-Incubation Idea Submission Form
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                    Submit your innovative idea, startup concept, product,
                    service, technology solution, prototype, or social
                    innovation idea for evaluation and potential admission into
                    the Pre-Incubation Programme.
                  </p>
                </div>

                {/* Required indicator */}
                <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-institute-red">
                      *
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      Required field
                    </span>
                  </div>
                </div>
              </div>

              {/* Information points */}
              <div className="mt-7 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
                <div className="flex gap-3 rounded-xl bg-slate-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-institute-red shadow-sm">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3l8 4v5c0 4.5-3.2 7.7-8 9-4.8-1.3-8-4.5-8-9V7l8-4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Institutional Submission
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Official student innovation application
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl bg-slate-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-institute-red shadow-sm">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 19V5m0 14h16M8 16V9m4 7V6m4 10v-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Idea Evaluation
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Structured information for evaluation
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl bg-slate-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-institute-red shadow-sm">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v18M3 12h18"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Pre-Incubation
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Supports ideas from concept to early stage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
            FORM SECTIONS
        ========================================================= */}

          <div className="space-y-6">
            <DocumentInfoSection
              data={formData.documentInfo}
              onChange={updateSectionField("documentInfo")}
            />

            <StudentDetailsSection
              data={formData.studentDetails}
              errors={errors.studentDetails}
              onChange={updateSectionField("studentDetails")}
            />

            <TeamDetailsSection
              data={formData.teamDetails}
              onChangeSubmissionType={setSectionValue(
                "teamDetails",
                "submissionType",
              )}
              onChangeTeamLeader={setSectionValue(
                "teamDetails",
                "teamLeaderName",
              )}
              onChangeMember={updateTeamMember}
            />

            <IdeaDetailsSection
              data={formData.ideaDetails}
              errors={errors.ideaDetails}
              onChange={updateSectionField("ideaDetails")}
              onToggleCategory={toggleArrayValue("ideaDetails", "categories")}
            />

            <InnovationSection
              data={formData.innovationTechnology}
              onChange={updateSectionField("innovationTechnology")}
              onChangeStage={setSectionValue(
                "innovationTechnology",
                "currentStage",
              )}
            />

            <MarketPotentialSection
              data={formData.marketPotential}
              onChange={updateSectionField("marketPotential")}
              onChangeHasCompetitors={setSectionValue(
                "marketPotential",
                "hasCompetitors",
              )}
              onToggleImpactArea={toggleArrayValue(
                "marketPotential",
                "impactAreas",
              )}
            />

            <IntellectualPropertySection
              data={formData.intellectualProperty}
              onChange={updateSectionField("intellectualProperty")}
              onChangeHasProtectableIp={setSectionValue(
                "intellectualProperty",
                "hasProtectableIp",
              )}
              onToggleIpStatus={toggleArrayValue(
                "intellectualProperty",
                "ipStatus",
              )}
            />

            <SupportRequiredSection
              data={formData.supportRequired}
              onChange={updateSectionField("supportRequired")}
              onToggleOption={toggleArrayValue("supportRequired", "options")}
            />

            <ProjectStatusSection
              data={formData.projectStatus}
              onChangeNextActivity={updateNextActivity}
              onChangeTimeline={setSectionValue("projectStatus", "timeline")}
              onChangeIntendsToStartup={setSectionValue(
                "projectStatus",
                "intendsToStartup",
              )}
            />

            <DeclarationSection
              data={formData.declaration}
              errors={errors.declaration}
              onChange={updateSectionField("declaration")}
              onToggleAgreed={setSectionValue("declaration", "agreed")}
            />
          </div>

          {/* =========================================================
            FINAL SUBMISSION AREA
        ========================================================= */}
          <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="h-1 bg-institute-red" />

            <div className="flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-institute-red">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12l4 4L19 6"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Ready to submit?
                  </h2>
                  <p className="mt-1 max-w-xl text-sm leading-5 text-slate-500">
                    Review your information before generating the official
                    pre-incubation application PDF.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={handlePreview}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
                >
                  Preview Application
                </button>

                <button
                  onClick={handleDownloadPdf}
                  type="button"
                  disabled={isGeneratingPdf}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-institute-red px-6 py-3 text-sm font-bold text-white shadow-md shadow-red-200/50 transition-all hover:bg-institute-redDark hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGeneratingPdf ? "Generating PDF..." : "Submit"}
                </button>
              </div>
            </div>
          </section>

          {/* Small footer note */}
          <p className="mt-5 text-center text-xs leading-5 text-slate-400">
            Please ensure that all information provided is accurate and complete
            before downloading your application.
          </p>
        </main>

        <InstitutionalFooter />

        {/* =========================================================
          CUSTOM CLEAR-FORM CONFIRMATION
      ========================================================= */}
        {showClearConfirm && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-form-title"
            aria-describedby="clear-form-description"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setShowClearConfirm(false);
              }
            }}
          >
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white shadow-[0_30px_90px_-25px_rgba(0,0,0,0.6)]">
              {/* Dialog accent */}
              <div className="h-1.5 bg-gradient-to-r from-red-600 via-institute-red to-red-500" />

              <div className="p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-8 ring-red-50/60">
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v4m0 4h.01M5.5 20h13a1.5 1.5 0 001.3-2.25l-6.5-11.25a1.5 1.5 0 00-2.6 0L4.2 17.75A1.5 1.5 0 005.5 20z"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-red-600">
                          Clear Form
                        </p>
                        <h2
                          id="clear-form-title"
                          className="mt-1 text-xl font-extrabold tracking-tight text-slate-950"
                        >
                          Clear this application?
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowClearConfirm(false)}
                        aria-label="Close clear form dialog"
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>

                    <p
                      id="clear-form-description"
                      className="mt-3 text-sm leading-6 text-slate-600"
                    >
                      This will remove all information currently entered in the
                      form and delete the saved draft from this device.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-red-100 bg-red-50/70 px-4 py-3.5">
                  <div className="flex gap-3">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01"
                      />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                    <p className="text-xs font-medium leading-5 text-red-700">
                      This action cannot be undone unless you have another copy
                      of your information saved elsewhere.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-slate-200"
                  >
                    Keep My Data
                  </button>

                  <button
                    type="button"
                    onClick={confirmClearForm}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-red-200/60 transition-all hover:bg-red-700 hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-100"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
                      />
                    </svg>
                    Clear Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
          PREVIEW MODAL
      ========================================================= */}
        {showPreview && (
          <PreviewModal
            formData={formData}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </>
  );
}
