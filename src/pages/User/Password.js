import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../api/Api'; // Pastikan fungsi API sesuai
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function UbahPassword() {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Ambil userId dari localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert('User ID tidak ditemukan. Harap login kembali.');
      navigate('/login'); // Arahkan ke login jika userId tidak ditemukan
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.repeatNewPassword) {
      alert('Kata sandi baru tidak sama!');
      return;
    }

    try {
      const response = await updatePassword(userId, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      if (response.success) {
        alert('Kata sandi berhasil diubah');
        navigate('/Home');
      } else {
        alert(response.message || 'Gagal mengubah kata sandi');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
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
                    {/* Password Lama */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="oldPassword">Kata Sandi Lama</label>
                      <TextField
                        type={showPassword ? 'text' : 'password'}
                        id="oldPassword"
                        className="form-control form-control-lg"
                        name="oldPassword"
                        value={formData.oldPassword}
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

                    {/* Kata Sandi Baru */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="newPassword">Kata Sandi Baru</label>
                      <TextField
                        type={showPassword ? 'text' : 'password'}
                        id="newPassword"
                        className="form-control form-control-lg"
                        name="newPassword"
                        value={formData.newPassword}
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

                    {/* Ulangi Kata Sandi Baru */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="repeatNewPassword">Ulangi Kata Sandi Baru</label>
                      <TextField
                        type={showPassword ? 'text' : 'password'}
                        id="repeatNewPassword"
                        className="form-control form-control-lg"
                        name="repeatNewPassword"
                        value={formData.repeatNewPassword}
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

                    {/* Tombol Submit */}
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">
                        Ubah Kata Sandi
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

export default UbahPassword;
