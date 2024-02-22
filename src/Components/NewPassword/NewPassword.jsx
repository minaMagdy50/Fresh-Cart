import React, { useContext, useState } from 'react'
import style from './NewPassword.module.css'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { UserContext } from '../../Context/UserContext'


export default function NewPassword() {
  let navigate = useNavigate()
  let {setUserToken} = useContext(UserContext)

  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')



  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('email is invalid'),
    newPassword: Yup.string().required('password is requrid ').matches(/^[A-Z][\w @]{5,8}$/, 'password should start with a capital letter then 5:8 num or letters')
})


async function newpassword(values) {

  setLoading(true)
  console.log(values);
  let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values).catch((err)=>{
  setErr(err.response.data.message);
  setLoading(false)
  })
     console.log(data);
     if (data.token !== undefined) {
      setLoading(false)
      localStorage.setItem('userToken' , data.token)
      toast.success('welcome')
      setUserToken(data.token)
      navigate('/')
  }

}



let formik = useFormik(
  {
      initialValues: {
          email: '',
          newPassword: ''
      }, validationSchema,
      onSubmit: newpassword

  }
)









  return <>
  
  <section className='my-5 py-5'>
  <div className='py-3'>
    <h1 className='h3  text-center fw-bold'>Reset your Password</h1>
    <form onSubmit={formik.handleSubmit} className='w-50 mx-auto my-5'>
    {err? <div class="error w-100 my-2">
         <div class="error__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
             </div>
         <div class="error__title">{err}</div>
         </div> :''}
      <label htmlFor="email" className='mb-2'>Enter your email:</label>
      <input type="email" name="email" id="email" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email ? <div class="error w-100 mt-2">
                    <div class="error__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                    </div>
                    <div class="error__title">{formik.errors.email}</div>
                </div> : ""} 
      <label htmlFor="newPassword" className='my-2'>Enter new Password:</label>
      <input type="password" name="newPassword" id="newPassword" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.newPassword && formik.touched.newPassword ? <div class="error w-100 mt-2">
                    <div class="error__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                    </div>
                    <div class="error__title">{formik.errors.newPassword}</div>
                </div> : ""} 

      <button type='submit' className='btn bg-main text-light mt-3'>change passowrd</button>
      
    </form>
  </div>
  </section>
  
  
  </>
}
