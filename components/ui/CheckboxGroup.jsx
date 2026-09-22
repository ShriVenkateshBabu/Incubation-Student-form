// components/ui/CheckboxGroup.jsx
export default function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
  required = false,
  error,
  columns = 2,
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-institute-text">
        {label}
        {required && <span className="text-institute-red"> *</span>}
      </span>
      <div
        className={`grid gap-x-4 gap-y-2 ${
          columns === 3
            ? "grid-cols-1 sm:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 text-sm text-institute-text"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="h-4 w-4 accent-institute-red"
            />
            {option}
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
