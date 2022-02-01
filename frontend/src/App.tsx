import { Button, Alert } from 'react-bootstrap'
import './bootstrap.min.css'
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap'
import products from './products';

function App() {
  // const logo = require('./logo.svg') as string;
  return (
    <div className="App py-3">
      <Header />
      <Container>
        {products.map((product) => {
          return (<div>{product.name} <br /></div>);
        })}
        Hello World
        <Button className="btn btn-block">Buttons</Button>

      </Container>
      <Footer />
    </div>
  );
}

export default App;
