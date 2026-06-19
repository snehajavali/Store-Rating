import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function StoreList() {
  const [stores, setStores] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get("/stores");
      setStores(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitRating = async (storeId, rating) => {
    try {
      const res = await api.post("/ratings", {
        storeId,
        rating,
      });

      setMessage(res.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Rating Failed"
      );
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      store.address
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-6">
          Stores
        </h1>

        <input
          type="text"
          placeholder="Search by store name or address..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 mb-8 outline-none focus:border-blue-500"
        />

        {message && (
          <div className="bg-green-600 p-3 rounded-xl mb-6">
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">

          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition"
            >
              <h2 className="text-2xl font-bold">
                {store.name}
              </h2>

              <p className="text-slate-400 mt-2">
                {store.email}
              </p>

              <p className="text-slate-400">
                {store.address}
              </p>

              <div className="flex gap-2 mt-5">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() =>
                      submitRating(
                        store.id,
                        star
                      )
                    }
                    className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700"
                  >
                    {star}
                  </button>
                ))}

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default StoreList;