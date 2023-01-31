

import axios from 'axios';
import { useEffect, useState } from 'react';
import Api from '../Api';
import ProtectedRoutes from '../Authentication/ProtectedRoutes';
import UserUpdateModal from '../Components/UserUpdateModal';
import Header from '../Components/Header';
import Head from 'next/head';

const dashboard = () => {

  // const router = useRouter() 
  const [UserList, setUserList] = useState([])
  const [user, setuser] = useState(null)


  const getAllUser = async () => {
    try {

      const { data: { msg, success } } = await Api("get", "/user")
      // console.log(data)

      if (success) {
        setUserList(msg)
      }

    } catch (error) {
      console.log({ error })
      // alert(error.response.data.msg)
    }

  }

  const deleteUser = async (userid) => {
    try {
      const { data: { msg, success } } = await Api("delete", `/user/${userid}`)

      if (success) {
        alert(msg)
        getAllUser()
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getAllUser()
  }, [])


  return (
    <> 

    <Head >
      <title>Home - Next App</title>
    </Head>

      <Header />

      <div className='row mt-5 m-0'>
        {UserList.map(val =>
          <div className='col-3 mb-3'>

            <div className='p-2 card'>
              <span>Name : {val.name}</span><br />
              <span>Email : {val.email}</span><br />
              <span>Gender : {val.gender}</span><br />
              <span>Mobile : {val.mobile}</span><br />

              <div className='d-flex justify-content-between'>
                <button onClick={() => setuser(val)} className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal" >Edit</button>
                <button className='btn btn-danger' onClick={() => deleteUser(val._id)}>Delete</button>
              </div>
            </div>
          </div>
        )}

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <UserUpdateModal type="User" data={user} refreshList={() => getAllUser()} />
        </div>


      </div>

    </>
  )
}

export default ProtectedRoutes(dashboard)


