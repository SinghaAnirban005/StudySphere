import React from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const apiUrl = import.meta.env.VITE_API_URL

function Resources({ title, description, url, _id, groupId }) {

    const navigate = useNavigate()

    const handleDeletion = async() => {
        try {
            const data = {
                resourceId: _id
            }

            const resourceToBeDeleted = await axios.delete(`${apiUrl}/api/v1/resource/deleteResource/${groupId}`, {
                data,
                withCredentials: true
            })

            if(!resourceToBeDeleted) {
                throw new Error(400, "Resource req failed")
            }

            navigate('/group')

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    return (
        <div className="flex flex-col justify-between bg-gradient-to-r from-green-300 to-green-500 h-[8vw] w-[100%] cursor-pointer rounded-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4 relative">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                
                <button className="absolute top-4 right-4 p-1 bg-red-100 hover:bg-red-300 rounded-full transition-colors duration-200" onClick={handleDeletion}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/484/484662.png"
                        alt="Delete"
                        className="h-6 w-6"
                    />
                </button>
            </div>

            <p className="mt-2 text-gray-700 text-sm">
                {description}
            </p>

        <footer className="mt-4">
            <a
                href={url}
                target="_blank"
                // rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
                onClick={() => console.log(url)}
            >
                Visit Resource
            </a>
        </footer>
    </div>

    );
}


export default Resources