import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { ListaContext } from '../../Context/ListContext'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { ThreeCircles } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Wishlist() {
  
  let  {getWishList , deleteWishlistItem , setDataOfWishProducts , dataOfWishProducts }  =  useContext(ListaContext)
  let {addToCart ,   setsetNumberOfCartItems  } =  useContext(CartContext)


  const [loading, setLoading] = useState(true)

  

  async function postToCart(id){
   let {data} = await addToCart(id)
   setsetNumberOfCartItems(data.numOfCartItems)
   localStorage.setItem('numofcartitems' , data.numOfCartItems)
   if (data.status == 'success') {
     toast.success('Successfully added to cart' , {
       duration: 2000,
       icon: '✌️',
     })
   }
  }






 const [wishlist, setWishlist] = useState({})

  async function getWishListProducts(){

  let {data} =   await getWishList()
  setWishlist(data)
  setLoading(false)

  }


  useEffect(()=>{
    getWishListProducts()

  },[])

  async function deleteWishlistItems(id){
    setLoading(true)

    let {data} = await deleteWishlistItem(id)
    await  getWishListProducts()
    setLoading(false)

    
   }

if (wishlist?.count ==  0 ) {
  return <>
  
  <div className="container my-5 pb-5">
  <h1 className='text-center fw-bold py-4 text-main mt-3 '><i className="fa-solid fa-hand-holding-heart"></i>Wish List</h1>
  <div className='my-5 py-5'>
    <h1 className='my-5 text-center'>Your Wish List is Empty</h1>
  </div>
  </div>

  </>
}
else if (localStorage.getItem('userToken')) {
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
  /> </div> :   <div className="container pb-5">
    <h1 className='text-center fw-bold py-2 text-main mt-3 '><i className="fa-solid fa-hand-holding-heart"></i>Wish List</h1>
  {wishlist?.data.map((list , index) => <div key={index} className="row shadow my-3 align-items-center mb-5">

    <div className="col-md-2">
    <Link to={`/productDetails/${list.id}`}> 
      <img src={list.imageCover} className='w-100' />
      </Link>

    </div>

    <div className="col-md-10">
    <Link to={`/productDetails/${list.id}`}> 

      <h2 className='h5 fw-bold'>{list.title}</h2>
      </Link>

      <p>{list.description}</p>
      <h5 className='font-sm'>{list?.brand?.name}</h5>
      <h5 className='fs-6  text-main'>{list.price} EGP</h5>
      <p>In Stock : {list.quantity}</p>
      <p><i className="fa-solid fa-star rating-color"></i>{list.ratingsAverage}</p>
      <button onClick={()=>{postToCart(list.id)}} className='btn btn-sm bg-main text-light rounded-4 my-2 me-2'> <i className="fa-solid fa-cart-plus"></i></button>
      <button onClick={()=>{deleteWishlistItems(list.id)}} className='btn btn-sm bg-danger text-light rounded-4 my-2'> <i className="fa-solid fa-trash-can"></i></button>
    </div>


  </div>

  )}
  </div>
  
  }

  </>
}
else {
  return <>
  <section className='py-5 my-5'>
    <div className='text-center my-5 py-5'>
    <h1 className='text-center fw-bold pb-2 text-main'><i className="fa-solid fa-hand-holding-heart"></i>Wish List</h1>
  
      <h2 className='pb-2'>You should Login first to show and add to wishlist</h2>
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







}
