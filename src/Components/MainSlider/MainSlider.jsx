import React from 'react'
import style from './MainSlider.module.css'
import img1 from '../../Assits/images/slider-image-1.jpeg'
import img2 from '../../Assits/images/slider-image-2.jpeg'
import img3 from '../../Assits/images/slider-image-3.jpeg'
import img5 from '../../Assits/images/grocery-banner.png'
import img6 from '../../Assits/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'



export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed: 2000 
  };


  return <>
    <div className="row container p-2 mx-auto my-4 g-0 ">
    <div className="col-md-12 ">
    <Slider {...settings}>
      <img src={img1} className='w-100' height={350} alt="img-1" />
      <img src={img2} className='w-100' height={350} alt="img-1" />
      <img src={img3} className='w-100' height={350} alt="img-1" />
    </Slider>
    </div>
  </div>

  </>
}
