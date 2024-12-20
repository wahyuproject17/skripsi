import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../api/Api'; // Pastikan path ini sesuai
import { IconButton, InputAdornment, TextField } from '@mui/material'; // Import Material UI components
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import the icons

function Registrasi() {
  const [formData, setFormData] = useState({
    username: '',
    nama_lengkap: '',
    no_hp: '',
    email: '',
    jenkel: '', 
    alamat: '',
    password: '',
    repeatPassword: '',
  });
  const [captchaValue, setCaptchaValue] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const recaptchaRef = useRef();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (formData.password !== formData.repeatPassword) {
      alert('Kata sandi tidak sama!');
      return;
    }
    if (!captchaValue) {
      alert('Silakan verifikasi reCAPTCHA.');
      return;
    }

    try {
      const response = await addUser({
        ...formData,
        captcha: captchaValue,
      });

      console.log('API Response:', response); // Log respons untuk debugging

      if (response.success) {
        alert('Registrasi berhasil');
        navigate('/login');
      } else {
        alert(response.message || 'Gagal registrasi');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Cek kembali data anda!');
    }
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3 mt-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Ubah Kata Sandi</h2>
                  <form onSubmit={handleSubmit}>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Kata Sandi Lama</label>
                      <TextField
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="form-control form-control-lg"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="repeatPassword">Kata Sandi Baru</label>
                      <TextField
                        type={showPassword ? 'text' : 'password'}
                        id="repeatPassword"
                        className="form-control form-control-lg"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleInputChange}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">
                        Daftar
                      </button>
                    </div>
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

export default Registrasi;
