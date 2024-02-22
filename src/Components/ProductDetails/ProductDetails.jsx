import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { InfinitySpin, ThreeCircles } from 'react-loader-spinner'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'


export default function ProductDetails() {
  let {addToCart , setsetNumberOfCartItems ,numberOfCartItems } =  useContext(CartContext)


  async function postToCart(id){
   let {data} = await addToCart(id)
    setsetNumberOfCartItems(data.numOfCartItems)
   localStorage.setItem('numofcartitems'  , data.numOfCartItems)
   if (data.status == 'success') {
     toast.success('Successfully added to cart' , {
       duration: 2000,
       icon: '✌️',
     })
   }

  }

  var settings = {
    dots: false,
    autoplay:true,
    infinite: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };
  
  let {id} = useParams()
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)

  async function getProductsDetails(id){

    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    
    setDetails(data.data)
    console.log(data);
    setLoading(false)


  }
  
  useEffect(()=>{
    getProductsDetails(id)
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

    </div>:  <section className='container'>
  <div className="row py-4  align-items-center">
    <div className="col-md-4 pe-4">
    <Slider {...settings}>
      {details.images.map( (image , index) => <img src={image} key={index} alt={details.title} className='w-100 p-3'/>  )}
    </Slider>

    
        
      </div>
    <div className="col-md-8">
      
              <h3 className='h5'>{details.title}</h3>
              <p className='text-muted py-2'>{details.description}</p>
              <span className='font-sm text-main'>{details.category.name}</span>

              <div className="d-flex justify-content-between align-items-center py-2">

             <span>{details.price} EGP</span>
            <span>{details.ratingsAverage} <i className="fa-solid fa-star rating-color"></i> </span>
              </div>
              <button className='btn w-100 btn-sm bg-main text-light' onClick={()=>{postToCart(details.id)}}>Add to Cart</button>

    </div>
  </div>
</section>

}


  </>
}
