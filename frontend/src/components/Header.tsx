import { Container, Navbar, Nav} from 'react-bootstrap';

const Header = () => {
    return (
        <header>

            <Navbar bg="dark" expand="lg" variant="dark" >
                <Container>
                    <Navbar.Brand href="#home">SHOP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="#home"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            <Nav.Link href="/signIn"><i className="fas fa-user"></i> Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
