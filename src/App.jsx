import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {
  /**  * this is test for showing popup comment **/
  const hello = () => {
    console.log('hello');
  };
  hello();
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
