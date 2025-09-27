import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    navigate("/reset-password"); // simulate verification success
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
      <form className="space-y-4" onSubmit={handleVerify}>
        <input type="text" placeholder="Enter OTP" className="w-full p-3 border rounded-xl focus:ring focus:ring-purple-300" />
        <button className="w-full bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700">Verify OTP</button>
      </form>
    </div>
  );
}
