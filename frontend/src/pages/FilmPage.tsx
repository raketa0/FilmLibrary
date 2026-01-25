import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilm, rateFilm, addView } from "../api/films";
import { getAllGenres } from "../api/genres";
import { getAllPersons } from "../api/persons";
import { resolveGenres, resolvePersons } from "../utils/resolve";
import type { FilmDto } from "../types/FilmDto";

const BASE_URL = "http://localhost:5084/store";

export default function FilmPage() {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<FilmDto | null>(null);
  const [genres, setGenres] = useState<any[]>([]);
  const [persons, setPersons] = useState<any[]>([]);
  const [rate, setRate] = useState(0);
  const [rated, setRated] = useState(false);

  useEffect(() => {
    getAllGenres().then(setGenres);
    getAllPersons().then(setPersons);
  }, []);

  useEffect(() => {
    if (!id) return;

    const loadFilm = async () => {
      const filmData = await getFilm(+id);
      setFilm(filmData);

      if ((filmData as any).userRate) setRated(true);

      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          await addView(+id, userId);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadFilm();
  }, [id]);

  if (!film) return <div>Загрузка...</div>;

  const filmGenres = resolveGenres(film.genreIds, genres);
  const filmPersons = resolvePersons(film.persons, persons);

  const submitRate = async () => {
    await rateFilm(film.id, rate);
    setRated(true);
    setFilm({ ...film, rating: rate });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <img src={`${BASE_URL}/${film.linkToPoster}`} className="rounded-xl" />
        <div className="col-span-2 space-y-3">
          <h1 className="text-3xl font-bold">{film.name}</h1>
          <div className="flex gap-4 text-sm opacity-80">
            <span>{film.yearOfRelease}</span>
            <span>{film.duration} мин</span>
            <span>{film.country}</span>
            <span>{film.ageRestriction}+</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {filmGenres.map((g) => (
              <span key={g.id} className="px-2 py-1 bg-gray-800 rounded text-sm">
                {g.name}
              </span>
            ))}
          </div>
          <p className="opacity-90">{film.description}</p>
          <div className="space-y-1">
            {filmPersons.map((p, i) => (
              p && (
                <div key={i} className="text-sm">
                  {p.career}: {p.name}
                </div>
              )
            ))}
          </div>
          <p className="text-lg">⭐ {film.rating ?? "—"}</p>
          {!rated && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={10}
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
                className="w-20 px-2 py-1 bg-gray-800 rounded"
              />
              <button
                onClick={submitRate}
                className="px-4 py-1 bg-green-600 rounded"
              >
                Оценить
              </button>
            </div>
          )}
          {rated && <p className="opacity-60">Вы уже оценили фильм</p>}
        </div>
      </div>
      {film.linkToFilm && (
        <video
          src={`${BASE_URL}/${film.linkToFilm}`}
          controls
          className="w-full max-h-[600px] rounded-xl bg-black"
        />
      )}
    </div>
  );
}