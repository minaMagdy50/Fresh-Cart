import React from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { ThreeCircles } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Categories() {




  function getCatagories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    
  }


  let {data , isError , isFetching , isLoading} =  useQuery('Catagoriss' , getCatagories)


console.log(data);

  return <>
  {isLoading? <div className='loading'>      
  <ThreeCircles
  visible={true}
  height="150"
  width="150"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

    </div> : <div className='container'>
    <h2 className='h1 text-center fw-bold text-main my-3'><i className="fa-solid fa-table-cells-large"></i>category</h2>

  <div className="row">
    {data?.data.data.map( catagory => 
      <div key={catagory._id} className='col-lg-3 col-6 pt-5'>      
<div className="flip-card w-100">
    <div className="flip-card-inner">
        <div className="flip-card-front">
            <img src={catagory.image} className='rounded-4  h-100' alt="" />
        </div>
        <div className="flip-card-back">
            <p className="title">{catagory.name}</p>
        </div>
    </div>
</div>

      </div>
  
      
      )}
  </div>
    </div>}
  
  </>
}
