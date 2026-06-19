import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else if (res.data.role === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/stores");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Store Rating
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Welcome back
        </p>

        {message && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-xl mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-blue-400"
          />

          <button
            type="submit"
            className="w-full p-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
          >
            Login
          </button>

          <p className="text-center text-slate-400 mt-6">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-blue-400"
  >
    Register
  </Link>
</p>

        </form>

        <div className="mt-6 text-center text-gray-400">
          Modern Store Rating System
        </div>

      </div>
    </div>
  );
}

export default Login;