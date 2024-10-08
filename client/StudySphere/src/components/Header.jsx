import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Logo from "./Logo.jsx"
import LogoutBtn from "./LogoutBtn.jsx"

function Header() {

    const authStatus = useSelector((state) => state.status)
    // const navigate =  useNavigate()

    const navBar = [
        {
            title: "Home",
            slug: '/',
            active: true
        },
        {
            title: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            title: "Your Group's",
            slug: '/group',
            active: authStatus
        },
        {
            title: 'Join groups',
            slug: 'joinGroups',
            active: authStatus
        }
    ]

    return (
        <div className="w-[100%] flex justify-between items-center px-[2vw] bg-gradient-to-r from-blue-600 to-blue-950 h-[5vw]">

            <Logo />

           <div className="flex items-center h-[50%] w-[10vw] justify-between">
           {
                navBar.map((item) => (
                    item.active &&
                    <ul className="flex h-[100%] w-[100%]">
                        <li key={item.title} className="flex px-[2vw] items-center cursor-pointer rounded-md h-[100%]  text-white hover:bg-blue-800">
                            {item.title}
                        </li>
                    </ul>
                ))
            }
           </div>

           <LogoutBtn />
        </div>
    )
}

export default Header