
import { useEffect, useState } from "react"


function ProtectedRoutes(Component) {
    return () => {

        const [login, setlogin] = useState(false)
  
        useEffect(() => {
          
            let token = localStorage.getItem("token")

            if(!token){
                alert("invalid user")
                location.href = "/"
            }else{
                setlogin(true)
            }
        }, [])

        if(login){
            return <Component />
        }else{
            return null
        }
        
       
    }

    

}

export default ProtectedRoutes