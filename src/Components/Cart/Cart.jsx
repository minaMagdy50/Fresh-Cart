import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { ThreeCircles } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Cart(){
  

  let {getCartItems , deleteCartItems , updateCartItems , clearCart , numberOfCartItems , setsetNumberOfCartItems} =  useContext(CartContext)
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
 async function getCartProduct(){

  let {data} =   await getCartItems()
    
    setCart(data)
    setLoading(false)
  }
  
 async function deleteCartProduct(id){
  setLoading(true)
  let {data} =   await deleteCartItems(id)
    setCart(data)
    setLoading(false)
  }
 async function clearCartproducts(){
  setLoading(true)
  let {data} =   await clearCart()
    setCart(data)
    setLoading(false)
if(data.message == "success"){
  setsetNumberOfCartItems(0)
  localStorage.removeItem('numofcartitems')


}
  }
 async function updateCartProduct(id , count){
  if (count < 1) {
    deleteCartProduct(id)
  }
  else{
    setLoading(true)
    let {data} =   await updateCartItems(id , count)
      setCart(data)
      setLoading(false)

  }

  }



  useEffect(()=>{
    
    getCartProduct()
    
  } , [])

  if (localStorage.getItem('userToken') === null) {
    return <>
     <section className='py-5 my-5'>
    <div className='text-center my-5 py-5'>
    <h2 className='text-center fw-bold py-2 text-main mt-3 '><i className="fa-solid fa-cart-shopping"></i>Shopping Cart</h2>
  
      <h2 className='pb-2'>You should Login first to show and add to cart</h2>
      <Link to={'/login'}>
      <button class="button50">
    <span class="button_lg50">
        <span class="button_sl50"></span>
        <span class="button_text50">Login Now</span>
    </span>
</button>
      </Link>
      
    </div>
  </section>
    
    </>
  }

else if (cart?.data?.totalCartPrice == undefined) {
  return <>


    <div className="container my-5 pb-5">
  <h1 className='text-center fw-bold py-2 text-main mt-3 '><i className="fa-solid fa-cart-shopping"></i>Shopping Cart</h1>
  <div className='my-5 py-5'>
    <h1 className='my-5 pb-4 text-center'>Your Cart is Empty</h1>
  </div>
  </div>
  
  </>
  
}
  else if(localStorage.getItem('userToken')){
    return <>
    <h2 className='h3 text-center py-3 fw-bold text-main'><i className="fa-solid fa-cart-shopping"></i>Shopping Cart</h2>


<section className=' container bg-main-light mt-2 mb-5'>


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
</div> : <>

<p className='fw-bold pt-4'> Total Cart items : <strong className='text-main'>{cart?.data?.totalCartPrice !== undefined? cart?.numOfCartItems : 'Your Cart is Empty'}</strong> </p>
  <p className='fw-bold'> Total Cart Price : <strong className='text-main'>{cart?.data?.totalCartPrice !== undefined? cart?.data?.totalCartPrice : '0'} EGP</strong> </p>



  {cart?.data?.products.map( (item , index) =><div key={index} className="row border-bottom border-1 p-3 align-items-center">

    <div className="col-md-1 gy-3 mb-5">
    <Link to={`/productDetails/${item.product._id}`}> 

      <div className="image">
      <img src={item.product.imageCover} className='w-100' alt={item.product.name} />
      </div>
      </Link>

    </div>
    <div className="col-md-10">
      <div className='item'>
      <Link to={`/productDetails/${item.product._id}`}> 

        <h3 className="h5 fw-bold">{item.product.title.split(' ').slice(0 , 3).join(' ')} </h3>
        </Link>

        <p className='text-main fw-bold'> Price: {item.price} EGP</p>

        <button className="btn-31">
        <span className="text-container">
          <span className="text" onClick={()=>{deleteCartProduct(item.product._id)}}> <i className='fas fa-trash-can text-danger'></i> Remove </span>
        </span>
      </button>

      </div>
    </div>

    <div className="col-md-1">
      <div className="count">
        <button onClick={()=>{updateCartProduct(item.product._id , item.count +1)}} className='btn btn-dark text-white rounded-3 py-1 px-1'>+</button>
        <span className='px-3 fw-bold'>{item.count}</span>
        <button  onClick={()=>{updateCartProduct(item.product._id , item.count -1)}}  className='btn btn-dark text-white rounded-3 py-1 px-1'>-</button>
      </div>
      
    </div>

  </div> )}
  
{cart?.data?.totalCartPrice !== undefined ?        <div className='d-flex justify-content-center py-3'>
<Link to={`/checkout/${cart?.data?._id}`}>
<div data-tooltip={`${cart?.data?.totalCartPrice} EGP` } className="button">
<div className="button-wrapper">
<div className="text">Buy Now</div>
  <span className="icon">
    <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
<path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
</svg>
  </span>
</div>
</div>


</Link>

  </div> : '' }

  {cart?.data?.totalCartPrice !== undefined ? <div className='d-flex justify-content-center' > <button onClick={()=>{clearCartproducts()}} className="btn55 p-0 px-3 py-1 mb-3"> Clear Cart
</button></div>  : ''}
  
</>}
</section>
</>

  }
 

}