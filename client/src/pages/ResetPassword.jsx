import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
      <form className="space-y-4">
        <input type="password" placeholder="New Password" className="w-full p-3 border rounded-xl focus:ring focus:ring-red-300" />
        <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-xl focus:ring focus:ring-red-300" />
        <button className="w-full bg-red-600 text-white p-3 rounded-xl hover:bg-red-700">Reset Password</button>
      </form>
      <p className="text-sm text-center mt-4">
        <Link to="/" className="text-red-600 hover:underline">Back to Login</Link>
      </p>
    </div>
  );
}
