import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { BallTriangle, Vortex } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import toast from 'react-hot-toast'


export default function Login() {
  let navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    let {setUserToken} =  useContext(UserContext)

    let validationSchema = Yup.object({
        email: Yup.string().required('email is required').email('email is invalid'),
        password: Yup.string().required('password is requrid ').matches(/^[A-Z][\w @]{5,8}$/, 'password should start with a capital letter then 5:8 num or letters')
    })

    async function loginSubmit(values) {

        setLoading(true)
        console.log(values);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err)=>{
        setErr(err.response.data.message);
        setLoading(false)
        })
           console.log(data);

           
        if (data.message == 'success') {
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
                password: ''
            }, validationSchema,
            onSubmit: loginSubmit

        }
    )


    return <>
    
        <div className='w-50 mx-auto my-5 py-5'>
            <h2 className='text-center'>login</h2>
            <form onSubmit={formik.handleSubmit} className='mb-5 pb-5'>

                {err? <div class="error w-100 my-2">
                    <div class="error__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                    </div>
                    <div class="error__title">{err}</div>
                </div> :''}

                <label htmlFor="email">Email :</label>
                <input type="email" id='email' name='email' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                
               {formik.errors.email && formik.touched.email ? <div class="error w-100 mt-2">
                    <div class="error__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                    </div>
                    <div class="error__title">{formik.errors.email}</div>
                </div> : ""} 
                <label htmlFor="passowrd">password :</label>
                <input type="password"  id='passowrd' name='password' className='form-control ' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.password && formik.touched.password ? <div class="error w-100 my-2">
                    <div class="error__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                    </div>
                    <div class="error__title">{formik.errors.password}</div>
                </div> : ""} 

                {loading ? <button type='button' className='btn btn-danger mt-2'><Vortex visible={true} height="30" width="30" ariaLabel="vortex-loading" wrapperStyle={{}}
                    wrapperClass="vortex-wrapper" colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']} /></button> :
                    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className=' mt-2 btn bg-main text-light'>Login</button>}
                    <div className='d-flex align-items-center justify-content-between loginfooter flex-wrap'>
                    <p className=' text-muted pt-3'>Don't have an account ? <Link className='ps-1 fw-bold' to={'/register'} > Register Now </Link></p>
                  <Link to={'/forgetpassword'}> <strong>Forgot Password</strong> </Link>
                    </div>
                 
            </form>
        </div>

</>


}
