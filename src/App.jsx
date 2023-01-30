import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { JwtProvide } from './context/jwtContext';

function App() {
  return (
    <>
      <Header />
      <JwtProvide>
        <Outlet />
      </JwtProvide>
      <Footer />
    </>
  );
}

export default App;
