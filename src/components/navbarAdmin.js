import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Logout from '@mui/icons-material/Logout';
import { useUser } from '../pages/UserContext';

export default function NavbarAdmin() {
  const { logout } = useUser();

  return (
    <>
      <Navbar
        expand="md"
        className="navbar-custom"
        style={{
          height: '60px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Container fluid>
          {/* Navbar Brand */}
          <Navbar.Brand
            href="#"
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#FFD700',
              textAlign: 'left',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexGrow: 1,
              '@media (max-width: 600px)': {
                textAlign: 'center',
                },
            }}
            className="text-center"
          >
          </Navbar.Brand>

          {/* Navbar Menu - Hanya tampil di desktop */}
          <Nav className="d-none d-md-flex">
            <Nav.Link
              onClick={logout}
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'red';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#ffffff';
              }}
            >
              <Logout
                style={{
                  marginRight: '8px',
                  color: 'inherit',
                }}
              />
              Sign out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Spacer to Avoid Content Overlap */}
      <div style={{ marginTop: '60px' }}></div>

      {/* Custom CSS */}
      <style jsx>{`
        .navbar-custom {
          background-color: #f8f9fa;
        }

        @media (min-width: 768px) {
          .navbar-custom {
            background-color: #212529;
          }
        }
      `}</style>
    </>
  );
}