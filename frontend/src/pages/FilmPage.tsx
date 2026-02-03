import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getFilm, addView, rateFilm } from "../api/films";
import { getAllGenres } from "../api/genres";
import { useAuthContext } from "../components/AuthContext";
import type { FilmDto } from "../types/FilmDto";
import type { GenreDto } from "../types/GenreDto";

const BASE_URL = "http://localhost:5084/store";

export default function FilmPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthContext();

  const userId = user?.id ?? localStorage.getItem("user_id") ?? null;

  const [film, setFilm] = useState<FilmDto | null>(null);
  const [genres, setGenres] = useState<GenreDto[]>([]);
  const [rate, setRate] = useState<number | null>(null);
  const [rated, setRated] = useState(false);
  const [showRateSlider, setShowRateSlider] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const startTimeRef = useRef<number>(0);
  const watchDataRef = useRef<{ duration: number; evaluation?: number | null } | null>(null);

  useEffect(() => {
    getAllGenres().then(setGenres);
  }, []);

  useEffect(() => {
    if (!id) return;
    getFilm(+id).then((f) => {
      setFilm(f);
      if ((f as any).userRate) {
        setRated(true);
        setRate((f as any).userRate);
      }
    });
  }, [id]);

  const handlePlay = useCallback(() => {
    startTimeRef.current = Math.floor(videoRef.current?.currentTime ?? 0);
    if (!rated) setShowRateSlider(true);
  }, [rated]);

  const handlePauseOrExit = useCallback(() => {
    if (!videoRef.current) return;
    const duration = Math.floor(videoRef.current.currentTime - startTimeRef.current);
    if (duration <= 0) return;
    watchDataRef.current = {
      duration,
      evaluation: rated && rate !== null ? rate : undefined,
    };
  }, [rated, rate]);

  const handleSendView = useCallback(async () => {
    if (!film || !userId || !watchDataRef.current) return;
    try {
      const { duration, evaluation } = watchDataRef.current;
      await addView(film.id, userId, duration, evaluation ?? undefined);
      watchDataRef.current = null;
      console.log("Просмотр отправлен на сервер");
    } catch (err) {
      console.error("Ошибка addView:", err);
    }
  }, [film, userId]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.addEventListener("play", handlePlay);
    videoEl.addEventListener("pause", handlePauseOrExit);
    videoEl.addEventListener("ended", handlePauseOrExit);
    window.addEventListener("beforeunload", handleSendView);

    return () => {
      videoEl.removeEventListener("play", handlePlay);
      videoEl.removeEventListener("pause", handlePauseOrExit);
      videoEl.removeEventListener("ended", handlePauseOrExit);
      handleSendView();
      window.removeEventListener("beforeunload", handleSendView);
    };
  }, [handlePlay, handlePauseOrExit, handleSendView]);

  const submitRate = async () => {
    if (!userId || rated || rate === null) return;
    setRated(true);
    setShowRateSlider(false);

    if (watchDataRef.current) watchDataRef.current.evaluation = rate;

    try {
      await rateFilm(film!.id, rate);
      const updatedFilm = await getFilm(film!.id);
      setFilm(updatedFilm);
    } catch (err) {
      console.error("Ошибка отправки оценки:", err);
    }
  };

  const cancelRate = () => {
    setShowRateSlider(false);
    if (watchDataRef.current) watchDataRef.current.evaluation = undefined;
  };

  if (!userId) return <p className="opacity-60">Пожалуйста, войдите в систему, чтобы смотреть фильм</p>;
  if (!film) return <div>Загрузка...</div>;

  const genreNames = genres
    .filter(g => film.genreIds.includes(g.id))
    .map(g => g.name);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <img src={`${BASE_URL}/${film.linkToPoster}`} alt={film.name} className="rounded-xl" />
        <div className="col-span-2 space-y-3">
          <h1 className="text-3xl font-bold">{film.name}</h1>
          <p className="opacity-90">{film.description}</p>
          <p className="text-lg">⭐ {film.rating?.toFixed(1) ?? "—"}</p>

          <p className="text-sm opacity-80">Год выпуска: {film.yearOfRelease}</p>

          {genreNames.length > 0 && (
            <p className="text-sm opacity-80">
              Жанры: {genreNames.join(", ")}
            </p>
          )}

          {showRateSlider && !rated && (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="range"
                min={1}
                max={10}
                value={rate ?? 5}
                onChange={(e) => setRate(+e.target.value)}
                className="w-40"
              />
              <span>{rate ?? 5}</span>
              <button onClick={submitRate} className="px-4 py-1 bg-green-600 rounded">Оценить</button>
              <button onClick={cancelRate} className="px-4 py-1 bg-red-600 rounded">×</button>
            </div>
          )}

          {rated && <p className="opacity-60">Вы уже оценили фильм</p>}
        </div>
      </div>

      {film.linkToFilm && (
        <video
          ref={videoRef}
          src={`${BASE_URL}/${film.linkToFilm}`}
          controls
          className="w-full max-h-[600px] rounded-xl bg-black"
        />
      )}
    </div>
  );
}
