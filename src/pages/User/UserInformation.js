import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../api/Api'; // Pastikan path dan fungsi API sesuai

function EditUserInformation() {
  const [formData, setFormData] = useState({
    username: '',
    nama_lengkap: '',
    no_hp: '',
    email: '',
    jenkel: '',
    alamat: '',
  });

  const navigate = useNavigate();
  const id = localStorage.getItem('id');

  useEffect(() => {
    // Fetch data user berdasarkan ID
    const fetchUserData = async () => {
      if (!id) {
        console.error('ID is missing from localStorage');
        return;
      }
      try {
        const user = await getUserById(id);
        if (user && user.length > 0) {
          setFormData(user[0]); // Ambil data user dari array
        } else {
          console.warn('User data is empty');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [id]);

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
      const response = await updateUser(id, formData); // Panggil API update user
      if (response.success) {
        alert('Informasi berhasil diperbarui');
        navigate('/Home'); // Redirect ke halaman profil atau lainnya
      } else {
        alert(response.message || 'Gagal memperbarui informasi');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
      alert('Terjadi kesalahan, coba lagi!');
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
                  <h2 className="text-uppercase text-center mb-5">Edit Informasi Profil</h2>
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

export default EditUserInformation;
