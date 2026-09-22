// components/ui/RadioGroup.jsx
export default function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
  error,
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-institute-text">
        {label}
        {required && <span className="text-institute-red"> *</span>}
      </span>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 text-sm text-institute-text"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(name, e.target.value)}
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
