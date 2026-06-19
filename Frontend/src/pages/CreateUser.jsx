import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
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
      const res = await api.post("/admin/users", form);

      setMessage(res.data.message);

      setForm({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Error creating user"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto p-8">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

          <h1 className="text-4xl font-bold mb-2">
            Create User
          </h1>

          <p className="text-slate-400 mb-8">
            Add a new user to the system
          </p>

          {message && (
            <div className="bg-green-600 p-3 rounded-xl mb-6">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
            >
              <option value="USER">USER</option>
              <option value="OWNER">OWNER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-semibold transition-all"
            >
              Create User
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default CreateUser;