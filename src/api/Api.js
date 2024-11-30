import axios from "axios";
import {redirect} from 'react-router-dom'

export const API = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

export default API;


export let navigate = redirect();
 
// API FOR USER
export const fetchUsers = async () => {
  try {
    const response = await API.get('user/get-user');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Terjadi kesalahan saat mengambil data pengguna');
  }
};

  export const addUser = async (userData) => {
    try {
        const response = await API.post('user/add-user', userData);
        return response.data;
      } catch (error) {
        console.error('Error adding fish:', error);
        throw error;
      }
    };

// Fungsi untuk memperbarui data pengguna di server
export const updateUser = async (id, updatedData) => {
  try {
    const response = await API.put(`/user/edit-user/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
};

// Fungsi untuk menghapus data pengguna di server
export const deleteUser = async (id) =>{
  try {
    const response = await API.delete(`user/delete-user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

// API FOR ADMIN
// Fungsi untuk menambahkan admin baru
export const addAdmin = async (newAdmin) => {
  try {
    const response = await API.post('admin/add-admin', newAdmin);
    return response.data;
  } catch (error) {
    console.error('Failed to add admin:', error);
    throw error;
  }
};

export const fetchAdmin = async () => {
  try {
    const response = await API.get('admin/get-admin');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Terjadi kesalahan saat mengambil data pengguna');
  }
};

  export const deleteAdmins = async (id) =>{
    try {
      const response = await API.delete(`admin/delete-admin/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Fungsi untuk memperbarui data admin
export const updateAdmin = async (id, updatedData) => {
  try {
    const response = await API.put(`admin/edit-admin/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Failed to update admin:', error);
    throw error;
  }
};

// API FOR ORDER
export const fetchOrders = async () => {
  try {
    const response = await API.get('order/get-order');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};

export const fetchOrderById = async (id) => {
  try {
    const response = await API.get(`order/get-order/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch order by ID');
  }
};

export const addOrder = async (orderData) => {
  try {
    const response = await API.post('order/add-order', orderData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add order');
  }
};

export const editOrder = async (orderId, orderData) => {
  try {
    const response = await API.put(`order/edit-order/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit order');
  }
};

export const completeOrder = async (id, body) => {
  try {
    const response = await API.put(`order/${id}/complete`, body);
    return response.data;
  } catch (error) {
    console.error('Error completing order:', error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await API.delete(`order/delete-order/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete order');
  }
};

//API IKAN
export const fetchIkan = async () => {
  try {
    const response = await API.get('dashboard/get-ikan');
    return response.data;
  } catch (error) {
    console.error('Error fetching ikan:', error);
    throw error;
  }
};

export const getStock = async () => {
  try {
    const response = await API.get('dashboard/get-stock');
    return response.data;
  } catch (error) {
    console.error('Error fetching stock:', error);
    throw error;
  }
};


export const fetchTotalIkan = async () => {
  try {
      const response = await API.get('dashboard/get-total-ikan'); // Sesuaikan dengan endpoint Anda
      const data = await response.data;
      if (data.success) {
          return data.total_ikan; // Hanya mengembalikan nilai total_ikan
      } else {
          throw new Error('Failed to fetch total ikan');
      }
  } catch (error) {
      console.error('Error fetching total ikan:', error);
      return 0; // Mengembalikan 0 jika terjadi kesalahan
  }
};

export const fetchJenisIkan = async () => {
  try {
      const response = await API.get('dashboard/get-jenisikan'); // Sesuaikan dengan endpoint Anda
      const data = await response.data;
      if (data.success) {
          return data.total_jenis_ikan; // Hanya mengembalikan nilai total_ikan
      } else {
          throw new Error('Failed to fetch total jenis ikan');
      }
  } catch (error) {
      console.error('Error fetching total jenis ikan:', error);
      return 0; // Mengembalikan 0 jika terjadi kesalahan
  }
};

export const fetchTotalOrders = async (range) => {
  try {
      const response = await API.get(`order/get-total/${range}`); // Menyertakan parameter range
      const data = await response.data;
      if (data.success) {
          return { totalOrders: data.total_orders, ordersPerDay: data.orders_per_day };
      } else {
          throw new Error('Failed to fetch total order');
      }
  } catch (error) {
      console.error('Error fetching total order:', error);
      return { totalOrders: 0, ordersPerDay: [] }; // Mengembalikan 0 dan array kosong jika terjadi kesalahan
  }
};

export const fetchAllOrders = async () => {
  try {
      const response = await API.get('order/get-total'); // Sesuaikan dengan endpoint Anda
      const data = await response.data;
      if (data.success) {
          return data.total_orders; // Hanya mengembalikan nilai total_order
      } else {
          throw new Error('Failed to fetch total order');
      }
  } catch (error) {
      console.error('Error fetching total order:', error);
      return 0; // Mengembalikan 0 jika terjadi kesalahan
  }
};


export const fetchTotalUser = async () => {
  try {
      const response = await API.get('user/total-user'); // Sesuaikan dengan endpoint Anda
      const data = await response.data;
      if (data.success) {
          return data.total_users;
      } else {
          throw new Error('Failed to fetch total users');
      }
  } catch (error) {
      console.error('Error fetching total users:', error);
      return 0; // Mengembalikan 0 jika terjadi kesalahan
  }
};

export const fetchTotalAdmin = async () => {
  try {
      const response = await API.get('admin/total-admin'); // Sesuaikan dengan endpoint Anda
      const data = await response.data;
      if (data.success) {
          return data.total_admins;
      } else {
          throw new Error('Failed to fetch total admin');
      }
  } catch (error) {
      console.error('Error fetching total admin:', error);
      return 0; // Mengembalikan 0 jika terjadi kesalahan
  }
};

export const addIkan = async (formData) => {
  try {
    const response = await API.post('/dashboard/add-ikan', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding fish:', error);
    throw error;
  }
};

export const updateIkan = async (id_ikan, formData) => {
  try {

    const response = await API.put(`dashboard/edit-ikan/${id_ikan}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error editing ikan:', error);
    throw error;
  }
};

export const deleteIkan = async (id_ikan) => {
  try {
    const response = await API.delete(`dashboard/delete-ikan/${id_ikan}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting ikan:', error);
    throw error;
  }
};

//API Galeri
// Fungsi untuk mengambil data galeri foto
export const fetchGaleriFoto = async () => {
  try {
    const response = await API.get('/gallery/get-gallery');
    return response.data;
  } catch (error) {
    console.error('Error fetching galeri foto:', error);
    throw error;
  }
};

// Fungsi untuk menambahkan data baru ke galeri foto
export const createGaleriFoto = async (newData) => {
  try {
    const response = await API.post('/gallery/add-gallery', newData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create galeri foto:', error);
    throw error;
  }
};


// Fungsi untuk memperbarui data galeri foto
export const updateGaleriFoto = async (id, updatedData) => {
  try {
    const response = await API.put(`/gallery/edit-gallery/${id}`, updatedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update galeri foto:', error);
    throw error;
  }
};

// Membuat benih baru
export async function addBenih(data) {
  try {
      const response = await API.post('/dashboard/add-benih', data, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return response.data; // Mengembalikan data dari respons
  } catch (error) {
      console.error('Error creating benih:', error);
      throw error;
  }
}

// Mengedit benih yang sudah ada
export async function editBenih(id_benih, data) {
  try {
      const response = await API.put(`/dashboard/edit-benih/${id_benih}`, data, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return response.data; // Mengembalikan data dari respons
  } catch (error) {
      console.error('Error updating benih:', error);
      throw error;
  }
}
// Menghapus benih berdasarkan ID
export async function deleteBenih(id_benih) {
  try {
      const response = await API.delete(`/dashboard/delete-benih/${id_benih}`);
      return response.data; // Mengembalikan data dari respons
  } catch (error) {
      console.error('Error deleting benih:', error);
      throw error;
  }
}

// Mengambil semua benih
export async function getBenih() {
  try {
      const response = await API.get('/dashboard/get-benih');
      return response.data; // Mengembalikan data dari respons
  } catch (error) {
      console.error('Error fetching benih:', error);
      throw error;
  }
}

// Mengambil semua ikan
export const getAllIkan = async () => {
  try {
    const response = await API.get('dashboard/get-allikan');
    return response.data;
  } catch (error) {
    console.error('Error fetching ikan:', error);
    throw error;
  }
};

// Membuat konsumsi baru
export async function addKonsumsi(data) {
  try {
      const response = await API.post('/dashboard/add-konsumsi', data, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return response.data; // Mengembalikan data dari respons
  } catch (error) {
      console.error('Error creating konsumsi:', error);
      throw error;
  }
}

// Mengedit konsumsi yang sudah ada
export async function editKonsumsi(id_konsumsi, data) {
  try {
      const response = await API.put(`/dashboard/edit-konsumsi/${id_konsumsi}`, data, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return response.data; // Mengembalikan data dari respons
  } catch (error) {
      console.error('Error updating konsumsi:', error);
      throw error;
  }
}

// Menghapus konsumsi berdasarkan ID
export async function deleteKonsumsi(id_konsumsi) {
  try {
      const response = await API.delete(`/dashboard/delete-konsumsi/${id_konsumsi}`);
      return response.data; // Mengembalikan data dari respons
  } catch (error) {
      console.error('Error deleting konsumsi:', error);
      throw error;
  }
}
// Mengambil semua konsumsi
export async function getKonsumsi() {
  try {
      const response = await API.get('/dashboard/get-konsumsi');
      return response.data; // Mengembalikan data dari respons
  } catch (error) {
      console.error('Error fetching konsumsi:', error);
      throw error;
  }
}


// Fungsi untuk menghapus data galeri foto
export const deleteGaleriFoto = async (id) => {
  try {
    const response = await API.delete(`/gallery/delete-gallery/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete galeri foto:', error);
    throw error;
  }
};

// Fungsi untuk mengambil data dari backend
export const fetchTulisan = async () => {
  try {
    const response = await API.get(`/dashboard/tulisan`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Fungsi untuk mengirim data ke backend
export const updateTulisanData = async (id_tulisan, data) => {
  try {
    const response = await API.put(`/dashboard/edit-tulisan/${id_tulisan}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;

  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

// Interceptors untuk menyisipkan token ke header setiap request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Tambahkan token ke header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors response to prevent logging
API.interceptors.response.use(
    (response) => {
        // Handle response data here if needed
        return response;
    },
    (error) => {
        // Handle errors here if needed
        return Promise.reject(error);
    }
);



// Fungsi login
export const Login = async (email, password, setUserLevel, setUsername) => {
  try {
    const response = await API.post('auth/login', {
      email: email,
      pass: password
    });

    if (response.status === 200) {
      const { success, level, username, token, message } = response.data;
      if (success) {
        window.alert('Login berhasil');
        localStorage.setItem('token', token); // Simpan token ke localStorage
        localStorage.setItem('username', username); 
        setUserLevel(level); // Mengubah state userLevel di komponen React
        setUsername(username); // Mengubah state username di komponen React
      } else {
        window.alert(message || 'Login gagal');
      }
    } else {
      window.alert('Login gagal');
    }
  } catch (error) {
    console.error('Error login:', error);
    window.alert('Gagal login: ' + (error.response?.data?.message || 'Terjadi kesalahan pada server.'));
  }
};

