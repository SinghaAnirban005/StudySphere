import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from  "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateUser } from '../store/Slice.js';

function Profile() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const {register, handleSubmit } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = async (data) => {
       
        setLoading(true);

  
        console.log(data)
        try {
            const response = await axios.put(
                'http://localhost:8000/api/v1/users/update-profile',
                null,
                {
                    params: data,
                    withCredentials: true
                },
            );

            console.log(response)

            dispatch(updateUser(response.data.data))
            setMessage(response.data.message);
            navigate('/')
        } catch (error) {
            setMessage('Error updating profile: ' + error?.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-600 p-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md transition-transform transform hover:scale-105">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Update Profile</h2>

                <form onSubmit={handleSubmit(submit)} className="flex flex-col space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Full Name:</label>
                        <input
                            type="text"
                            placeholder="Enter new full name"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            {
                                ...register(
                                    'fullName'
                                )
                            }
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter new email"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            {
                                ...register(
                                    'email'
                                )
                            }
                        />
                    </div>

                    {/* Profile Picture */}
                    {/* <div>
                        <label className="block text-gray-700 font-semibold mb-2">Profile Picture:</label>
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            {
                                ...register(
                                    'profilePic',{
                                        required: true
                                    }
                                )
                            }
                        />
                    </div> */}

                    {/* Submit Button */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>

                    {/* Success/Error Message */}
                    {message && (
                        <div className="mt-4 p-2 text-center text-white font-bold bg-teal-600 rounded-lg shadow-md">
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Profile;
