import React from 'react'
import ReactLoading from 'react-loading'
import './loader.css'


const Loader = () => {
  return (
    <ReactLoading className = 'loader' type='bars' color='#f6ae2d' width='110px'/>
  )
}

export default Loader