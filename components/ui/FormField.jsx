// components/ui/FormField.jsx
export default function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  error,
  placeholder = "",
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-institute-text">
        {label}
        {required && <span className="text-institute-red"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
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
