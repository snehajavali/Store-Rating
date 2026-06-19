function DashboardCard({ title, value, color }) {
  return (
    <div
      className={`
      p-6 rounded-3xl
      shadow-xl
      border border-slate-800
      bg-slate-900
      hover:scale-105
      transition-all
      duration-300
    `}
    >
      <p className="text-slate-400">
        {title}
      </p>

      <h1
        className={`text-5xl font-bold mt-4 ${color}`}
      >
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;