import React, { useContext, useEffect, useState } from 'react'
import style from './FetcherProduct.module.css'
import axios from 'axios'
import { ThreeCircles } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { ListaContext } from '../../Context/ListContext'

export default function FetcherProduct() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  let {addProductToLista}  = useContext(ListaContext)






  const [post, setPost] = useState([])




  function getPosts(e){
    setPost(data?.data.data.filter( obj => obj.title.split(" ").slice(0,2).join(" ").toLowerCase().includes(e.target.value.toLowerCase())))
  }









  
async function addTowishlist(productId){
  let {data} = await addProductToLista(productId)
  if (data.status == 'success') {
     toast.success('Successfully added to Wish List' , {
       duration: 2000,
       icon: '❤️',
     })
   }
}




  // async function getProducts(){

  //   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   setProducts(data.data)
  //   setLoading(false)

  // }

  // useEffect(()=>{
  //   getProducts()
  // }, [])




  let {addToCart , setsetNumberOfCartItems, numOfCartItems } =  useContext(CartContext)


  function getProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    
 
  }


  let {data , isError , isFetching , isLoading} =  useQuery('fetcherProdects' , getProducts )
  



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


      <div className="input-container mx-auto">
       <input type="text" name="text" className="input text-lowercase my-3" placeholder="search..." onChange={ e => getPosts(e) }/>
      </div>



<div className="row">
{post.length > 0 ? post.map(product => <div key={product?.id} className="col-lg-2 col-6 pt-5">
            
            <div className="product shadow rounded-5 p-2">
             <i className="fa-regular fa-heart fs-3 position-absolute z-3 cursor-pointer p-2"    onClick={()=>{addTowishlist(product?.id)}}></i> 
           
            <Link to={`/productDetails/${product?.id}`}>
            <div className='overflow-hidden'>
            <img src={product?.imageCover} className='w-100 rounded-5' alt={product?.title} />

            </div>
              <span className='font-sm text-main'>{product?.category?.name}</span>
              <h3 className='h5'>{product?.title?.split(' ').splice(0 , 2).join(' ')}</h3>

              <div className="d-flex justify-content-between align-items-center">
                <span>{product?.price} EGP</span>
                <span>{product?.ratingsAverage} <i className="fa-solid fa-star rating-color"></i> </span>
              </div>
              </Link>
              
              <button onClick={()=> {postToCart(product?.id)} } className='btn w-100 btn-sm bg-main text-light rounded-4 my-2'> <i class="fa-solid fa-cart-plus"></i> Add to Cart</button>

          </div>
                      
        </div>) : data?.data?.data?.map( product =>
          <div key={product?.id} className="col-lg-2 col-6 pt-5">
            
            <div className="product shadow rounded-5 p-2">
             <i className="fa-regular fa-heart fs-3 position-absolute z-3 cursor-pointer p-2"    onClick={()=>{addTowishlist(product?.id)}}></i> 
           
            <Link to={`/productDetails/${product?.id}`}>
            <div className='overflow-hidden'>
            <img src={product?.imageCover} className='w-100 rounded-5' alt={product?.title} />

            </div>
              <span className='font-sm text-main'>{product?.category?.name}</span>
              <h3 className='h5'>{product?.title?.split(' ').splice(0 , 2).join(' ')}</h3>

              <div className="d-flex justify-content-between align-items-center">
                <span>{product?.price} EGP</span>
                <span>{product?.ratingsAverage} <i className="fa-solid fa-star rating-color"></i> </span>
              </div>
              </Link>
              
              <button onClick={()=> {postToCart(product?.id)} } className='btn w-100 btn-sm bg-main text-light rounded-4 my-2'> <i className="fa-solid fa-cart-plus"></i> Add to Cart</button>

          </div>
                      
        </div>)}
</div>
      </div>}  
  
  </>
}