import {
  LayoutDashboard,
  Users,
  Store,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        Store Rating
      </h1>

      <nav className="space-y-4">
        <Link
          to="/admin"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/create-user"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <Users size={20} />
          Create User
        </Link>

        <Link
          to="/create-store"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <Store size={20} />
          Create Store
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-400"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;