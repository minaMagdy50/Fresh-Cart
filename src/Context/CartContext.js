import axios from "axios";

const { createContext, useState } = require("react");

export let CartContext = createContext()

export default function CartContextProvider(props){

    const [numberOfCartItems, setsetNumberOfCartItems] = useState(0)

   function addToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
        
            "productId": productId
        
    },{
        headers:{
            token:localStorage.getItem('userToken')
        }
    })
    .then((response)=>response)
    .catch((err)=> err)

   }
   function getCartItems(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` ,{
        headers:{
            token:localStorage.getItem('userToken')
        }
    })
    .then((response)=>{
        
        setsetNumberOfCartItems(response.data.numOfCartItems);
        localStorage.setItem('numofcartitems' , response.data.numOfCartItems)

        return response;

    })
    .catch((err)=> err)
    
   }
   function deleteCartItems(id){

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
        headers:{
            token:localStorage.getItem('userToken')
        }
    })
    .then((response)=>response)
    .catch((err)=> err)

   }
   function updateCartItems(id , count){

    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
        count
    } ,{
        headers:{
            token:localStorage.getItem('userToken')
        }
    })
    .then((response)=>response)
    .catch((err)=> err)

   }
   function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:{
            token:localStorage.getItem('userToken')
        }
    })
    .then((response)=>response)
    .catch((err)=> err)

   }





   function checkOutSession(cartId , shippingAddress ){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://freshcart-five.vercel.app/` , {
        
    shippingAddress
        
    },{
        headers:{
            token:localStorage.getItem('userToken')
        }
    })
    .then((response)=>response)
    .catch((err)=> err)

   }











   return <CartContext.Provider value={ {checkOutSession , addToCart , getCartItems , deleteCartItems , updateCartItems , clearCart , numberOfCartItems , setsetNumberOfCartItems}}>
    {props.children}
   </CartContext.Provider>
}