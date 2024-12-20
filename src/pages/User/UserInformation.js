import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../api/Api'; // Pastikan path ini sesuai

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
                  <h2 className="text-uppercase text-center mb-5">Informasi Profil</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="namaLengkap">Nama Lengkap</label>
                      <input
                        type="text"
                        id="namaLengkap"
                        className="form-control form-control-lg"
                        name="nama_lengkap"
                        value={formData.nama_lengkap}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="username">Username</label>
                      <input
                        type="text"
                        id="username"
                        className="form-control form-control-lg"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="nohp">No Telepon</label>
                      <input
                        type="text"
                        id="nohp"
                        className="form-control form-control-lg"
                        name="no_hp"
                        value={formData.no_hp}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Jenis Kelamin</label>
                      <div>
                        <input
                          type="radio"
                          id="male"
                          name="jenkel"
                          value="L"
                          checked={formData.jenkel === 'L'}
                          onChange={handleInputChange}
                          className="form-check-input"
                          required
                        />
                        <label htmlFor="male" className="form-check-label me-2">Laki-laki</label>

                        <input
                          type="radio"
                          id="female"
                          name="jenkel"
                          value="P"
                          checked={formData.jenkel === 'P'}
                          onChange={handleInputChange}
                          className="form-check-input"
                          required
                        />
                        <label htmlFor="female" className="form-check-label">Perempuan</label>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="alamat">Alamat</label>
                      <input
                        type="text"
                        id="alamat"
                        className="form-control form-control-lg"
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">
                        Simpan
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
