import React from 'react'
import style from './CatogrySlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from 'react-slick';

export default function CatogrySlider() {

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows:true
  };

  
  function getCatogrys(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  
  }

 let {data} =  useQuery('categories' , getCatogrys)


  return <>
  
  <div className="row container mx-auto">
  <Slider {...settings}>
  {data?.data.data.map( category => <div key={category._id} className='col-md-2 '>
  <div className="img">
  <img src={category.image} className='w-100' height={200} alt={category.name} />
  <p className='fw-bold text-center text-capitalize'>{category.name}</p>
  </div>
  </div>)}
  </Slider>

  </div>

  
  </>
}
