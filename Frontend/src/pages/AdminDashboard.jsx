import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back Admin 👋
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              to="/create-user"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-medium transition"
            >
              + Create User
            </Link>

            <Link
              to="/create-store"
              className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-medium transition"
            >
              + Create Store
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <DashboardCard
            title="Total Users"
            value={stats.totalUsers}
            color="text-blue-400"
          />

          <DashboardCard
            title="Total Stores"
            value={stats.totalStores}
            color="text-green-400"
          />

          <DashboardCard
            title="Total Ratings"
            value={stats.totalRatings}
            color="text-yellow-400"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <Link
            to="/create-user"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition"
          >
            <h2 className="text-2xl font-bold">
              Create User
            </h2>

            <p className="text-slate-400 mt-2">
              Add new users, owners or admins
            </p>
          </Link>

          <Link
            to="/create-store"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-500 transition"
          >
            <h2 className="text-2xl font-bold">
              Create Store
            </h2>

            <p className="text-slate-400 mt-2">
              Register a new store
            </p>
          </Link>

          <Link
  to="/users"
  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500 transition"
>
  <h2 className="text-2xl font-bold">
    View Users
  </h2>

  <p className="text-slate-400 mt-2">
    View all registered users
  </p>
</Link>

<Link
  to="/admin/stores"
  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-yellow-500 transition"
>
  <h2 className="text-2xl font-bold">
    View Stores
  </h2>

  <p className="text-slate-400 mt-2">
    View all stores and ratings
  </p>
</Link>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;