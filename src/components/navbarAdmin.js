import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Logout from '@mui/icons-material/Logout';
import { useUser } from '../pages/UserContext'; // Make sure the path is correct

export default function NavbarAdmin() {
  const { logout } = useUser();

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      style={{
        height: '60px', // Adjust the height as needed
        position: 'fixed', // Makes the navbar stay at the top
        top: 0, // Position it at the top
        left: 0, // Align it to the left
        right: 0, // Align it to the right
        zIndex: 1000, // Ensure it stays on top of other elements
      }}
    >
      <Container>
        <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
          style={{
            backgroundColor: '#212429',
          }}
        >
          <Nav className="ml-auto">
            <Nav.Link
              onClick={logout}
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Logout style={{ marginRight: '10px' }} />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
