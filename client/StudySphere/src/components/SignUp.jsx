import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/Slice.js";
import axios from "axios";
import { Comment } from "react-loader-spinner"
import Input from "./Input.jsx";

function SignUp() {
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createAccount = async function (data) {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('fullName', data.fullName);
            formData.append('email', data.email);
            formData.append('username', data.username);
            formData.append('password', data.password);
            formData.append('profilePic', data.profilePic[0]);

            const registration = await axios.post("http://localhost:8000/api/v1/users/register", formData, {
                withCredentials: true,
            });

            if (registration.status !== 201 && registration.status !== 200) {
                setError("Please fill in all fields.");
                return;
            }

            const newData = {
                email: data.email,
                password: data.password,
            };

            await axios.post('http://localhost:8000/api/v1/users/signIn', newData, {
                withCredentials: true,
            });

            const userData = await axios.get('http://localhost:8000/api/v1/users/getUser', {
                withCredentials: true,
            });

            dispatch(login(userData.data.data));
            navigate('/');
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
            <div className="flex justify-center items-center bg-cover bg-center w-full h-[60vw]">
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
            className="flex justify-center items-center bg-cover bg-center w-full h-[60vw]"
            style={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1531746790731-6c087fecd65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGdyYWRpZW50fGVufDB8fHx8MTYyMzU4NzA3NQ&ixlib=rb-1.2.1&q=80&w=1080")',
            }}
        >
            <div className="flex flex-col px-[2vw] w-[35%] shadow-xl shadow-slate-900 rounded-2xl h-[80%] items-center justify-center bg-white bg-opacity-90">
                <header className="flex justify-center h-[15%] w-[20%] mt-[2vw]">
                    <img
                        src="https://th.bing.com/th/id/OIP.1bl2HLvxZV77Wiw35aUDlgHaHa?rs=1&pid=ImgDetMain"
                        alt="logo"
                        className="rounded-3xl"
                    />
                </header>

                <div className="flex text-center font-bold text-2xl text-gray-800 mb-4">
                    Join thousands of learners and collaborate in real-time with study groups tailored to your needs.
                </div>

                {error && (
                    <p className="text-red-500 mt-2 text-sm">{error}</p>
                )}

                <form
                    className="h-[70%] w-[100%] flex flex-col items-center py-[2vw] gap-y-[1vw]"
                    onSubmit={handleSubmit(createAccount)}
                >
                    <Input
                        placeholder="Full Name"
                        className="w-[80%] h-[3vw] p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        {...register("fullName", { required: true })}
                    />
                    <Input
                        placeholder="Email"
                        className="w-[80%] h-[3vw] p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="email"
                        {...register("email", { required: true })}
                    />
                    <Input
                        placeholder="Set username"
                        className="w-[80%] h-[3vw] p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        {...register("username", { required: true })}
                    />
                    <Input
                        label="Choose a Profile picture"
                        type="file"
                        accept="image/*"
                        className="w-[80%] h-[3vw] p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        {...register("profilePic", { required: true })}
                    />
                    <Input
                        placeholder="Password (min 6 Characters)"
                        className="w-[80%] h-[3vw] p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="password"
                        {...register("password", { required: true })}
                    />

                    <div className="text-center py-[1vw] text-sm text-gray-700">
                        By clicking on SignUp, you agree to StudySphere's{' '}
                        <span className="font-bold text-sky-600 cursor-pointer hover:text-sky-500">
                            terms and conditions
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white w-[30%] h-[3vw] rounded-xl hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
        )
    );
}

export default SignUp;
