

import axios from 'axios'


async function Api(method, path, data) {


    axios.defaults.baseURL = 'http://localhost:3000/api';
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
    axios.defaults.headers['Content-Type'] = 'application/json'

    try {
       
        const res = await axios[method](path, data)
       return res

    } catch (error) {

        if (error.response.status == 401) {
            alert(error.response.data.msg)
            localStorage.removeItem("token")
            location.href = "/"
        } else {
            return error
        }


    }

}

export default Api