import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import auth from '../appwrite/auth'
import { logout } from '../store/authstore'

function Logout() {
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const logoutbutton = async()=>{
        setLoading(true)
        try {
            auth.logout().then(()=> dispatch(logout()))
        } catch (error) {
            console.log(error,': error in logout')
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <button
    className="px-4 py-4 z-10  bottom-10 bg-gray-800 w-full  hover:bg-red-500 duration-300 ease-in-out transition cursor-pointer"
     onClick={logoutbutton}
     >{loading?<div>Loading...</div>:<div>Logout</div>}
     </button>
  )
}

export default Logout