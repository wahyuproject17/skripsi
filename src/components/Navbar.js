import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../pages/UserContext'; // Pastikan path sesuai
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import { logo } from '../assets';

function NavbarMain() {
  const { username, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const location = useLocation();

  const handleMouseEnterTentang = () => {
    setShowDropdown(true);
  };

  const handleMouseLeaveTentang = () => {
    setShowDropdown(false);
  };

  const handleMouseEnterUser = () => {
    setShowUserDropdown(true);
  };

  const handleMouseLeaveUser = () => {
    setShowUserDropdown(false);
  };

  const isActive = (path) => location.pathname === path;

  const handleNavLinkClick = () => {
    setIsNavbarCollapsed(true); // Tutup menu saat navigasi
  };

  const handleNavbarToggle = () => {
    setIsNavbarCollapsed((prevState) => !prevState);
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{ backgroundColor: '#000060', position: 'fixed', width: '100%', zIndex: '1050' }}
        variant="dark"
        expanded={!isNavbarCollapsed}
      >
        <Container>
          <img src={logo} alt="logo" width="40" height="50" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleNavbarToggle} />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ backgroundColor: '#000060' }}
            className="justify-content-center justify-content-lg-start"
          >
            <Nav
              className="flex-column flex-lg-row text-center text-lg-start"
              style={{ backgroundColor: '#000060' }}
            >
              <Nav.Link
                className={`nav-link-custom ${isActive('/Home') ? 'active-link' : ''}`}
                href="/Home"
                style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginLeft: '20px' }}
                onClick={handleNavLinkClick}
              >
                Beranda
              </Nav.Link>
              <div
                className={`nav-link-custom ${isActive('/Profile') || isActive('/Location') ? 'active-link' : ''}`}
                onMouseEnter={handleMouseEnterTentang}
                onMouseLeave={handleMouseLeaveTentang}
                style={{ position: 'relative' }}
              >
                <Nav.Link
                  href="#"
                  style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginLeft: '20px' }}
                >
                  Tentang
                </Nav.Link>
                {showDropdown && (
                  <NavDropdown
                    title=""
                    id="profile-nav-dropdown"
                    className="nav-link-custom navbar-dropdown"
                    show={showDropdown}
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      zIndex: '1050',
                      backgroundColor: '#000060',
                    }}
                  >
                    <NavDropdown.Item href="/Profile">Profil</NavDropdown.Item>
                    <NavDropdown.Item href="/Location">Lokasi</NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
              <Nav.Link
                className={`nav-link-custom ${isActive('/Shop') ? 'active-link' : ''}`}
                href="/Shop"
                style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginLeft: '20px' }}
                onClick={handleNavLinkClick}
              >
                Belanja
              </Nav.Link>
              <Nav.Link
                className={`nav-link-custom ${isActive('/Gallery') ? 'active-link' : ''}`}
                href="/Gallery"
                style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginLeft: '20px' }}
                onClick={handleNavLinkClick}
              >
                Galeri
              </Nav.Link>
            </Nav>
            <Nav
              className="navbar-sign-in"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: '10px' }}
            >
              {username ? (
                <div
                  className="nav-link-custom"
                  onMouseEnter={handleMouseEnterUser}
                  onMouseLeave={handleMouseLeaveUser}
                  style={{ position: 'relative' }}
                >
                  <Nav.Link
                    href="#"
                    style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}
                  >
                    <FontAwesomeIcon icon={faSignOut} style={{ marginRight: '10px' }} />
                    {username}
                  </Nav.Link>
                  {showUserDropdown && (
                    <NavDropdown
                      title=""
                      id="user-nav-dropdown"
                      className="nav-link-custom navbar-dropdown"
                      show={showUserDropdown}
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '1050',
                        backgroundColor: '#000060',
                      }}
                    >
                      <NavDropdown.Item as={Link} to="/User" onClick={handleNavLinkClick}>
                        Ubah Profil
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/Password" onClick={handleNavLinkClick}>
                        Ubah Password
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/History" onClick={handleNavLinkClick}>
                        Riwayat Pesanan
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  )}
                </div>
              ) : (
                <Nav.Link
                  className="nav-link-custom"
                  href="/login"
                  style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}
                >
                  <FontAwesomeIcon icon={faSignIn} style={{ marginRight: '10px' }} />
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMain;
