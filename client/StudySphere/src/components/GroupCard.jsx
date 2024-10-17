import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux";

function GroupCard({name, description, _id, leader }) {

    const navigate = useNavigate()
    const userData = useSelector((state) => state.userData)

    const viewGroup = () => {
        navigate(`/c/${_id}`)
    }


    const handleDeletion = async() => {
        try {
            const groupToBeDeleted = await axios.delete(`http://localhost:8000/api/v1/group/delete/${_id}`, {
               withCredentials: true 
            })

            if(!groupToBeDeleted) {
                throw new Error('Failed to delete group')
            }

            alert('Group has been deleted')
            navigate('/')

        } catch (error) {
            throw new Error(error?.message)
        }
    }

    return (
        <div 
        className="flex flex-col justify-between bg-gradient-to-r from-blue-300 to-blue-400 h-[14vw] w-[25vw] cursor-pointer rounded-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl shadow-md p-4 space-y-4" 
        onClick={viewGroup}
      >
        <div className="flex justify-end">
          {
            userData.fullName === leader ? (
              <img
            src="https://www.shutterstock.com/image-vector/trash-bin-icon-vector-recycle-260nw-1909485802.jpg"
            className="h-[2vw] w-[2vw] rounded-full hover:shadow-md hover:shadow-red-400 transition-shadow duration-300"
            alt="delete"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening up the group while deleting
              handleDeletion();
            }}
          />
            ) : null
          }
        </div>
      
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
          <h2 className="text-md text-gray-600">Description: {description}</h2>
        </div>
      
        <footer className="flex justify-between items-center border-t pt-2">
          <p className="text-sm text-gray-700 font-medium">Leader: {leader}</p>
        </footer>
      </div>
      
    )
}

export default GroupCard