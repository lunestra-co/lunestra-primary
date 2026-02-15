import React, { useState } from "react";
import { createClient } from "../lib/supabase/client";
import { useAuth } from "./AuthProvider";

const ProfileForm: React.FC<{ onSaved?: () => void }> = ({ onSaved }) => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const supabase = createClient();
    const { error } = await supabase.from("profiles").upsert({
      id: user?.id,
      first_name: firstName,
      last_name: lastName,
    });
    setLoading(false);
    if (error) {
      setError(error.message || "Failed to save profile");
    } else {
      setSuccess("Profile saved successfully");
      if (onSaved) onSaved();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 border rounded mt-8"
    >
      <h2 className="font-serif text-xl mb-4">Complete Your Profile</h2>
      <label className="block mb-2">First Name</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <label className="block mb-2">Last Name</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-black text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </form>
  );
};

export default ProfileForm;
