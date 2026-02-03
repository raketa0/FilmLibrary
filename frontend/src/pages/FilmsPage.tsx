import { useEffect, useState } from "react";
import { getAllFilms, searchFilms } from "../api/films";
import { getAllGenres } from "../api/genres";
import FilmCard from "../components/FilmCard";
import { Link } from "react-router-dom";

export default function FilmsPage() {
  const [films, setFilms] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    getAllFilms().then(setFilms);
    getAllGenres().then(setGenres);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        const result = await searchFilms(
          searchName.trim() || undefined,
          selectedGenres.length > 0 ? selectedGenres : undefined
        );
        setFilms(result);
      } catch (err) {
        console.error("Ошибка поиска фильмов:", err);
      }
    }, 300); 

    return () => clearTimeout(delayDebounce);
  }, [searchName, selectedGenres]);

  const applyGenreFilter = async () => {
    try {
      const result = await searchFilms(
        searchName.trim() || undefined,
        selectedGenres.length > 0 ? selectedGenres : undefined
      );
      setFilms(result);
      setIsFilterOpen(false);
    } catch (err) {
      console.error("Ошибка фильтрации по жанрам:", err);
    }
  };

  const selectAllGenres = () => setSelectedGenres(genres.map((g) => g.id));

  const clearGenres = () => setSelectedGenres([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Фильмы</h1>
        <Link to="/films/create" className="text-blue-500 hover:underline">
          + Добавить фильм
        </Link>
      </div>

      <input
        type="text"
        placeholder="Поиск по названию..."
        className="w-full sm:w-1/2 px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <button
        onClick={() => setIsFilterOpen(true)}
        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white mt-2"
      >
        Фильтр по жанрам
      </button>

      {/* --- Модальное окно фильтра жанров --- */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-md max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Выберите жанры</h2>
              <div className="space-x-2">
                <button
                  onClick={selectAllGenres}
                  className="px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-sm"
                >
                  Выбрать все
                </button>
                <button
                  onClick={clearGenres}
                  className="px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-sm"
                >
                  Очистить
                </button>
              </div>
            </div>

            <div className="flex flex-col max-h-64 overflow-y-auto">
              {genres.map((g) => (
                <label key={g.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(g.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedGenres([...selectedGenres, g.id]);
                      } else {
                        setSelectedGenres(selectedGenres.filter((id) => id !== g.id));
                      }
                    }}
                  />
                  <span>{g.name}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
              >
                Отмена
              </button>
              <button
                onClick={applyGenreFilter}
                className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      )}

      {films.length === 0 && <p>Фильмы не найдены</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
}
