import axios from "axios";
import { createContext, useState } from "react";

export let ListaContext =   createContext()


export default function ListaContextProvider(props){

    const [dataOfWishProducts, setDataOfWishProducts] = useState([]);


    function getWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
        headers:{
            token:localStorage.getItem('userToken')
        }
    })
    .then((response)=>response)
    .catch((err)=> err)
    }

    function deleteWishlistItem(id){

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,{
            headers:{
                token:localStorage.getItem('userToken')
            }
        })
        .then((response)=>response)
        .catch((err)=> err)
    
       }




    function addProductToLista(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {

            "productId": productId
        },{
            headers:{
                token:localStorage.getItem('userToken')
            }
        })
        .then((response)=>response)
        .catch((err)=> err)
    }

    return <ListaContext.Provider value={{addProductToLista , getWishList , deleteWishlistItem , setDataOfWishProducts}}>
        {props.children}
    </ListaContext.Provider>




}