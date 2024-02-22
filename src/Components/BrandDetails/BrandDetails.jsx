// import React, { useEffect, useState } from 'react'
// import style from './BrandDetails.module.css'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'

// export default function BrandDetails() {
//   const [details, setDetails] = useState({})
//  let {id} =  useParams()
 
// async function getBrandsDetailes(id){

//   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)

//   setDetails(data)

//   }
//   useEffect(()=>{
//     getBrandsDetailes(id)
//   },[])

//   console.log(details.data);    

//   return <>
//   <div className="container py-5 d-flex justify-content-center mt-5">
//     <div className="row py-5 shadow w-50">

//     <div className="col-md-6  mt-5">
//       <img src={details?.data?.image} className='w-75' alt={details?.data?.name}  />
//     </div>
//     <div className="col-md-6 d-flex justify-content-center align-items-center">
//       <h1 className='mt-5 fw-bold '>{details?.data?.name}</h1>
//     </div>
//     </div>
 
//   </div>

  
//   </>
// }
