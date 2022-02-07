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

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
