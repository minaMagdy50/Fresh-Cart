import React, { useEffect, useState } from 'react'
import style from './SubCategory.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

export default function SubCategory() {
const [loading, setLoading] = useState(false)
const [subcategory, setsubCategory] = useState([])


  async function getsubCatagories(){
    setLoading(true)
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories`)
    console.log(data.data);
    setsubCategory(data?.data)
    setLoading(false)
  }

  useEffect(()=>{
    getsubCatagories()
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

    </div> :   <div className="container py-5">
  <div className="row gy-3">
    {subcategory.map( (cateogry , index) => <div key={index} className="col-md-3">    
    <Link to={`/specificsubsategory/${cateogry._id}`}>
    <div className="card255">
    <div className="card-img255"></div>
      <div className="card-info255">
        <div className="card-text255">
          <p className="text-title255">{cateogry.name}</p>
        </div>
        <div className="card-icon255">
          <svg className="icon255" viewBox="0 0 28 25">
            <path d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"></path>
          </svg>
        </div>
      </div>
    </div>
    
    </Link>

  
  
    </div>)}

   
      

 
    </div>

  </div>}

  
  </>
}
