import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state)=>state.auth.status)
    const navigate = useNavigate()

    const navItems=[
        // {name:'Home',slug:'/',active:true},
        {name:'Login',slug:'/login',active:!authStatus},
        {name:'Signup',slug:'/signup',active:!authStatus},
        
    ]

  return (
    <nav className="hidden md:flex bg-gray-900 text-white/70 justify-end right-3 ">
        {navItems.map((item)=>
            (
                item.active &&(
                    <button key={item.name} className="px-4 py-2 rounded-full hover:bg-gray-700 duration-300 ease-in-out transition cursor-pointer"
                    onClick={() => navigate(item.slug)}>{item.name}</button>
                )
            )
        )}
        {/* {authStatus && <Logout/>} */}
    </nav>
  )
}

export default Header