import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../pages/UserContext'; // Pastikan path sesuai
import { Link } from 'react-router-dom';
import '../App.css';
import { logo } from '../assets';

function NavbarMain() {
  const { username, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

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

  return (
    <>
    <Navbar
      expand="lg"
      style={{ backgroundColor: '#000060', position: 'fixed', width: '100%', zIndex: '1000' }}
      variant="dark"
    >
      <Container>
        <img src={logo} alt="logo" width="40" height="50" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ backgroundColor: '#000060' }} className="justify-content-end">
          <Nav className="me-auto" style={{ backgroundColor: '#000060' }}>
            <Nav.Link
              className="nav-link-custom"
              href="/Home"
              style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginLeft: '30px' }}
            >
              Beranda
            </Nav.Link>
            <div 
              className="nav-link-custom" 
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
                  style={{ position: 'unset', top: '100%', left: '0', zIndex: '100', backgroundColor: '#000060' }}
                >
                  <NavDropdown.Item href="/Profile">Profil</NavDropdown.Item>
                  <NavDropdown.Item href="/Location">Lokasi</NavDropdown.Item>
                </NavDropdown>
              )}
            </div>
            <Nav.Link
              className="nav-link-custom"
              href="/Shop"
              style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginLeft: '20px' }}
            >
              Belanja
            </Nav.Link>
            <Nav.Link
              className="nav-link-custom"
              href="/Gallery"
              style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginLeft: '20px' }}
            >
              Galeri
            </Nav.Link>
          </Nav>
          <Nav style={{ backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: '10px' }}>
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
                      position: 'unset', top: '100%', left: '0', zIndex: '100', backgroundColor: '#000060'
                    }}
                  >
                    <NavDropdown.Item as={Link} to="/History">Riwayat Pesanan</NavDropdown.Item>
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
