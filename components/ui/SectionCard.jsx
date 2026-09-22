// components/ui/SectionCard.jsx
export default function SectionCard({ sectionLabel, title, children }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 border-b border-institute-red/30 pb-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-institute-red">
          {sectionLabel}
        </p>
        <h2 className="text-lg font-semibold text-institute-text">{title}</h2>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
