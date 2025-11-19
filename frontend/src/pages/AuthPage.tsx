import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [mode, setMode] = useState<'login'|'register'>('login');

  return (
    <div className="flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="max-w-3xl w-full card grid grid-cols-2 gap-6">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Добро пожаловать</h2>
          <p className="text-sm text-white/70 mb-6">Зарегистрируйтесь или войдите чтобы управлять коллекцией фильмов и личными настройками.</p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setMode('login')} className={`px-4 py-2 rounded-md ${mode==='login' ? 'bg-brand-500' : 'bg-white/6'}`}>Вход</button>
            <button onClick={() => setMode('register')} className={`px-4 py-2 rounded-md ${mode==='register' ? 'bg-brand-500' : 'bg-white/6'}`}>Регистрация</button>
          </div>
        </div>

        <div className="p-6">
          {mode === 'login' ? <LoginForm /> : <RegistrationForm />}
        </div>
      </motion.div>
    </div>
  );
}
