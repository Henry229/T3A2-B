import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/fetch_res';
import Loader from '../components/loader/Loader';

const AdminLogin = () => {
  const formRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = {
      id: idRef.current.value,
      password: passwordRef.current.value,
    };
    const { id, password } = loginInfo;
    if (id === '' || password === '') return;

    setLoading(true);
    const result = await adminLogin(loginInfo);
    setLoading(false);
    if (result.errorData?.message) {
      setErrMsg('Wrong admin ID or Password provided');
    } else if (result.jwt) {
      navigate('/admin/bookmain', { state: { result } });
    } else setErrMsg('Server error failed login\nPlease try again');
    formRef.current.reset();
  };

  return (
    <section className='w-full flex flex-col max-w-sm mx-auto mt-16 bg-gray-300 shadow-md rounded'>
      {loading && <Loader />}
      <h2 className='flex justify-center my-4 font-bold text-2xl text-gray-800'>
        Login
      </h2>
      <p
        ref={errRef}
        aria-live='assertive'
        className='text-red-500 font-bold ml-5'
      >
        {errMsg}
      </p>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='flex flex-col px-8 pt-6 pb-8 mb-4 text-lg text-gray-800'
      >
        <label htmlFor='loginId' className=' font-bold'>
          ID
        </label>
        <input
          ref={idRef}
          type='text'
          id='loginId'
          className='my-2 py-1 pl-3 text-gray-800 text-lg rounded-md border-0 outline-0'
        />
        <label htmlFor='password' className='mt-4 font-bold'>
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
    </section>
  );
};

export default AdminLogin;
