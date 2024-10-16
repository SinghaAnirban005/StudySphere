import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Logo from "./Logo.jsx"
import LogoutBtn from "./LogoutBtn.jsx"

function Header() {

    const authStatus = useSelector((state) => state.status)
    const navigate =  useNavigate()

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
        <div className="w-full flex justify-between items-center px-[2vw] h-[5vw] bg-gradient-to-r from-blue-600 to-blue-950 animate-gradient-x bg-opacity-80 backdrop-filter backdrop-blur-md shadow-lg border-b border-opacity-30 border-gray-200">
  {/* Animated Background */}
  <style>
    {`
    @keyframes gradient-x {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient-x {
      background-size: 200% 200%;
      animation: gradient-x 5s ease infinite;
    }
    `}
  </style>

  <Logo />

  <div className="flex items-center h-full space-x-6">
    {navBar.map((item) => (
      item.active && (
        <ul key={item.title} className="flex h-full">
          <li 
            className="w-[8vw] justify-center py-[0.5vw] flex items-center cursor-pointer rounded-md h-full text-white font-semibold text-lg transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:scale-110 hover:shadow-lg"
            onClick={() => navigate(item.slug)}
          >
            {item.title}
          </li>
        </ul>
      )
    ))}
  </div>

  {authStatus && <LogoutBtn />}
</div>

    )
}

export default Header