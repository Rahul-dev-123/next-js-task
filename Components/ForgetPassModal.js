

import React, { useRef, useState } from 'react'
import Api from '../Api'


function ForgetPassModal() {

    const closeBtn = useRef(null)

    const [stage, setstage] = useState(1)

    const [userId, setuserId] = useState(null)
    const [email, setemail] = useState("")

    const [otp, setotp] = useState("")
    const [conotp, setconotp] = useState("")

    const [password, setpassword] = useState("")
    const [conpassword, setconpassword] = useState("")


    const sendOTP = async () => {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

            try {

                const { data: { msg, otp, userid, success } } = await Api("post", "/forgetpassword", { email })
                alert(msg)

                console.log({ msg, otp, userid, success })
                if (success) {
                    setstage(2)
                    setotp(otp)
                    setuserId(userid)
                }
            } catch (error) {
                console.log({ error })
                // alert(error.response.data.msg)
            }

        } else {
            alert("Invalid Email ")
        }

    }


    return (

        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Forgot password</h5>
                    <button type="button" ref={closeBtn} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                {stage == 1 &&
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address <span className='text-danger'>*</span></label>
                            <input type="text" class="form-control" id="exampleInputEmail1"
                                value={email}
                                onChange={e => setemail(e.target.value)}
                            />

                        </div>

                        <div className='text-end'>
                            <button className='btn btn-primary' onClick={sendOTP}>Get OTP</button>
                        </div>
                    </div>
                }

                {stage == 2 &&
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter OTP <span className='text-danger'>*</span></label>
                            <input type="text" class="form-control" id="exampleInputEmail1" value={conotp}
                                onChange={e => setconotp(e.target.value)}
                            />
                        </div>

                        <div className='d-flex justify-content-between'>

                            <button className='btn btn-secondary' onClick={sendOTP} >Resend OTP</button>
                            <button className='btn btn-primary' onClick={() => {
                                if (otp == conotp) {
                                    setstage(3)
                                } else {
                                    alert("OTP does not match.")
                                }

                            }}>Confirm</button>
                        </div>
                    </div>
                }

                {stage == 3 &&
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">New Password <span className='text-danger'>*</span></label>
                            <input type="text" class="form-control" id="exampleInputEmail1" value={password} onChange={e => setpassword(e.target.value)} />
                        </div>


                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Confirm Password <span className='text-danger'>*</span></label>
                            <input type="text" class="form-control" id="exampleInputEmail1" value={conpassword} onChange={e => setconpassword(e.target.value)} />
                        </div>

                        <div className='text-end'>


                            <button className='btn btn-primary' onClick={async () => {

                                if (password == conpassword) {

                                    try {
                                        const { data: { msg, success } } = await Api("post", "/resetpassword", { password, userId })

                                        alert(msg)

                                        if (success) {

                                            setstage(1)
                                            setuserId(null)
                                            setemail("")
                                            setotp("")
                                            setconotp("")
                                            setpassword("")
                                            setconpassword("")

                                            closeBtn.current.click()
                                        }

                                    } catch (error) {
                                        console.log({ error })
                                        // alert(error.response.data.msg)
                                    }

                                } else {
                                    alert("Password and Confirm Password does not match.")
                                }

                            }}>Submit</button>
                        </div>
                    </div>
                }

            </div>
        </div>

    )
}

export default ForgetPassModal