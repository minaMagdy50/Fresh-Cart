import React, { useState } from 'react'
import style from './Verify.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'

export default function Verify() {
  let navigate = useNavigate()


  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  setTimeout(() => {
    navigate('/forgetpassword')
    toast.error('Time out enter your email again' , {
      duration: 5000
    })
  }, 600000);


  async function verify(values) {

    setLoading(true)
    console.log(values);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values).catch((err)=>{
    setErr(err.response.data.message);
    setLoading(false)
    })

    console.log(data);
    if (data.status == 'Success') {
      setLoading(false)
      toast.success('Success')
      navigate('/newpassword')
  }
  }





  let formik = useFormik(
    {
        initialValues: {
          resetCode: ''
        },
        onSubmit: verify

    }
)




  return <>
  
  <section className='my-5'>
    <div className='container py-5 d-flex flex-column align-items-center'>
      <q className='h3 text-center fw-bold mx-auto mb-5'>Reset code sent to your email check your email</q>
      <form onSubmit={formik.handleSubmit}  className='my-5 py-4 w-75 text-center'>
        
      {err? <div class="error w-100 my-2">
                    <div class="error__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                    </div>
                    <div class="error__title">{err}</div>
                </div> :''}

        <label htmlFor="resetCode" className='fw-bold mb-3'>enter reset code here</label>
        <input type="text" name='resetCode' id='resetCode' className='form-control w-50 mx-auto font-sm' placeholder='Reset code'   onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <button disabled={!formik.dirty} type='submit' className='btn bg-main text-light mt-2'>submit</button>
      </form>
    </div>
  </section>
  
  </>
}
