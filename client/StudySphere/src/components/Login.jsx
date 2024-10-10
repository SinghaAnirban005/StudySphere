import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Input from "./Input.jsx"
import { useDispatch } from "react-redux"
import { login } from "../store/Slice.js"
import axios from "axios"

function Login() {
    
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(true)
    const [error, setError] = useState(null)
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()

    const loginAccount = async function(data) {
        try {   
            console.log(data)
            const loggedIn = await axios.post('http://localhost:8000/api/v1/users/signIn', data, {
                withCredentials: true
            })
            console.log("request has been made")
            if(loggedIn.status !== 201 && loggedIn.status !== 200){
                setError("Enter all fields")
            }

            dispatch(login(data))

            navigate('/')
        } catch (error) {
            setError("Login failed due to an error: " + error?.response?.data?.message || error?.message);       
        }
    }

    return (
        <div className="flex justify-center items-center bg-gradient-to-r from-amber-300 to-blue-950 w-[100%] min-h-[calc(100vh-5vw)]">
            
        <div className="flex flex-col px-[2vw] w-[35%] shadow-xl shadow-slate-900 rounded-2xl h-[85%] items-center justify-center bg-slate-200">
        <header className="flex justify-center h-[15%] w-[20%] mt-[2vw]">
            <img src="https://th.bing.com/th/id/OIP.1bl2HLvxZV77Wiw35aUDlgHaHa?rs=1&pid=ImgDetMain" alt="logo" className="rounded-3xl" />
        </header>

        <div className="flex text-center font-bold text-[3vw]">
            Welcome back ! 
        </div>

        {error && (
            <p className="text-red">{error?.message}</p>
        )}

        <form className="h-[70%] w-[100%] flex flex-col items-center py-[2vw] gap-y-[0.5vw]" onSubmit={handleSubmit(loginAccount)} >
            <Input
                placeholder= "Email"
                className=""
                type="email"
                {
                    ...register(
                        "email", {
                            required: true
                        }
                    )
                }
            />
            <Input
                placeholder= "Password (min 6 Characters)"
                className=""
                type="password"
                {
                    ...register(
                        "password", {
                            required: true
                        }
                    )
                }
            />

            <div className="text-center py-[1vw] text-[1vw]">
            Dive into your study groups, share resources, and collaborate with your peers to achieve your academic goals
            </div>

            <button type="submit" className="bg-black text-white w-[30%] h-[3vw] rounded-xl hover:bg-slate-900">
                Login
            </button>

            <p>
                Don't have an account yet ?
            </p>
            <p onClick={() => navigate('/signUp')} className="font-bold cursor-pointer">
                Register Now
            </p>
        </form>
        </div>
        
    </div>
    )
}

export default Login