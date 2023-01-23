import React, { useRef } from 'react';
import Restaurant from '../api/restaurant';

const AdminLogin = () => {
  const formRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();

  const restaurant = new Restaurant();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginInfo = {
      id: idRef.current.value,
      password: passwordRef.current.value,
    };
    const { id, password } = loginInfo;
    if (id === '' || password === '') return;
    restaurant.adminLogin(loginInfo);
    formRef.current.reset();
  };
  return (
    <section>
      <h2>Login</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor='loginId'>ID</label>
        <input ref={idRef} type='text' id='loginId' />
        <label htmlFor='password'>password</label>
        <input ref={passwordRef} type='password' id='password' />
        <button>Login</button>
      </form>
    </section>
  );
};

export default AdminLogin;
