import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Homescreen from './screen/Homescreen';
import Productscreen from './screen/Productscreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/esm/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import { useContext } from 'react';
import {Store} from './Store';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import { NavDropdown } from 'react-bootstrap';
import {ToastContainer} from 'react-toastify';
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import 'react-toastify/dist/ReactToastify.css';
import SignupScreen from './screen/SignupScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceorderScreen from './screen/PlaceorderScreen';
import OrderScreen from './screen/OrderScreen';
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import ProfileScreen from './screen/ProfileScreen';


function App(){
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} = state;

  const signOutHandler = () =>{
    ctxDispatch({type: 'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin';
  }
  return(
    <BrowserRouter>
    <div className = "d-flex flex-column site-container">
      <ToastContainer position = "bottom-center" limit = {1}/>
      <Navbar bg = "dark" variant = "dark" expand = "lg">
        <Container>
          <LinkContainer to = "/">
              <Navbar.Brand> Trendify</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id = "basic-navbar-nav">
          <Nav className = "me-auto w-100 justify-content-end">
            <Link to = "/cart" className = "nav-link">
              Cart {cart.cartItems.length > 0 && (
                <Badge pill bg = "danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
                {userInfo ? (
                  <NavDropdown title = {userInfo.name} id = "basic-nav-dropdown">
                    <LinkContainer to = "/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to = "/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider/>
                      <Link to = "#signout" className = "dropdown-item" onClick = {signOutHandler}>Sign Out</Link>
                  </NavDropdown>
                ): (
                  <Link className = "nav-link" to = "/signin">
                      Sign In
                  </Link>
                )}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Container className = "mt-3">
          <Routes>
            <Route path = "/" element = {<Homescreen />} />
            <Route path = "/cart" element = {<CartScreen />} />
            <Route path = "/signin" element = {<SigninScreen />} />
            <Route path = "/signup" element = {<SignupScreen />} />
            <Route path = "/profile" element = {<ProfileScreen />} />
            <Route path = "/shipping" element = {<ShippingAddressScreen />} />
            <Route path = "/payment" element = {<PaymentMethodScreen />} />
            <Route path = "/placeorder" element = {<PlaceorderScreen />} />
            <Route path = "/product/:slug" element = {<Productscreen />}/>
            <Route path = "/order/:id" element = {<OrderScreen />}/>
            <Route path= "/orderhistory" element = {<OrderHistoryScreen />}/>
          </Routes>
        </Container>
      </main>
      <footer>
     <div className="text-center mt-4 p-3" style={{ backgroundColor: '#f8f9fa', color: '#555' }}>
  &copy; 2025 Blessed Siden. All rights reserved.
</div>

      </footer>
    </div>
    </BrowserRouter>
  )
}

export default App;