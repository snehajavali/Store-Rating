import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { Link } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.address
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.role
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-6">
          Users List
        </h1>

        <input
          type="text"
          placeholder="Search by Name, Email, Address or Role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 mb-6 outline-none focus:border-blue-500"
        />

        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-slate-800 hover:bg-slate-800"
                >
                  <td className="p-4">{user.id}</td>

                  <td className="p-4">{user.name}</td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">{user.address}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm ${
                        user.role === "ADMIN"
                          ? "bg-red-600"
                          : user.role === "OWNER"
                          ? "bg-green-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <Link
                      to={`/users/${user.id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No users found
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default UsersList;