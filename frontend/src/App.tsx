import { Button, Alert } from 'react-bootstrap'
import './bootstrap.min.css'
import Footer from './components/Footer';
import Header from './components/Header';
function App() {
  // const logo = require('./logo.svg') as string;
  return (
    <div className="App py-3">
      <Header />
      Hello World
      <Button className="btn btn-block">Buttons</Button>
      <Footer />
    </div>
  );
}

export default App;
