import { useEffect, useState } from 'react';
import { createFilm, uploadFilmFiles, updateFilmPersons } from '../api/films';
import { getAllGenres } from '../api/genres';
import { getAllPersons, createPerson } from '../api/persons';
import { getAllCareers } from '../api/career';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import FileDropZone from '../components/FileDropZone';

type Career = { id: number; name: string };

export default function CreateFilmPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [genres, setGenres] = useState<any[]>([]);
  const [persons, setPersons] = useState<any[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<{ personId: number; careerId: number }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [poster, setPoster] = useState<File | null>(null);
  const [filmFile, setFilmFile] = useState<File | null>(null);

  const [isCareerOpen, setIsCareerOpen] = useState(false);

  const [newPerson, setNewPerson] = useState({
    name: '',
    careerId: 0,
    dateOfBirth: '',
    photo: null as File | null,
  });

  const [form, setForm] = useState({
    name: '',
    description: '',
    yearOfRelease: new Date().getFullYear(),
    duration: 90,
    country: '',
    ageRestriction: 12,
  });

  const inputStyle = 'w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10';

  // ------------------- Загрузка данных -------------------
  useEffect(() => {
    getAllGenres().then(setGenres);
    getAllPersons().then(setPersons);
    getAllCareers().then(setCareers);
  }, []);

  // ------------------- Добавление нового персонажа -------------------
  const addNewPerson = async () => {
    if (!newPerson.name.trim() || !newPerson.dateOfBirth || !newPerson.careerId) {
      alert('Введите имя, дату рождения и карьеру нового персонажа');
      return;
    }

    try {
      const created = await createPerson({
        name: newPerson.name,
        careerId: newPerson.careerId,
        dateOfBirth: new Date(newPerson.dateOfBirth),
        linkToPhoto: '',
      });

      // Загружаем фото на сервер
      if (newPerson.photo) {
        const formData = new FormData();
        formData.append('photo', newPerson.photo);

        await fetch(`http://localhost:5173/api/persons/${created.id}/files`, {
          method: 'POST',
          body: formData,
        });
      }

      // Обновляем локальный стейт
      setPersons(prev => [
        ...prev,
        { ...created, careerName: careers.find(c => c.id === created.careerId)?.name }
      ]);
      setSelectedPersons(prev => [...prev, { personId: created.id, careerId: created.careerId }]);
      setNewPerson({ name: '', careerId: 0, dateOfBirth: '', photo: null });
    } catch (err: any) {
      console.error(err);
      alert('Ошибка создания персонажа: ' + (err.message || err));
    }
  };

  // ------------------- Отправка фильма -------------------
  const submit = async () => {
    if (!user) return;
    if (!form.name.trim()) {
      alert('Введите название фильма');
      return;
    }

    try {
      const created = await createFilm({
        ...form,
        creatorId: user.id,
        linkToPoster: '',
        linkToFilm: '',
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

      navigate('/films');
    } catch (err: any) {
      console.error(err);
      alert('Ошибка при создании фильма: ' + (err.message || err));
    }
  };

  // ------------------- JSX -------------------
  return (
    <div className="flex items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-3xl w-full card p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold">Добавить фильм</h2>

        {/* --- Основная форма фильма --- */}
        <div>
          <label className="text-sm text-white/70">Название</label>
          <input className={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>

        <div>
          <label className="text-sm text-white/70">Описание</label>
          <textarea className={`${inputStyle} h-28`} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" className={inputStyle} value={form.yearOfRelease} onChange={e => setForm({ ...form, yearOfRelease: +e.target.value })} placeholder="Год" />
          <input type="number" className={inputStyle} value={form.duration} onChange={e => setForm({ ...form, duration: +e.target.value })} placeholder="Длительность" />
        </div>

        <input className={inputStyle} value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="Страна" />
        <input type="number" className={inputStyle} value={form.ageRestriction} onChange={e => setForm({ ...form, ageRestriction: +e.target.value })} placeholder="Возраст" />

        {/* --- Жанры --- */}
        <div>
          <label className="text-sm text-white/70">Жанры</label>
          <div className="grid grid-cols-2 gap-2 mt-1 max-h-32 overflow-y-auto">
            {genres.map(g => (
              <label key={g.id} className="flex items-center space-x-2">
                <input type="checkbox" checked={selectedGenres.includes(g.id)} onChange={() => setSelectedGenres(prev => prev.includes(g.id) ? prev.filter(id => id !== g.id) : [...prev, g.id])} />
                <span>{g.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* --- Персонажи с фото --- */}
        <div>
          <label className="text-sm text-white/70">Выбрать персонажей</label>
          <div className="grid grid-cols-2 gap-2 mt-1 max-h-40 overflow-y-auto">
            {persons.map(p => (
              <label key={p.id} className="flex items-center space-x-2 p-1 hover:bg-white/5 rounded cursor-pointer">
                <input type="checkbox" checked={selectedPersons.some(sp => sp.personId === p.id)} onChange={() => {
                  setSelectedPersons(prev => prev.some(sp => sp.personId === p.id)
                    ? prev.filter(sp => sp.personId !== p.id)
                    : [...prev, { personId: p.id, careerId: p.careerId }]
                  );
                }} />
                <img
                  src={p.linkToPhoto ? `http://localhost:5173/api/persons/${p.id}/photo` : '/default-avatar.png'}
                  alt={p.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                  onError={(e: any) => { e.target.src = '/default-avatar.png'; }}
                />


                <span>{p.name} ({p.careerName || careers.find(c => c.id === p.careerId)?.name || 'не выбрано'})</span>
              </label>
            ))}
          </div>
        </div>

        {/* --- Новый персонаж --- */}
        <div className="space-y-2 border-t border-white/20 pt-3">
          <h3 className="font-semibold">Добавить нового персонажа</h3>
          <input className={inputStyle} placeholder="Имя" value={newPerson.name} onChange={e => setNewPerson({ ...newPerson, name: e.target.value })} />
          <input type="date" className={inputStyle} value={newPerson.dateOfBirth} onChange={e => setNewPerson({ ...newPerson, dateOfBirth: e.target.value })} />

          {/* кастомный дропдаун карьеры */}
          <div className="relative">
            <button type="button" onClick={() => setIsCareerOpen(prev => !prev)} className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-md text-left flex justify-between items-center">
              {newPerson.careerId ? careers.find(c => c.id === newPerson.careerId)?.name : 'Выберите карьеру'}
              <span>▼</span>
            </button>
            {isCareerOpen && (
              <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-white/10 rounded-md max-h-40 overflow-y-auto">
                {careers.map(c => (
                  <div key={c.id} className="px-3 py-2 cursor-pointer hover:bg-white/10" onClick={() => { setNewPerson({ ...newPerson, careerId: c.id }); setIsCareerOpen(false); }}>
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FileDropZone label="Фото персонажа" accept="image/*" file={newPerson.photo} onChange={f => setNewPerson({ ...newPerson, photo: f })} />
          <button onClick={addNewPerson} className="w-full py-1 rounded-md bg-green-500 hover:bg-green-600 transition">Добавить персонажа</button>
        </div>

        <FileDropZone label="Постер" accept="image/*" file={poster} onChange={setPoster} />
        <FileDropZone label="Фильм" accept="video/*" file={filmFile} onChange={setFilmFile} />

        <button onClick={submit} className="w-full py-2 rounded-md bg-brand-500 hover:bg-brand-600 transition">Создать фильм</button>
      </motion.div>
    </div>
  );
}
