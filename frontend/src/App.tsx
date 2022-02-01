import { Button, Alert } from 'react-bootstrap'
import './bootstrap.min.css'
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap'
import products from './products';
import HomeScreen from './screens/HomeScreen';

function App() {
  // const logo = require('./logo.svg') as string;
  return (
    <div className="App py-3">
      <Header />
      <Container>
        <HomeScreen />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
