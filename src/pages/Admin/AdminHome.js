import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/SideBar';
import NavbarAdmin from '../../components/navbarAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import { StyleSheet, css } from 'aphrodite';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUsers, FaUserShield, FaFish, FaChartLine } from 'react-icons/fa';
import { fetchAllOrders,fetchTotalOrders, fetchTotalIkan, fetchTotalUser, fetchTotalAdmin } from '../../api/Api';

const Dashboard = () => {
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalIkan, setTotalIkan] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [filter, setFilter] = useState('1day'); // Filter default
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTotalOrder = await fetchAllOrders();
        const { ordersPerDay } = await fetchTotalOrders(filter);
        const fetchedTotalIkan = await fetchTotalIkan();
        const fetchedTotalUser = await fetchTotalUser();
        const fetchedTotalAdmin = await fetchTotalAdmin();

        setTotalOrder(fetchedTotalOrder);
        setTotalIkan(fetchedTotalIkan);
        setTotalUser(fetchedTotalUser);
        setTotalAdmin(fetchedTotalAdmin);
        setChartData(ordersPerDay);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filter]);

  return (
    <>
      <div style={{ display: 'flex', backgroundColor: '#FFF', height: '100vh' }}>
        <Sidebar />
        <div style={{ width: '100%' }}>
          <NavbarAdmin />
          <div className={css(styles.dashboardContainer)}>
            <div className={css(styles.infoBoxes)}>
              <div className={css(styles.infoBox)}>
                <FaUsers size={24} color="#4CAF50" className={css(styles.icon)} />
                <h4 className={css(styles.infoTitle)}>Jumlah Pengguna</h4>
                <p className={css(styles.infoValue)}>{totalUser}</p>
              </div>
              <div className={css(styles.infoBox)}>
                <FaUserShield size={24} color="#FF9800" className={css(styles.icon)} />
                <h4 className={css(styles.infoTitle)}>Jumlah Admin</h4>
                <p className={css(styles.infoValue)}>{totalAdmin}</p>
              </div>
              <div className={css(styles.infoBox)}>
                <FaFish size={24} color="#00BCD4" className={css(styles.icon)} />
                <h4 className={css(styles.infoTitle)}>Jumlah Ikan</h4>
                <p className={css(styles.infoValue)}>{totalIkan}</p>
              </div>
              <div className={css(styles.infoBox)}>
                <FaChartLine size={24} color="#F44336" className={css(styles.icon)} />
                <h4 className={css(styles.infoTitle)}>Jumlah Penjualan</h4>
                <p className={css(styles.infoValue)}>{totalOrder}</p>
              </div>
            </div>

            {/* Dropdown untuk memilih filter */}
            <div className={css(styles.filterContainer)}>
              <label htmlFor="filter">Tampilkan Data: </label>
              <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="1day">1 Hari Terakhir</option>
                <option value="7days">7 Hari Terakhir</option>
                <option value="1month">1 Bulan Terakhir</option>
                <option value="3months">3 Bulan Terakhir</option>
                <option value="6months">6 Bulan Terakhir</option>
                <option value="1year">1 Tahun Terakhir</option>
              </select>
            </div>

            {/* Chart */}
            <div className={css(styles.chartContainer)}>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="order_date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="jumlah" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoBoxes: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px',
  },
  infoBox: {
    backgroundColor: '#FFFF99',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    flex: 1,
    margin: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '150px',
  },
  infoTitle: {
    margin: '10px 0 5px 0',
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
  },
  infoValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#555',
  },
  icon: {
    marginBottom: '10px',
  },
  filterContainer: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  chartContainer: {
    width: '100%',
    height: 250,
  },
});

export default Dashboard;
