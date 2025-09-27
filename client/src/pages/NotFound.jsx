import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold mb-3">404</h1>
      <p className="mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="px-5 py-3 rounded-xl bg-blue-600 text-white">Go Home</Link>
    </div>
  );
}
