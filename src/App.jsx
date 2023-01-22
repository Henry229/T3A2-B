import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {
  const [text, setText] = useState('');

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
