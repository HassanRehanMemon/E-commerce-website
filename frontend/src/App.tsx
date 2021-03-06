import './bootstrap.min.css'
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  // const logo = require('./logo.svg') as string;
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>

            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/' element={<CartScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/signIn' element={<SignIn />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeOrder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/admin/users' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/products' element={<ProductListScreen />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/admin/orders' element={<OrderListScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
