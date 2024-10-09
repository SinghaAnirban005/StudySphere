import React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { login } from "../store/Slice.js"
import { useSelector } from "react-redux"
import axios from "axios"
import Input from "./Input.jsx"

function SignUp() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.userData)

    const createAccount = async function(data) {
        try {   
            const registration = await axios.post("http://localhost:8000/api/v1/users/register", data)

            if(registration.status !== 201 && registration.status !== 200){
                setError("Enter all fields")
            }

            dispatch(login(data))   
            console.log(userData)
            navigate('/')
            
        } catch (error) {
            setError("Registration failed due to an error: " + error?.response?.data?.message || error?.message);       
        }
    }

    return (
        <div className="flex justify-center items-center bg-gradient-to-r from-amber-300 to-blue-950 w-[100%] h-[42vw]">
            
            <div className="flex flex-col px-[2vw] w-[35%] shadow-xl shadow-slate-900 rounded-2xl h-[85%] items-center justify-center bg-slate-200">
            <header className="flex justify-center h-[15%] w-[20%] mt-[2vw]">
                <img src="https://th.bing.com/th/id/OIP.1bl2HLvxZV77Wiw35aUDlgHaHa?rs=1&pid=ImgDetMain" alt="logo" className="rounded-3xl" />
            </header>

            <div className="flex text-center">
            Join thousands of learners and collaborate in real-time with study groups tailored to your needs.
            </div>

            {error && (
            <p className="text-red">{error?.message}</p>
        )}

            <form className="h-[70%] w-[100%] flex flex-col items-center py-[2vw] gap-y-[0.5vw]" onSubmit={handleSubmit(createAccount)} >
                <Input
                    placeholder= "Full Name"
                    className=""
                    {
                        ...register(
                            "fullName", {
                                required: true
                            }
                        )
                    }
                />
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
                    placeholder= "Set username"
                    className=""
                    {
                        ...register(
                            "username", {
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
                    By clicking on SignUp, you agree to StudySphere's <span className="font-bold text-sky-600 cursor-pointer hover:text-sky-500">terms and conditions</span>
                </div>

                <button type="submit" className="bg-black text-white w-[30%] h-[5vw] rounded-xl hover:bg-slate-900">
                    Sign Up
                </button>
            </form>
            </div>
            
        </div>
    )
}

export default SignUp