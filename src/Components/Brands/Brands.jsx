import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThreeCircles } from 'react-loader-spinner'

export default function Brands() {
  const [loading, setLoading] = useState(true)

  const [brands, setBrands] = useState([])

  async function getBrands(){
    setLoading(true)
   let {data}  = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`) 
   setBrands(data.data)
   setLoading(false)


  }





useEffect(()=>{
  getBrands()
} , [])


  return <>
  {loading ? <div className='loading'>      
  <ThreeCircles
  visible={true}
  height="150"
  width="150"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> </div> :   <div className="container" id='demo'>
  <h2 className='text-center py-3 fw-bold fs-1  text-main' >All Brands</h2>
  <div className="row g-md-5 gy-3 w-100">
  {brands.map((brand , index) => <div key={index} className="col-md-2 col-6">
    {/* <Link to={`/brandDetails/${brand._id}`}> */}
    <div className="card">
<div className="first-content">
  <img src={brand.image} className='w-100 h-100 rounded-3' />
</div>
<div className="second-content">
<span>{brand.name}</span>
</div>


</div>
    {/* </Link> */}

    </div>)}
  </div>
</div>}




  
  </>
}
