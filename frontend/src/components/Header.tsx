import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../reducers';
import { LinkContainer } from 'react-router-bootstrap';
import { signOutAction } from '../actions/userAction';
import { PlaceOrder, AddToCart } from '../constants';

const Header = () => {


    const dispatch = useDispatch()
    const { user } = useSelector((state: State) => state.userSignIn)

    const signOutHandler = () => {
        dispatch(signOutAction())
        dispatch({ type: PlaceOrder.RESET })
        dispatch({ type: AddToCart.RESET })

    }

    return (
        <header>

            <Navbar bg="dark" expand="lg" variant="dark" >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >SHOP</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link ><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {user !== null
                                ?
                                <NavDropdown title={user.name} id="navbarScrollingDropdown">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item >Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={signOutHandler}>Sign out</NavDropdown.Item>
                                </NavDropdown>
                                :
                                <LinkContainer to="/signIn">
                                    <Nav.Link ><i className="fas fa-user"></i> Sign In</Nav.Link>
                                </LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
