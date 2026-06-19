import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-xl font-bold text-white">
            Store Rating System
          </h1>
        </div>

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl">
            <User size={18} className="text-blue-400" />

            <div>
              <p className="text-white text-sm font-medium">
                {name}
              </p>

              <p className="text-slate-400 text-xs">
                {role}
              </p>
            </div>
          </div>
<button
  onClick={() => navigate("/change-password")}
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white transition"
>
  <KeyRound size={18} />
  Password
</button>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;