import { useEffect, useState } from "react";
import { getViewHistory } from "../api/films";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    getViewHistory().then(setHistory);
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">История просмотров</h1>

      {history.map(h => (
        <Link
          key={h.filmId}
          to={`/films/${h.filmId}`}
          className="block p-4 bg-gray-900 rounded-xl hover:bg-gray-800"
        >
          <div className="flex justify-between">
            <span>{h.filmName}</span>
            <span className="opacity-60">{h.viewedAt}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}