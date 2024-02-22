import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate} from 'react-router-dom'
import Logo from '../../Assits/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'



export default function Navbar() {

  let navigate =  useNavigate()

  let {userToken , setUserToken} = useContext(UserContext)

  function logOut (){
    toast.success('Bye', {
      icon:'😭'
    })
    setUserToken(null)
    localStorage.removeItem('userToken')
    navigate('/login')
    
  }

 let {numberOfCartItems , setsetNumberOfCartItems} =  useContext(CartContext)

 let localStorageCartItems = localStorage.getItem('numofcartitems')

  return <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    {localStorage.getItem('userToken')? <Link className="navbar-brand"  to={''}>
      <img src={Logo} alt="Logo"/>
    </Link> : <Link className="navbar-brand"  to={'login'}>
      <img src={Logo} alt="Logo"/>
    </Link> }
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userToken != null ? <>
        <ul className="navbar-nav fw-bold ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to={''}>Home</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link" to={'products'}>Products</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link" to={'categories'}>Categories</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link" to={'brands'}>Brands</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link" to={'wishlist'}> Wishlist</Link>
        </li> 
        <li className="nav-item fw-bold">
          <Link to={'cart'} className="nav-link text-warning fw-bold">{localStorageCartItems} <i className="fa-solid fa-cart-shopping text-warning"> </i></Link>
        </li> 
      </ul>
      </> : ''  }
      
    
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-bold">
         <li className='nav-item d-flex align-items-center'>
          <i className='fab fa-facebook pe-2 cursor-pointer '></i>
          <i className='fab fa-instagram pe-2 cursor-pointer '></i>
          <i className='fab fa-twitter pe-2 cursor-pointer '></i>
          <i className='fab fa-youtube pe-2 cursor-pointer '></i>
         </li>
         {userToken != null ? <>
          <li className="nav-item fw-bold">
          <button className="nav-link" onClick={logOut}>Logout</button>
        </li> 
         </> : <>
         <li className="nav-item fw-bold">
          <Link className="nav-link" to={'login'}>login</Link>
        </li> 
        <li className="nav-item fw-bold">
          <Link className="nav-link" to={'register'}>Register</Link>
        </li> 
      
         </>}
       
      </ul>
    </div>
  </div>
</nav>
}