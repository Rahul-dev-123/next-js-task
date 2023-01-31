
import React, { useState } from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Api from '../Api'

const register = () => {

    const router = useRouter();


    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)


    const { register, handleSubmit, setError, formState: { errors } } = useForm();


    const onSubmit = async data => {

        if (data.password == data.confirmpassword) {

            delete data.confirmpassword

            try {
                const { data: { msg, token, success } } = await Api("post", "/register", data);
                alert(msg)
                if (success) {
                    localStorage.setItem("token", token)
                    router.push("/dashboard")
                }

            } catch (error) {
                console.log(error)
            }

        } else {
            setError('confirmpassword', { type: 'custom', message: 'Password not match' });
        }

    }



    return (
        <>
            <Head>
                <title>Register - Next App</title>
            </Head>


            <section className='container border brder-danger mt-4'>

                <h2 class="text-center">Register Page</h2>

                <form className='w-50 p-3 border mx-auto mt-3' onSubmit={handleSubmit(onSubmit)} >

                    <div class="mb-3">
                        <label for="register_name" class="form-label">Full Name <span className='text-danger'>*</span></label>
                        <input type="text" class="form-control" id="register_name"

                            {...register("name",
                                {
                                    required: "Please Enter Name",
                                    pattern: {
                                        value: /^[a-zA-Z ]+$/,
                                        message: "Enter Valid Name"
                                    },
                                    minLength: { value: 3, message: "Name must be equal or greater than 3 character" }
                                })
                            } 
                            
                            />
                        {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                    </div>

                    <div class="mb-3">
                        <label for="register_email" class="form-label">Email address <span className='text-danger'>*</span></label>
                        <input type="text" class="form-control" id="register_email"
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

                    <div class="mb-3 ">
                        <label for="register_mobile" class="form-label">Mobile Number <span className='text-danger'>*</span></label>
                        <input type="text" class="form-control" id="register_mobile"
                            {...register("mobile",
                                {
                                    required: "Please Enter Mobile Number",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Enter Valid Mobile Number"
                                    }
                                })
                            } />
                        {errors.mobile && <p className='text-danger'>{errors.mobile.message}</p>}
                    </div>


                    <div class="mb-3">
                        <label class="form-label">Gender<span className='text-danger'>*</span></label>

                        <div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="register_male" value="male" {...register("gender", { required: "Please Select Gender" })} />
                                <label class="form-check-label" for="register_male">Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="register_female" value="female" {...register("gender", { required: "Please Select Gender" })} />
                                <label class="form-check-label" for="register_female">Female</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="register_others" value="others" {...register("gender", { required: "Please Select Gender" })} />
                                <label class="form-check-label" for="register_others">Others</label>
                            </div>
                        </div>
                        {errors.gender && <p className='text-danger'>{errors.gender.message}</p>}
                    </div>


                    <div className='row m-0'>

                        <div class=" col-6 mb-3 position-relative">
                            <label for="register_password" class="form-label">Password <span className='text-danger'>*</span> </label>
                            <input type={showPassword ? "text" : "password"} class="form-control" id="register_password"
                                {...register("password", { required: "Please Enter Password" })
                                } />
                            {showPassword ?
                                <i class="bi bi-eye-fill" style={{ position: "absolute", top: "40px", left: "calc(100% - 40px)" }} onClick={() => setshowPassword(!showPassword)}></i>
                                :
                                <i class="bi bi-eye-slash-fill" style={{ position: "absolute", top: "40px", left: "calc(100% - 40px)" }} onClick={() => setshowPassword(!showPassword)}  ></i>

                            }
                            {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                        </div>

                        <div class="col-6 mb-3 position-relative">
                            <label for="register_confirmPassword" class="form-label">Confirm Password <span className='text-danger'>*</span> </label>
                            <input type={showConfirmPassword ? "text" : "password"} class="form-control" id="register_confirmPassword"
                                {...register("confirmpassword",
                                    {
                                        required: "Please Enter Confirm Password"
                                    })
                                }

                            />
                            {showConfirmPassword ?
                                <i class="bi bi-eye-fill" style={{ position: "absolute", top: "40px", left: "calc(100% - 40px)" }} onClick={() => setshowConfirmPassword(!showConfirmPassword)}></i>
                                :
                                <i class="bi bi-eye-slash-fill" style={{ position: "absolute", top: "40px", left: "calc(100% - 40px)" }} onClick={() => setshowConfirmPassword(!showConfirmPassword)}  ></i>

                            }
                            {errors.confirmpassword && <p className='text-danger'>{errors.confirmpassword.message}</p>}
                        </div>

                    </div>

                    <div className='d-flex justify-content-between'>
                        <button type="submit" class="btn btn-primary">Register</button>
                        <Link href="/" class="btn btn-success">Back to Login</Link>

                    </div>

                </form>
            </section>

        </>

    )
}

export default register