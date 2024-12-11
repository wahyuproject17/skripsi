import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Drawer, IconButton, Collapse } from '@mui/material';
import MonitorIcon from '@mui/icons-material/Monitor';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import CollectionsIcon from '@mui/icons-material/Collections';
import SetMealIcon from '@mui/icons-material/SetMeal';
import MenuIcon from '@mui/icons-material/Menu';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import logo from '../assets/logo.png'; // Sesuaikan dengan path logo Anda
import { useUser } from '../pages/UserContext'; // Pastikan path sesuai

export default function SideBar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const { username, setUsername, logout } = useUser();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleSubmenuClick = () => {
    setOpenSubmenu(!openSubmenu);
  };

  return (
    <>
      {/* Menu Button untuk mobile */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerOpen}
        className={css(styles.menuButton)}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer untuk mobile */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        classes={{
          paper: css(styles.drawerPaper),
        }}
        sx={{
          '@media (min-width: 600px)': {
            display: 'none',
          },
        }}
      >
        <div className={css(styles.drawerHeader)}>
          <div className={css(styles.containers)}>
            <img src={logo} alt="logo" className={css(styles.logo)} />
            <div>
              <p className={css(styles.username)}>{username}</p>
            </div>
          </div>
        </div>
        <Divider />
        <List>
          <ListItem button component="a" href='/Admin' className={css(styles.listItem)}>
            <ListItemIcon>
              <MonitorIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleSubmenuClick} className={css(styles.listItem)}>
            <ListItemIcon>
              <SetMealIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Manajemen Ikan" />
            {openSubmenu ? <ExpandLess className={css(styles.icon)} /> : <ExpandMore className={css(styles.icon)} />}
          </ListItem>
          <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component="a" href='/Admin/Jenis-Ikan' className={css(styles.nested)}>
                <ListItemIcon>
                  <SetMealIcon className={css(styles.icon)} />
                </ListItemIcon>
                <ListItemText primary="Jenis Ikan" />
              </ListItem>
              <ListItem button component="a" href='/Admin/Stok-Ikan' className={css(styles.nested)}>
                <ListItemIcon>
                  <StoreIcon className={css(styles.icon)} />
                </ListItemIcon>
                <ListItemText primary="Stok Ikan" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button component="a" href='/Admin/List-Order' className={css(styles.listItem)}>
            <ListItemIcon>
              <StoreIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Pemesanan" />
          </ListItem>
          <Divider />
          <ListItem button component="a" href='/Admin/Home-Page' className={css(styles.listItem)}>
            <ListItemIcon>
              <HomeIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Beranda" />
          </ListItem>
          <ListItem button component="a" href='/Admin/Gallery-Page' className={css(styles.listItem)}>
            <ListItemIcon>
              <CollectionsIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Galeri" />
          </ListItem>
          <ListItem button component="a" href='/Admin/Admin-Table' className={css(styles.listItem)}>
            <ListItemIcon>
              <AdminPanelSettingsIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Manajemen Admin" />
          </ListItem>
          <ListItem button component="a" href='/Admin/User-Table' className={css(styles.listItem)}>
            <ListItemIcon>
              <SupervisedUserCircleIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Manajemen User" />
          </ListItem>
          <ListItem button 
            component="a" 
            onClick={logout} 
            className={css(styles.listItem)}
          >
            <ListItemIcon>
              <LogoutIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </Drawer>

      {/* List untuk desktop */}
      <div className={css(styles.container)}>
        <List>
          <div className={css(styles.containers)}>
            <img src={logo} alt="logo" className={css(styles.logo)} />
            <div>
              <p className={css(styles.username)}>{username}</p>
            </div>
          </div>
          <Divider className={css(styles.divider)} />
          <ListItem button component="a" href='/Admin' className={css(styles.listItem)}>
            <ListItemIcon>
              <MonitorIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleSubmenuClick} className={css(styles.listItem)}>
            <ListItemIcon>
              <SetMealIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Manajemen Ikan" />
            {openSubmenu ? <ExpandLess className={css(styles.icon)} /> : <ExpandMore className={css(styles.icon)} />}
          </ListItem>
          <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component="a" href='/Admin/Jenis-Ikan' className={css(styles.nested)}>
                <ListItemIcon>
                  <SetMealIcon className={css(styles.icon)} />
                </ListItemIcon>
                <ListItemText primary="Jenis Ikan" />
              </ListItem>
              <ListItem button component="a" href='/Admin/Stok-Ikan' className={css(styles.nested)}>
                <ListItemIcon>
                  <StoreIcon className={css(styles.icon)} />
                </ListItemIcon>
                <ListItemText primary="Stok Ikan" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button component="a" href='/Admin/List-Order' className={css(styles.listItem)}>
            <ListItemIcon>
              <StoreIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Pemesanan" />
          </ListItem>
          <Divider className={css(styles.divider)} />
          <ListItem button component="a" href='/Admin/Home-Page' className={css(styles.listItem)}>
            <ListItemIcon>
              <HomeIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Beranda" />
          </ListItem>
          <ListItem button component="a" href='/Admin/Gallery-Page' className={css(styles.listItem)}>
            <ListItemIcon>
              <CollectionsIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Galeri" />
          </ListItem>
          <ListItem button component="a" href='/Admin/Admin-Table' className={css(styles.listItem)}>
            <ListItemIcon>
              <AdminPanelSettingsIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Manajemen Admin" />
          </ListItem>
          <ListItem button component="a" href='/Admin/User-Table' className={css(styles.listItem)}>
            <ListItemIcon>
              <SupervisedUserCircleIcon className={css(styles.icon)} />
            </ListItemIcon>
            <ListItemText primary="Manajemen User" />
          </ListItem>
        </List>
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    display: 'block',
    marginLeft: '10px',
    position: 'fixed',
    top: '10px',
    left: '10px',
    zIndex: 1100, 
    '@media (min-width: 600px)': {
        display: 'none',
    },
  },
  container: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#004080',
    position: 'fixed',
    padding: '20px 10px',
    top: 40,
    '@media (max-width: 600px)': {
      display: 'none', // Sembunyikan Sidebar di mobile
    },
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#004080',
    position: 'fixed',
    top: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
  },
  listItem: {
    color: 'white',
    '&:hover': {
      backgroundColor: '#004080',
    },
  },
  icon: {
    color: 'white',
  },
  containers: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#004080',
  },
  logo: {
    height: '50px',
    width: '40px',
    margin: '10px',
  },
  text: {
    margin: 0,
    color: 'white',
  },
  username: {
    margin: 0,
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  nested: {
    paddingLeft: '40px',
    color: 'white',
    '&:hover': {
      backgroundColor: '#000060',
    },
  },
  divider: {
    backgroundColor: 'white',
  },
});