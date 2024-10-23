import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/Slice.js";
import { useDispatch } from "react-redux";

const apiUrl = import.meta.env.VITE_API_URL

function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const handleLogout = async () => {
    
        try {
            await axios.post(`${apiUrl}/api/v1/users/signOut`, {}, { withCredentials: true });
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error("Logout Error: ", error);
            alert("Failed to sign out"); 
        }
    };

    return (
        <button
            className="flex bg-red-600 text-white justify-center rounded-md items-center h-[50%] w-[5vw] hover:bg-red-700"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
