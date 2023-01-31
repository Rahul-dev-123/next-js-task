
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Api from '../Api';
import UserUpdateModal from './UserUpdateModal';

function Header() {

    const router = useRouter()

    const [User, setUser] = useState(null)

    const getUserDetail = async () => {

        try {
            const { data: { msg, success } } = await Api("get", 'user/0')

            if (success) {
                setUser(msg)
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        getUserDetail()

    }, [])

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Next Js</a>

                <div class="navbar-nav ms-auto  mb-2 mb-lg-0">

                    <div class="dropdown">

                        <i class="bi bi-person-circle text-white fs-3 " id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>

                        {User &&

                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li><span class="dropdown-item" >Hi, {User.name}</span></li>
                                <li style={{ cursor: "pointer" }}><a class="dropdown-item cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal1" >Edit Profile</a></li>
                                <li style={{ cursor: "pointer" }}><a class="dropdown-item cursor-pointer" onClick={() => {
                                    router.push("/")
                                    localStorage.removeItem("token")
                                    alert("Logout successfully")
                                }} >Logout</a></li>
                            </ul>

                        }


                        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <UserUpdateModal type="Profile" data={User} refreshList={() => getUserDetail()} />
                        </div>

                    </div>




                </div>


            </div>
        </nav>
    )
}

export default Header