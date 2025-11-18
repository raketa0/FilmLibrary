import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />  // Главная — авторизация
          <Route path="/profile" element={<ProfilePage />} />  // Личный кабинет
        </Routes>
      </div>
    </Router>
  );
}

export default App;