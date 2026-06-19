import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(
        "/auth/change-password",
        form
      );

      setMessage(res.data.message);

      setForm({
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to update password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-xl mx-auto p-8">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h1 className="text-3xl font-bold mb-2">
            Change Password
          </h1>

          <p className="text-slate-400 mb-6">
            Update your account password
          </p>

          {message && (
            <div className="bg-green-600 p-3 rounded-xl mb-5">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="password"
              name="oldPassword"
              placeholder="Current Password"
              value={form.oldPassword}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl"
            >
              Update Password
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default ChangePassword;