import React, { Suspense, useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter  } from 'react-router-dom'
// import Layout from './Components/Layout/Layout'
// import Home from './Components/Home/Home'
// import Categories from './Components/Categories/Categories'
// import Login from './Components/Login/Login'
// import Register from './Components/Register/Register'
// import Products from './Components/Products/Products'
// import Cart from './Components/Cart/Cart'
// import Brands from './Components/Brands/Brands'
// import NotFound from './Components/NotFound/NotFound'
import UserContextProvider, { UserContext } from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
// import ProductDetails from './Components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
// import BrandDetails from './Components/BrandDetails/BrandDetails'
// import CatagoryDetails from './Components/CatagoryDetails/CatagoryDetails'
import ListaContextProvider from './Context/ListContext'
import SubCategory from './Components/SubCategory/SubCategory'
import SpecificSubCategory from './Components/SpecificSubCategory/SpecificSubCategory'
// import Wishlist from './Components/Wishlist/Wishlist'
// import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
// import Verify from './Components/Verify/Verify'
// import NewPassword from './Components/NewPassword/NewPassword'
// import CheckOut from './Components/CheckOut/CheckOut'
// import AllOrders from './Components/AllOrders/AllOrders'


const Layout = React.lazy(() => import('./Components/Layout/Layout'));
const Home = React.lazy(() => import('./Components/Home/Home'));
const Categories = React.lazy(() => import('./Components/Categories/Categories'));
const Cart = React.lazy(() => import('./Components/Cart/Cart'));
const Brands = React.lazy(() => import('./Components/Brands/Brands'));
const Wishlist = React.lazy(() => import('./Components/Wishlist/Wishlist'));
const AllOrders = React.lazy(() => import('./Components/AllOrders/AllOrders'));
const CheckOut = React.lazy(() => import('./Components/CheckOut/CheckOut'));
const NewPassword = React.lazy(() => import('./Components/NewPassword/NewPassword'));
const Verify = React.lazy(() => import('./Components/Verify/Verify'));
// const CatagoryDetails = React.lazy(() => import('./Components/CatagoryDetails/CatagoryDetails'));
const ForgetPassword = React.lazy(() => import('./Components/ForgetPassword/ForgetPassword'));
const ProductDetails = React.lazy(() => import('./Components/ProductDetails/ProductDetails'));
const Login = React.lazy(() => import('./Components/Login/Login'));
const Register = React.lazy(() => import('./Components/Register/Register'));
const Products = React.lazy(() => import('./Components/Products/Products'));
const NotFound = React.lazy(() => import('./Components/NotFound/NotFound'));






export default function App() {


  let {setUserToken}  = useContext(UserContext);


  useEffect(()=>{
  
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])
        




  let routers = createBrowserRouter([
    {path:'' , element:  <Layout/> , children:[
    {index: true , element:  <Suspense><Home/></Suspense>},
    {path:'brands' , element: <Suspense><Brands/></Suspense> },
    {path:'products' , element: <Suspense><Products/></Suspense>},
    {path:'productDetails/:id' , element: <Suspense><ProductDetails/></Suspense>},
    {path:'categories' , element: <Suspense><Categories/></Suspense>},
    // {path:'/categoriesDetails/:id' , element: <Suspense><ProtectedRoute><CatagoryDetails/></ProtectedRoute></Suspense>},
    {path:'cart' , element: <Suspense><Cart/></Suspense>},
    {path:'wishlist' , element: <Suspense><Wishlist/></Suspense>},
    {path:'checkout/:cartId' , element: <Suspense><ProtectedRoute><CheckOut/></ProtectedRoute></Suspense>},
    {path:'allorders' , element: <Suspense><ProtectedRoute><AllOrders/></ProtectedRoute></Suspense>},
    {path:'subcategory' , element: <Suspense><SubCategory/></Suspense>},
    {path:'specificsubsategory/:id' , element: <Suspense><SpecificSubCategory/></Suspense>},
    {path:'register' , element:<Suspense> <Register/></Suspense>},
    {path:'login' , element: <Suspense><Login/></Suspense>},
    {path:'verify' , element:<Suspense> <Verify/></Suspense>},
    {path:'newpassword' , element: <Suspense><NewPassword/></Suspense>},
    {path:'forgetpassword' , element: <Suspense><ForgetPassword/></Suspense>},
    {path:'*' , element: <Suspense><NotFound/></Suspense>},
    ]}
  ])




  return <>
  <ListaContextProvider>
  <Toaster/>

   <RouterProvider router={routers}></RouterProvider>


  </ListaContextProvider>


  </>
}
