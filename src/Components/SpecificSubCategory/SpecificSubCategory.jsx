import React, { useEffect, useState } from 'react'
import style from './SpecificSubCategory.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { ThreeCircles } from 'react-loader-spinner'

export default function SpecificSubCategory() {
  const [loading, setLoading] = useState(false)

  let {id} =  useParams()
  const [data, setData] = useState({})
  async function getspacficSubCategory(id){
    setLoading(true)
  let {data} =     await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories/${id}`)
    setData(data.data)
    setLoading(false)
  }

  useEffect(()=>{
    getspacficSubCategory(id)
  },[])




  return <>
    {loading? <div className='loading'>      
  <ThreeCircles
  visible={true}
  height="150"
  width="150"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

    </div> :  <div className="container d-flex justify-content-center align-items-center py-5 my-5">
  <div class="card300 shadow">
  <div class="card-info300">
    <h3>{data.name}</h3>
  </div>
  <Link class="button300" to={'/products'} >Continue shopping</Link>
</div>
  </div>}
 
  
  </>
}
