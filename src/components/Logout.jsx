import React from 'react'
import { useDispatch } from 'react-redux'
import auth from '../appwrite/auth'
import { logout } from '../store/authstore'

function Logout() {
    const dispatch = useDispatch()
    const logoutbutton = async()=>{
        try {
            auth.logout().then(()=> dispatch(logout()))
        } catch (error) {
            console.log(error,': error in logout')
        }
    }

  return (
    <button
    className="px-4 py-4  bottom-0 bg-gray-800 w-full  hover:bg-red-500 duration-300 ease-in-out transition cursor-pointer"
     onClick={logoutbutton}
     >Logout
     </button>
  )
}

export default Logout