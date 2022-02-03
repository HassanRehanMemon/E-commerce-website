import './bootstrap.min.css'
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';

function App() {
  // const logo = require('./logo.svg') as string;
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Router>
          <Container>
            <Routes>

              <Route path='/' element={<HomeScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />

            </Routes>
          </Container>
        </Router>
      </main>
      <Footer />
    </div>
  );
}

export default App;
