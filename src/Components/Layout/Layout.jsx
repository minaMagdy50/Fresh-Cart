import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Navigate, Outlet } from 'react-router-dom'
import { Offline, Online } from 'react-detect-offline'

export default function Layout() {

  return <>

  <Navbar/>
  <Offline><div className='loading'> <h2 className='fw-bold'>You’re Offline. Check Your Connection </h2></div></Offline>
  <Outlet></Outlet>
 
  <Footer/> 
  </>
}
