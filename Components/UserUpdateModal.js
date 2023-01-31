
import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import Api from '../Api'
import Link from 'next/link'

import { useRouter } from 'next/router'

function UserUpdateModal({ type, data, refreshList }) {

    const closeBtn = useRef(null)

    const { register, handleSubmit, setError, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {

        if (data) {
            reset({ name: data.name, email: data.email, mobile: data.mobile, gender: data.gender })
        }

    }, [data])




    const onSubmit = async user => {

        try {
            const { data: { msg, success } } = await Api("put", `/user/${data._id}`, user);
            alert(msg)
            refreshList()
            if (success) {
                closeBtn.current.click()
            }

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit {type}</h5>
                    <button type="button" ref={closeBtn} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <form className=' p-3  mx-auto mt-3' onSubmit={handleSubmit(onSubmit)} >

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


                        <div className='d-flex justify-content-end'>
                            <button type="submit" class="btn btn-success me-3" >Update</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" >Close</button>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default UserUpdateModal