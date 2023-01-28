import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/fetch_res';

const AdminLogin = () => {
  const formRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const {
    isLoading,
    isError,
    data: loginInfo,
  } = useQuery({
    queryKey: ['id', id],
    queryFn: handleSubmit,
  });

  if (isLoading) <p>Loading...</p>;
  if (isError) <p>Error: {Error.message}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = {
      id: idRef.current.value,
      password: passwordRef.current.value,
    };
    const { id, password } = loginInfo;
    if (id === '' || password === '') return;

    const {
      status,
      fetchStatus,
      data: jwt,
    } = useQuery({
      quekey: ['login', id],
      queryFn: adminLogin(loginInfo),
      enabled: !!loginInfo,
    });

    // const jwt = await adminLogin(loginInfo);

    data.jwt
      ? navigate('/admin/bookmain', { state: { jwt } })
      : setErrMsg('failed login');

    // .then((jwt) => {
    //   navigate(`/admin/bookmain`, { state: { jwt } });
    // })
    // .catch((err) => {
    //   console.log(err);
    //   if (err.response.status === 401) {
    //     setErrMsg('Invalid credentials');
    //   } else if (err.response.status === 403) {
    //     setErrMsg('Missing Auth');
    //   } else {
    //     setErrMsg('Login failed');
    //   }
    // });

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
