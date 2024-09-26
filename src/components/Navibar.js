import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Navibar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/#/">Gestion de Ayudas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#/menu">Busqueda por Menu</Nav.Link>
            <Nav.Link href="/#/documentos">Eventos</Nav.Link>
            <Nav.Link href="/#/documentos">Documentos</Nav.Link>
            <Nav.Link href="/#/documentos">Faq</Nav.Link>
            <Nav.Link href="/#/sprints">Sprint</Nav.Link>
            <Nav.Link href="/#/compilaciones">Seguimiento de Cambios</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;
