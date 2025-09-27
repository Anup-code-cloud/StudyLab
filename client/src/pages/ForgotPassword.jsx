import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    navigate("/otp-verification"); // simulate OTP step
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
      <form className="space-y-4" onSubmit={handleSendOTP}>
        <input type="email" placeholder="Enter your Email" className="w-full p-3 border rounded-xl focus:ring focus:ring-yellow-300" />
        <button className="w-full bg-yellow-500 text-white p-3 rounded-xl hover:bg-yellow-600">Send OTP</button>
      </form>
      <p className="text-sm text-center mt-4">
        <Link to="/" className="text-yellow-600 hover:underline">Back to Login</Link>
      </p>
    </div>
  );
}
