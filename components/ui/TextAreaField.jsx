// components/ui/TextAreaField.jsx
export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  rows = 4,
  placeholder = "",
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-institute-text">
        {label}
        {required && <span className="text-institute-red"> *</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={`rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-institute-red/40 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
