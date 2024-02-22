import React from 'react'
import style from './NotFound.module.css'
import img from '../../Assits/images/vecteezy_the-page-not-found-error-404_8892186.jpg'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return <>
  
<div className='d-flex flex-column align-items-center'>

  <img src={img} className='w-100' height={550} alt="" />
  <Link to={'/'}>
  <button className='btn bg-main text-light btn-sm rounded-5 fw-bold'>Go back to home page</button>
  </Link>
  </div>  
  
  </>
}
