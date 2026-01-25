import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:5084/store";

export default function FilmCard({ film }: any) {
  const rating = film.rating !== null && film.rating !== undefined
    ? Number(film.rating).toFixed(1)
    : "—";

  return (
    <Link
      to={`/films/${film.id}`}
      className="bg-gray-900 rounded-xl overflow-hidden hover:scale-[1.02] transition"
    >
      <img
        src={`${BASE_URL}/${film.linkToPoster}`}
        className="w-full h-[260px] object-cover"
      />

      <div className="p-3 space-y-1">
        <h3 className="font-semibold">{film.name}</h3>
        <div className="flex justify-between text-sm opacity-70">
          <span>{film.yearOfRelease}</span>
          <span>⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
}