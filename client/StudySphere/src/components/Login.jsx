import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "./Input.jsx";
import { useDispatch } from "react-redux";
import { login } from "../store/Slice.js";
import { Comment } from "react-loader-spinner"
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [ loading, setLoading ] = useState(false)
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const loginAccount = async (data) => {
        setLoading(true)

        try {
            const loggedIn = await axios.post(
                `${apiUrl}/api/v1/users/signIn`,
                data,
                {
                    withCredentials: true,
                }
            );

            if (loggedIn.status !== 201 && loggedIn.status !== 200) {
                setError("Please fill in all fields.");
                return;
            }

            const userData = await axios.get(
                `${apiUrl}/api/v1/users/getUser`,
                { withCredentials: true }
            );

            dispatch(login(userData.data.data));
            navigate("/");
        } catch (error) {
            const errorData = error.response.data;
          
            const extractedMessage = errorData.match(/<pre>Error:\s(.*?)<br>/);

            if (extractedMessage && extractedMessage[1]) {
                setError(extractedMessage[1])
            }
        }
        finally{
            setLoading(false)
        }
    };

    return (
        loading ? (
            <div className="flex justify-center items-center bg-cover bg-center w-full min-h-screen">
                <Comment
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    wrapperClass="comment-wrapper"
                    color="#fff"
                    backgroundColor="#F4442E"
                />
            </div>
        ) : (
            <div
            className="flex justify-center items-center bg-cover bg-center w-full min-h-screen"
            style={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1531746790731-6c087fecd65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGdyYWRpZW50fGVufDB8fHx8MTYyMzU4NzA3NQ&ixlib=rb-1.2.1&q=80&w=1080")',
            }}
        >
            <div className="flex flex-col px-[2vw] w-[35%] shadow-xl shadow-slate-900 rounded-2xl h-[85%] items-center justify-center bg-white bg-opacity-90">
                <header className="flex justify-center h-[15%] w-[20%] mt-[2vw]">
                    <img
                        src="https://th.bing.com/th/id/OIP.1bl2HLvxZV77Wiw35aUDlgHaHa?rs=1&pid=ImgDetMain"
                        alt="logo"
                        className="rounded-3xl"
                    />
                </header>

                <div className="flex text-center font-bold text-3xl text-gray-800">
                    Welcome back!
                </div>

                {error && (
                    <p className="text-red-500 mt-2 text-sm">{error}</p>
                )}

                <form
                    className="h-[70%] w-[100%] flex flex-col items-center py-[2vw] gap-y-[1vw]"
                    onSubmit={handleSubmit(loginAccount)}
                >
                    <Input
                        placeholder="Email"
                        className="w-[100%] h-[3vw] p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="email"
                        {...register("email", { required: true })}
                    />
                    <Input
                        placeholder="Password (min 6 Characters)"
                        className="w-[100%] h-[3vw] p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="password"
                        {...register("password", { required: true })}
                    />

                    <div className="text-center py-[1vw] text-sm text-gray-700">
                        Dive into your study groups, share resources, and collaborate with your peers to achieve your academic goals.
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white w-[30%] h-[3vw] rounded-xl hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Login
                    </button>

                    <p className="text-sm text-gray-600 mt-4">
                        Don't have an account yet?
                    </p>
                    <p
                        onClick={() => navigate("/signUp")}
                        className="font-bold text-indigo-600 cursor-pointer"
                    >
                        Register Now
                    </p>
                </form>
            </div>
        </div>
        )   
    );
}

export default Login;
