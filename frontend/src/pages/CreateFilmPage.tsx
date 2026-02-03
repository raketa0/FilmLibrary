import { useEffect, useState } from "react";
import { createFilm, uploadFilmFiles, updateFilmPersons } from "../api/films";
import { getAllGenres } from "../api/genres";
import { getAllPersons, createPerson } from "../api/persons";
import { getAllCareers } from "../api/career";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FileDropZone from "../components/FileDropZone";
import PersonCard from "../components/PersonCard";

export default function CreateFilmPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [genres, setGenres] = useState<any[]>([]);
  const [persons, setPersons] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<{ personId: number; careerId: number }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [poster, setPoster] = useState<File | null>(null);
  const [filmFile, setFilmFile] = useState<File | null>(null);
  const [isCareerOpen, setIsCareerOpen] = useState(false);

  const [newPerson, setNewPerson] = useState({
    name: "",
    careerId: 0,
    dateOfBirth: "",
    photo: null as File | null,
  });

  const [form, setForm] = useState({
    name: "",
    description: "",
    yearOfRelease: new Date().getFullYear(),
    duration: 90,
    country: "",
    ageRestriction: 12,
  });

  const inputStyle = "w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10";

  useEffect(() => {
    getAllGenres().then(setGenres);
    getAllPersons().then(setPersons);
    getAllCareers().then(setCareers);
  }, []);

  const addNewPerson = async () => {
    if (!newPerson.name.trim() || !newPerson.dateOfBirth || !newPerson.careerId) return;

    try {
      const created = await createPerson({
        name: newPerson.name,
        careerId: newPerson.careerId,
        dateOfBirth: new Date(newPerson.dateOfBirth),
        linkToPhoto: "",
      });

      if (newPerson.photo) {
        const formData = new FormData();
        formData.append("photo", newPerson.photo);
        const res = await fetch(`http://localhost:5084/api/persons/${created.id}/files`, {
          method: "POST",
          body: formData,
        });
        const updatedPerson = await res.json();
        created.linkToPhoto = updatedPerson.linkToPhoto;
      }

      setPersons(prev => [
        ...prev,
        { ...created, careerName: careers.find(c => c.id === created.careerId)?.name },
      ]);

      setSelectedPersons(prev => [...prev, { personId: created.id, careerId: created.careerId }]);
      setNewPerson({ name: "", careerId: newPerson.careerId, dateOfBirth: "", photo: null });
    } catch (err: any) {
      alert("Ошибка создания персонажа: " + (err.message || err));
    }
  };

  const submit = async () => {
    if (!user || !form.name.trim()) return;

    try {
      const created = await createFilm({
        ...form,
        creatorId: user.id,
        linkToPoster: "",
        linkToFilm: "",
        genreIds: selectedGenres,
      });

      if (poster || filmFile) {
        await uploadFilmFiles(created.id, poster ?? undefined, filmFile ?? undefined);
      }

      if (selectedPersons.length) {
        await updateFilmPersons(
          created.id,
          selectedPersons.map(p => ({ personId: p.personId, careerId: p.careerId }))
        );
      }

      navigate("/films");
    } catch (err: any) {
      alert("Ошибка при создании фильма: " + (err.message || err));
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-3xl w-full card p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold">Добавить фильм</h2>

        {/* Название */}
        <div>
          <label htmlFor="film-name" className="text-sm text-white/70">Название</label>
          <input
            id="film-name"
            className={inputStyle}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Описание */}
        <div>
          <label htmlFor="film-description" className="text-sm text-white/70">Описание</label>
          <textarea
            id="film-description"
            className={`${inputStyle} h-28`}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Год и длительность */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="film-year" className="text-sm text-white/70">Год</label>
            <input
              id="film-year"
              type="number"
              className={inputStyle}
              value={form.yearOfRelease}
              onChange={e => setForm({ ...form, yearOfRelease: +e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="film-duration" className="text-sm text-white/70">Длительность</label>
            <input
              id="film-duration"
              type="number"
              className={inputStyle}
              value={form.duration}
              onChange={e => setForm({ ...form, duration: +e.target.value })}
            />
          </div>
        </div>

        {/* Страна и возраст */}
        <div>
          <label htmlFor="film-country" className="text-sm text-white/70">Страна</label>
          <input
            id="film-country"
            className={inputStyle}
            value={form.country}
            onChange={e => setForm({ ...form, country: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="film-age" className="text-sm text-white/70">Возраст</label>
          <input
            id="film-age"
            type="number"
            className={inputStyle}
            value={form.ageRestriction}
            onChange={e => setForm({ ...form, ageRestriction: +e.target.value })}
          />
        </div>

        {/* Жанры */}
        <div>
          <label htmlFor="film-genres" className="text-sm text-white/70">Жанры</label>
          <div id="film-genres" className="grid grid-cols-2 gap-2 mt-1 max-h-32 overflow-y-auto">
            {genres.map(g => (
              <label key={g.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(g.id)}
                  onChange={() =>
                    setSelectedGenres(prev =>
                      prev.includes(g.id) ? prev.filter(id => id !== g.id) : [...prev, g.id]
                    )
                  }
                />
                <span>{g.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Персонажи */}
        <div>
          <label htmlFor="film-persons" className="text-sm text-white/70">Выбрать персонажей</label>
          <div id="film-persons" className="grid grid-cols-2 gap-2 mt-1 max-h-40 overflow-y-auto">
            {persons.map(p =>
              <PersonCard
                key={p.id}
                person={p}
                selected={selectedPersons.some(sp => sp.personId === p.id)}
                onToggle={() => setSelectedPersons(prev =>
                  prev.some(sp => sp.personId === p.id)
                    ? prev.filter(sp => sp.personId !== p.id)
                    : [...prev, { personId: p.id, careerId: p.careerId }]
                )}
              />
            )}
          </div>
        </div>

        {/* Добавление нового персонажа */}
        <div className="space-y-2 border-t border-white/20 pt-3">
          <h3 className="font-semibold">Добавить нового персонажа</h3>

          <label htmlFor="new-person-name" className="text-sm text-white/70">Имя</label>
          <input
            id="new-person-name"
            className={inputStyle}
            placeholder="Имя"
            value={newPerson.name}
            onChange={e => setNewPerson({ ...newPerson, name: e.target.value })}
          />

          <label htmlFor="new-person-dob" className="text-sm text-white/70">Дата рождения</label>
          <input
            id="new-person-dob"
            type="date"
            className={inputStyle}
            value={newPerson.dateOfBirth}
            onChange={e => setNewPerson({ ...newPerson, dateOfBirth: e.target.value })}
          />

          <div className="relative">
            <span className="text-sm text-white/70">Карьера</span>
            <button type="button" onClick={() => setIsCareerOpen(prev => !prev)}
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-md text-left flex justify-between items-center">
              {newPerson.careerId ? careers.find(c => c.id === newPerson.careerId)?.name : "Выберите карьеру"}
              <span>▼</span>
            </button>
            {isCareerOpen &&
              <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-white/10 rounded-md max-h-40 overflow-y-auto">
                {careers.map(c =>
                  <div key={c.id} className="px-3 py-2 cursor-pointer hover:bg-white/20 text-white" onClick={() => {
                    setNewPerson(prev => ({ ...prev, careerId: c.id }));
                    setIsCareerOpen(false);
                  }}>{c.name}</div>
                )}
              </div>
            }
          </div>


          <FileDropZone label="Фото персонажа" accept="image/*" file={newPerson.photo} onChange={f => setNewPerson({ ...newPerson, photo: f })} />
          <button onClick={addNewPerson} className="w-full py-1 rounded-md bg-green-500 hover:bg-green-600 transition">Добавить персонажа</button>
        </div>

        {/* Файлы фильма */}
        <FileDropZone label="Постер" accept="image/*" file={poster} onChange={setPoster} />
        <FileDropZone label="Фильм" accept="video/*" file={filmFile} onChange={setFilmFile} />

        <button onClick={submit} className="w-full py-2 rounded-md bg-brand-500 hover:bg-brand-600 transition">Создать фильм</button>
      </motion.div>
    </div>
  );
}
