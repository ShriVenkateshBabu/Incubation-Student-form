# AAA College — Pre-Incubation Student Startup / Innovation Idea Submission Form

A Next.js + React web application for the **Pre-Incubation Centre** at
**AAA College of Engineering and Technology**. Students fill in the form
in the browser and download a real, text-based, selectable, print-ready
**A4 PDF** (built with `@react-pdf/renderer` — not a screenshot).

## 1. Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

Production build:

```bash
npm run build
npm start
```

## 2. Replace the logos (do this first)

Two placeholder images ship in `/public` so the app runs out of the box:

- `public/aaa-college-logo.png` — AAA College crest (left)
- `public/anna-university-logo.png` — Anna University logo (right)

**Replace these two files with the real logos**, keeping the same file
names (or update the `src` paths in
`components/InstitutionalHeader.jsx` and
`components/pdf/SubmissionPdfDocument.jsx` if you rename them). Both the
on-screen header and the generated PDF header read from these same
files, so a single swap updates both. Square/near-square PNGs with a
transparent background work best; the layout preserves aspect ratio via
`object-fit: contain`, so logos are never stretched or distorted.

## 3. Fill in the real college details

Search the codebase for the placeholders and replace them:

- `lib/formSchema.js` → `COLLEGE_ADDRESS_PLACEHOLDER` — the official
  postal address (shown in the PDF header and should be updated
  before this is used for a real submission).
- The website / email / phone fields in the header are blank
  underscores by design — fill them in
  `components/InstitutionalHeader.jsx` (web view) and
  `components/pdf/SubmissionPdfDocument.jsx` (`HeaderFixed`, PDF view)
  once you have the official contact details.

## 4. Project structure

```
lib/formSchema.js            Single source of truth: option lists + empty form state
lib/validateForm.js          Required-field / email / mobile validation
components/ui/               Reusable field, textarea, checkbox/radio group, section card
components/sections/         One component per form section (A–I + Document Info)
components/pdf/
  SubmissionPdfDocument.jsx  The @react-pdf/renderer document — header/footer on every
                             page, all sections, and the "Pre-Incubation Centre use only"
                             evaluation + admission pages
components/InstitutionalHeader.jsx / InstitutionalFooter.jsx   On-screen header/footer
components/PreviewModal.jsx  Read-only review before download
pages/index.js               Orchestrates state, validation, draft save/load, PDF export
```

## 5. What's implemented

- Sections A–I exactly as specified (Student Details, Team Details with
  a 5-row member table, Idea Details, Innovation & Technology, Market &
  Business Potential, Intellectual Property, Support Required, Project
  Status & Future Plan, Student Declaration).
- Document information box, purpose statement, required-field
  validation (name, register number, department, programme, email
  format, 10-digit mobile number, idea title, problem statement,
  proposed solution, declaration checkbox).
- Save Draft / Clear Form using `localStorage` (per-browser, no backend).
- Preview panel showing everything that has been entered.
- Download PDF: A4, portrait, selectable text, institutional header
  and footer with page numbers repeated on every page, tables that
  don't overflow the page width, and a second page reserved for
  **"For Pre-Incubation Centre Use Only"** (screening, evaluation
  table, committee recommendation, admission decision) — left blank
  for the Centre to fill after printing.
- Responsive layout for desktop/tablet/mobile; the PDF is always A4
  portrait regardless of screen size.

## 6. What still needs your input

- The real logos (see §2).
- The official college address / website / email / phone (see §3).
- If register numbers, mobile format, or academic year conventions
  differ from the 10-digit Indian mobile pattern assumed in
  `lib/validateForm.js`, adjust the regex there.
- There is currently no backend: "Save Draft" is local to the
  student's browser and "Download PDF" happens entirely client-side.
  If the Centre wants submissions collected centrally, wire
  `handleDownloadPdf` in `pages/index.js` (or a new handler) to an API
  route / database of your choice.
