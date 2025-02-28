import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/SideBar';
import NavbarAdmin from '../../components/navbarAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import { StyleSheet, css } from 'aphrodite';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaUsers, FaUserShield, FaFish, FaChartLine } from 'react-icons/fa';
import { fetchAllOrders, fetchTotalOrders, fetchTotalIkan, fetchTotalUser, fetchTotalAdmin, fetchRating } from '../../api/Api';

const Dashboard = () => {
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalIkan, setTotalIkan] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [filter, setFilter] = useState('3months');
  const [chartData, setChartData] = useState([]);
  const [satisfactionData, setSatisfactionData] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTotalOrder = await fetchAllOrders();
        const { ordersPerDay } = await fetchTotalOrders(filter);
        const fetchedTotalIkan = await fetchTotalIkan();
        const fetchedTotalUser = await fetchTotalUser();
        const fetchedTotalAdmin = await fetchTotalAdmin();
        const fetchedSatisfactionData = await fetchRating();
        const formattedSatisfactionData = fetchedSatisfactionData
          ? [
              { name: 'Sangat Puas', value: fetchedSatisfactionData.sangat_puas },
              { name: 'Puas', value: fetchedSatisfactionData.puas },
              { name: 'Cukup Puas', value: fetchedSatisfactionData.cukup_puas },
              { name: 'Tidak Puas', value: fetchedSatisfactionData.kurang_puas },
            ]
          : [];

        setTotalOrder(fetchedTotalOrder);
        setTotalIkan(fetchedTotalIkan);
        setTotalUser(fetchedTotalUser);
        setTotalAdmin(fetchedTotalAdmin);
        setChartData(ordersPerDay);
        setSatisfactionData(formattedSatisfactionData);
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
              <div className={css(styles.infoBox)} style={{backgroundColor: '#37898C'}}>
                <FaUsers size={24} color="#2CAF70" className={css(styles.icon)} />
                <h4 className={css(styles.infoTitle)}>Jumlah Pengguna</h4>
                <p className={css(styles.infoValue)}>{totalUser}</p>
              </div>
              <div className={css(styles.infoBox)} style={{backgroundColor: '#A52A2A'}}>
                <FaUserShield size={24} color="#FF9800" className={css(styles.icon)} />
                <h4 className={css(styles.infoTitle)}>Jumlah Admin</h4>
                <p className={css(styles.infoValue)}>{totalAdmin}</p>
              </div>
              <div className={css(styles.infoBox)} style={{backgroundColor: '#003F88'}}>
                <FaFish size={24} color="#00BCD4" className={css(styles.icon)} />
                <h4 className={css(styles.infoTitle)}>Jumlah Ikan</h4>
                <p className={css(styles.infoValue)}>{totalIkan}</p>
              </div>
              <div className={css(styles.infoBox)} style={{backgroundColor: '#D4D700'}}>
                <FaChartLine size={24} color="#F44336" className={css(styles.icon)} />
                <h4 className={css(styles.infoTitle)}>Jumlah Penjualan</h4>
                <p className={css(styles.infoValue)}>{totalOrder}</p>
              </div>
            </div>
            <h3 className={css(styles.chartTitle)}>Grafik Penjualan</h3>

            <div className={css(styles.filterContainer)}>
              <label htmlFor="filter">Tampilkan Data: </label>
              <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className={css(styles.select)}>
                <option value="1day">1 Hari Terakhir</option>
                <option value="7days">7 Hari Terakhir</option>
                <option value="1month">1 Bulan Terakhir</option>
                <option value="3months">3 Bulan Terakhir</option>
                <option value="6months">6 Bulan Terakhir</option>
                <option value="1year">1 Tahun Terakhir</option>
              </select>
            </div>

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
            <br/>
            <br/>
            <h3 className={css(styles.chartTitle)}>Grafik Tingkat Kepuasan</h3>
            <div className={css(styles.pieContainer)}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    label
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
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
    marginLeft: '250px',
    marginTop: '70px',
    '@media (max-width: 768px)': {
      marginLeft: '0',
      padding: '10px',
    },
  },
  infoBoxes: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
  },
  infoBox: {
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
    '@media (max-width: 768px)': {
      width: '90%',
    },
  },
  infoTitle: {
    margin: '10px 0 5px 0',
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff',
  },
  infoValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  icon: {
    marginBottom: '10px',
  },
  filterContainer: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      justifyContent: 'center',
    },
  },
  select: {
    fontSize: '16px', // Default font size
    '@media (max-width: 768px)': {
      fontSize: '12px', // Smaller font size for mobile
      },
    },
  chartContainer: {
    width: '100%',
    height: 250,
    '@media (max-width: 768px)': {
      height: 200,
    },
  },
  pieContainer: {
    marginTop: '20px',
    width: '100%',
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      height: 250,
      marginBottom: '20px',
    },
  },
});

export default Dashboard;
