import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function StoresList() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get("/admin/stores");
      setStores(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Stores List
        </h1>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-left">Rating</th>
              </tr>
            </thead>

            <tbody>
              {stores.map((store) => (
                <tr
                  key={store.id}
                  className="border-t border-slate-800 hover:bg-slate-800"
                >
                  <td className="p-4">{store.name}</td>
                  <td className="p-4">{store.email}</td>
                  <td className="p-4">{store.address}</td>
                  <td className="p-4">
                    ⭐ {store.averageRating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StoresList;