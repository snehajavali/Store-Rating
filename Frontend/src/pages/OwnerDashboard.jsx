import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function OwnerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await api.get("/owner/dashboard");
    setData(res.data);
  };

  if (!data)
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          Owner Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400">
              Store Name
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {data.store}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400">
              Average Rating
            </p>

            <h2 className="text-4xl font-bold mt-2 text-yellow-400">
              ⭐ {data.averageRating}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400">
              Total Ratings
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {data.totalRatings}
            </h2>
          </div>

        </div>

        <h2 className="text-2xl font-bold mb-5">
          Users Who Rated
        </h2>

        <div className="space-y-4">

          {data.ratings.map((rating) => (
            <div
              key={rating.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
            >
              <div className="flex justify-between">

                <div>
                  <h3 className="text-lg font-bold">
                    {rating.User.name}
                  </h3>

                  <p className="text-slate-400">
                    {rating.User.email}
                  </p>
                </div>

                <div className="text-yellow-400 text-xl font-bold">
                  ⭐ {rating.rating}
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;