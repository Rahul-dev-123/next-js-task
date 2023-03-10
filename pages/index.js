import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ForgetPassModal from '../Components/ForgetPassModal'
import Api from '../Api'

// import { loginAPI } from '@/services'


export default function Home() {

  const router = useRouter()

  const [showPassword, setshowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = async data => {
    try {
      const { data: { msg, token, success } } = await Api("post", "/login", data);
      alert(msg)
      if (success) {
        console.log(token)
        localStorage.setItem("token", token)
        router.push("/dashboard")
      }

    } catch (error) {
      console.log(error)
    }
  }

  const onError = data => console.log(data)


  return (
    <>
      <Head>
        <title>Login - Next App</title>
      </Head>


      <section className='container border brder-danger mt-5'>

        <h2 className="text-center">Log-in Page</h2>

        <form className='w-50 p-3 border mx-auto mt-5' onSubmit={handleSubmit(onSubmit, onError)} >

          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address <span className='text-danger'>*</span></label>
            <input type="text" className="form-control" id="exampleInputEmail1"
              {...register("email",
                {
                  required: "Please Enter Email",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Enter Valid Email"
                  }
                })
              } />
            {errors.email && <p className='text-danger'>{errors.email.message}</p>}
          </div>

          <div className="mb-3 position-relative">
            <label for="exampleInputPassword1" className="form-label">Password <span className='text-danger'>*</span> </label>
            <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1"
              {...register("password",
                {
                  required: "Please Enter Password"
                })
              } />
            {showPassword ?
              <i className="bi bi-eye-fill" style={{ position: "absolute", bottom: "5px", left: "calc(100% - 30px)" }} onClick={() => setshowPassword(!showPassword)}></i>
              :
              <i className="bi bi-eye-slash-fill" style={{ position: "absolute", bottom: "5px", left: "calc(100% - 30px)" }} onClick={() => setshowPassword(!showPassword)}  ></i>

            }
            {errors.password && <p className='text-danger'>{errors.password.message}</p>}
          </div>

          <div className='mb-3 text-end '>
            <p style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#forgetpasmodal">Forgot Password ?</p>
          </div>

          <div className='d-flex justify-content-between'>
            <button type="submit" className="btn btn-primary" >Login</button>
            <Link href="/register" className="btn btn-success">Register</Link>

          </div>

        </form>
      </section>


      <div className="modal fade" id="forgetpasmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <ForgetPassModal />
      </div>




    </>
  )
}
