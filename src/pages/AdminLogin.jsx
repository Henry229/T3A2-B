import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Restaurant from '../api/restaurant';
// import * as btoa from 'btoa'

const AdminLogin = () => {
  const formRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');

  const restaurant = new Restaurant();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginInfo = {
      id: idRef.current.value,
      password: passwordRef.current.value,
    };
    const { id, password } = loginInfo;
    if (id === '' || password === '') return;

    restaurant
      .adminLogin(loginInfo)
      .then((jwt) => {
        navigate(`/admin/bookmain`, { state: { jwt } });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setErrMsg('Invalid credentials');
        } else if (err.response.status === 403) {
          setErrMsg('Missing Auth');
        } else {
          setErrMsg('Login failed');
        }
      });

    formRef.current.reset();
  };

  return (
    <section>
      <p ref={errRef} aria-live='assertive'>
        {errMsg}
      </p>
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
