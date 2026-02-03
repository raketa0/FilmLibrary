import { useEffect, useState } from "react";
import { getMyFilmsStats } from "../api/films";
import { Bar } from "react-chartjs-2";

export default function MyFilmsPage({ userId }: { userId: string }) {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    getMyFilmsStats(userId).then(setStats);
  }, [userId]);

  if (!stats) return <p>Загрузка...</p>;

  const data = {
    labels: stats.map(f => f.name),
    datasets: [
      {
        label: "Просмотры",
        data: stats.map(f => f.viewsCount),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "Рейтинг",
        data: stats.map(f => f.rating),
        backgroundColor: "rgba(255, 206, 86, 0.7)",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Мои фильмы</h1>

      <div className="max-w-4xl">
        <Bar data={data} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((film) => (
          <div key={film.filmId} className="border p-4 rounded-md bg-gray-900 text-white">
            <h3 className="font-bold">{film.name}</h3>
            <p>⭐ {film.rating ?? "—"}</p>
            <p>Просмотры: {film.viewsCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}