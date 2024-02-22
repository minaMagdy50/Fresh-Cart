import React from 'react'
import style from './Footer.module.css'
import svg from '../../Assits/images/cod-en.svg'
import svg1 from '../../Assits/images/card-mastercard.svg'
import svg2 from '../../Assits/images/card-visa.svg'
import svg3 from '../../Assits/images/valu_v2.svg'
import svg4 from '../../Assits/images/2.svg'
import logo from '../../Assits/images/freshcart-logo.svg'
export default function Footer() {
  return <>
  <div className=' bg-main-light text-center py-5 p-5 mt-3'>

  <div className="container py-4">
    <div className="row align-items-center">
      <div className="col-md-4 ">
        <p className='fw-bolder'>© 2024 fresh Market. All rights reserved</p>
      </div>
      <div className="col-md-4 d-flex justify-content-evenly">
      <img src={svg} className='p-2' alt="" />  
      <img src={svg1} alt="" />  
      <img src={svg2} alt="" />  
      <img src={svg3} alt="" />  
      <img src={svg4} alt="" />  
         </div>
         <div className="col-md-4 m-md-0 mt-2">
          <img src={logo} alt="" />
         </div>
    </div>
  </div>
  
  </div>

  
  </>
}
