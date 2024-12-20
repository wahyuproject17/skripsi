import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import History from './pages/User/History';
import Gallery from './pages/Gallery';
import Shop from './pages/Shop';
import Location from './pages/Location';
import AdminHome from './pages/Admin/AdminHome';
import Login from './pages/Login';
import Registrasi from './pages/Registrasi';
import UserInformation from './pages/User/UserInformation';
import Password from './pages/User/Password';
import GaleryInformation from './pages/Admin/GaleryInformation';
import HomeInformation from './pages/Admin/HomeInformation';
import AdminTable from './pages/Admin/AdminTable';
import UserTable from './pages/Admin/UserTable';
import ListOrder from './pages/Admin/ListOrder';
import FishInformation from './pages/Admin/fishInformation';
import ProtectedRoute from './middleware/protectedRoute';
import StockInformation from './pages/Admin/stockInformation';
import Chatbot from './components/Chatbot'; // Import Chatbot
import { useUser } from './pages/UserContext';
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
  const { userLevel, setUserLevel, username, setUsername } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserLevel = localStorage.getItem('userLevel');
    const storedUsername = localStorage.getItem('username');

    if (storedUserLevel !== null) {
      setUserLevel(parseInt(storedUserLevel));
    }
    if (storedUsername !== null) {
      setUsername(storedUsername);
    }
    setLoading(false); // set loading to false after state is initialized
  }, [setUserLevel, setUsername]);

  useEffect(() => {
    if (userLevel !== null) {
      localStorage.setItem('userLevel', userLevel.toString());
    }
    if (username !== null) {
      localStorage.setItem('username', username);
    }
  }, [userLevel, username]);

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(window.inactivityTimer);
      window.inactivityTimer = setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userLevel');
        localStorage.removeItem('username');
        setUserLevel(null);
        setUsername(null);
        alert('Session expired due to inactivity.');
        window.location.href = '/login';
      }, 30 * 60 * 1000); // 30 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    resetTimer(); // Initialize timer on mount

    return () => {
      clearTimeout(window.inactivityTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [setUserLevel, setUsername]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        fontSize: '1.5rem',
      }}>
        <CircularProgress style={{ marginRight: '1rem' }} />
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* LOGIN AND REGISTER */}
        <Route path='/login' element={<Login />} />
        <Route path='/registrasi' element={<Registrasi />} />

        {/* USER */}
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/location' element={<Location />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/history' element={<History />} />
        <Route path='/user' element={<UserInformation />} />
        <Route path='/password' element={<Password />} />

        {/* ADMIN */}
        <Route path='/admin' element={<ProtectedRoute component={AdminHome} requiredLevel={1} />} />
        <Route path='/admin/home' element={<ProtectedRoute component={AdminHome} requiredLevel={1} />} />
        <Route path='/admin/jenis-ikan' element={<ProtectedRoute component={FishInformation} requiredLevel={1} />} />
        <Route path='/admin/stok-ikan' element={<ProtectedRoute component={StockInformation} requiredLevel={1} />} />
        <Route path='/admin/gallery-page' element={<ProtectedRoute component={GaleryInformation} requiredLevel={1} />} />
        <Route path='/admin/home-page' element={<ProtectedRoute component={HomeInformation} requiredLevel={1} />} />
        <Route path='/admin/list-order' element={<ProtectedRoute component={ListOrder} requiredLevel={1} />} />
        <Route path='/admin/admin-table' element={<ProtectedRoute component={AdminTable} requiredLevel={1} />} />
        <Route path='/admin/user-table' element={<ProtectedRoute component={UserTable} requiredLevel={1} />} />
      </Routes>

      <ChatbotWithRoute />
    </Router>
  );
};

// Create a new component to handle the location check and conditionally render the Chatbot
const ChatbotWithRoute = () => {
  const location = useLocation(); // useLocation hook inside the correct scope

  // Render Chatbot hanya jika path-nya '/home'
  if (location.pathname !== '/Home' && location.pathname !== '/') {
    return null; // Tidak render Chatbot jika bukan di halaman /home
  }

  return <Chatbot />;
};

export default App;
