import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api/Api';
import { useUser } from './UserContext'; // Import the useUser hook
import Visibility from '@mui/icons-material/Visibility'; // Eye icon
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Eye off icon

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const { setUserLevel, setUsername, setToken } = useUser(); // Get the context setters

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Mengirim data login:', {
        email: formData.email,
        password: formData.password,
      });

      const response = await API.post('auth/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Respons server:', response);

      if (response.data.success) {
        const userLevel = response.data.level;
        const token = response.data.token;
        const username = response.data.username;
        const userId = response.data.id

        localStorage.setItem('id', userId);
        localStorage.setItem('token', token);

        setToken(token);
        setUserLevel(userLevel);
        setUsername(username);

        // Redirect berdasarkan level pengguna
        if (userLevel === 1) {
          navigate('/admin/home');
        } else if (userLevel === 2) {
          navigate('/Shop');
        }
      } else {
        alert(response.data.message || 'Login gagal');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error data:', error.response.data);
        alert('Gagal login: ' + (error.response.data.message || 'Terjadi kesalahan pada server.'));
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('Tidak ada respons dari server. Silakan coba lagi nanti.');
      } else {
        console.error('Request setup error:', error.message);
        alert('Terjadi kesalahan: ' + error.message);
      }
    }
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3 mt-2">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Masuk</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">Email Anda</label>
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">Kata Sandi</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <span
                          className="input-group-text"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: 'pointer' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </span>
                      </div>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="form2Example3cg"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="form2Example3cg">
                        Ingat Saya
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">
                        Masuk
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Belum punya akun? <a href="/registrasi" className="fw-bold text-body"><u>Daftar di sini</u></a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
