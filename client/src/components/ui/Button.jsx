export function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition ${className || ""}`}
    >
      {children}
    </button>
  )
}
