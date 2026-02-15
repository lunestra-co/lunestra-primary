import React, { useState } from "react";
import { useAuth } from "./AuthProvider";

const AuthForm: React.FC = () => {
  const { signInWithEmail, verifyOtp, user } = useAuth();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setEmailLoading(true);
    const result = await signInWithEmail(email);
    setEmailLoading(false);
    const error = result?.error;
    if (!error) {
      setStep("otp");
      setSuccess("OTP sent to your email");
    } else {
      // If 429, still show OTP input so user can retry
      if (error.status === 429) {
        setStep("otp");
        setError(
          "You must wait before requesting another OTP. Please check your email for the previous code.",
        );
      } else {
        setError(error.message || "Failed to send OTP");
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setOtpLoading(true);
    const result = await verifyOtp(email, otp);
    setOtpLoading(false);
    const error = result?.error;
    if (error) {
      setError(error.message || "Invalid OTP");
    } else {
      setSuccess("Logged in successfully");
    }
  };

  if (user) return null;

  return (
    <div className="max-w-sm mx-auto p-4 border rounded">
      {step === "email" && (
        <form onSubmit={handleEmailSubmit}>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
            disabled={emailLoading}
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded"
            disabled={emailLoading}
          >
            {emailLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}
      {step === "otp" && (
        <form onSubmit={handleOtpSubmit}>
          <label className="block mb-2">Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
            maxLength={8}
            disabled={otpLoading}
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded"
            disabled={otpLoading}
          >
            {otpLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </div>
  );
};

export default AuthForm;
