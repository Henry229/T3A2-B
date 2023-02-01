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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = {
      id: idRef.current.value,
      password: passwordRef.current.value,
    };
    const { id, password } = loginInfo;
    if (id === '' || password === '') return;

    const result = await adminLogin(loginInfo);
    if (result.errorData?.message == 'Response : Unauthorized') {
      setErrMsg('Wrong ID or Password!');
    } else if (result.jwt) {
      navigate('/admin/bookmain', { state: { result } });
    } else setErrMsg('Server error failed login\nPlease try again');

    // .then((jwt) => {
    //   navigate(`/admin/bookmain`, { state: { jwt } });
    // })
    // .catch((err) => {
    //   console.log(err);
    //   if (err.response.status === 401) {
    //   } else if (err.response.status === 403) {
    //     setErrMsg('Missing Auth');
    //   } else {
    //     setErrMsg('Login failed');
    //   }
    // });

    formRef.current.reset();
  };

  return (
    <section className='w-full flex flex-col max-w-sm mx-auto mt-16 bg-gray-300 shadow-md rounded'>
      <h2 className='flex justify-center my-4 font-bold text-2xl text-gray-800'>
        Login
      </h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='flex flex-col px-8 pt-6 pb-8 mb-4 text-lg text-gray-800 font-bold'
      >
        <label htmlFor='loginId'>ID</label>
        <input
          ref={idRef}
          type='text'
          id='loginId'
          className='my-2 py-1 pl-3 text-gray-800 text-lg rounded-md border-0 outline-0'
        />
        <label htmlFor='password' className='mt-4'>
          password
        </label>
        <input
          ref={passwordRef}
          type='password'
          id='password'
          className='my-2 py-1 pl-3 text-gray-800 text-lg rounded-md border-0 outline-0'
        />
        <button className='w-56 h-12 p-3 mt-6 mx-auto rounded-lg bg-indigo-500 text-xl text-gray-50'>
          Login
        </button>
      </form>
      <p ref={errRef} aria-live='assertive'>
        {errMsg}
      </p>
    </section>
  );
};

export default AdminLogin;
