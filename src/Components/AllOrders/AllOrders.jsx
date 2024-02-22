import React, { useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { ThreeCircles } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function AllOrders() {

  const [tokenId, setTokenId] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  let token = localStorage.getItem('userToken')
  let decode = jwtDecode(token)


  function code(){
    setTokenId(decode.id)

  }









  async function getUserOrders(tokenId){
    setLoading(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${tokenId}`)
    setOrders(data);
    setLoading(false)
  }



  useEffect(()=>{
    code()
    getUserOrders(decode.id)
  },[])


console.log(orders);

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
 </div> : <div className="container py-5">
  {orders.map(order => <div key={order.id} className="row shadow pb-5">
    <h2 className='text-center text-main fw-bold py-3'>Your Order</h2>
    <p className='text-center'> <strong className='text-main'>Address :</strong> {order.shippingAddress.details}</p>
    <p className='text-center'> <strong className='text-main'> phone Number :</strong>{order.shippingAddress.phone}</p>
    <p className='text-center'> <strong className='text-main'> payment Method : </strong>{order.paymentMethodType}</p>
    <p className='text-center'> <strong className='text-main'> total order Price : </strong>{order.totalOrderPrice} EGP</p>
    {order.cartItems.map( item =>  <div className="col-md-6 border-end border-bottom py-4 gy-md-0 gy-4">
      <div className="orderpoduct">
      <Link to={`/productDetails/${item.product.id}`}> <div key={item._id} className='d-flex align-items-center'>
   <img src={item.product.imageCover} className='w-25' alt="" />
    <div>
    <h3 className='fw-bold h6'>{item.product.title}</h3>
    <p className='font-sm'>{item.product.brand.name}</p>
    <p className='font-sm'><i class="fa-solid fa-star rating-color"></i>{item.product.ratingsAverage}</p>
    <p className='font-sm text-main'> <strong className='text-black fs-6'>price:</strong> {item.price} EGP</p>
    </div>

  </div></Link>
      </div>
   
  </div>)}


  </div>)}

 </div> }
  
  
  
  </>
}
