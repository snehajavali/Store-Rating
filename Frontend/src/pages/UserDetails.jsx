import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/admin/users/${id}`);
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

          <h1 className="text-4xl font-bold mb-8">
            User Details
          </h1>

          <div className="space-y-4">

            <p>
              <strong>ID:</strong> {user.id}
            </p>

            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Address:</strong> {user.address}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default UserDetails;