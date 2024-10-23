import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function GroupCard2({name, description, leader, id }) {

  const navigate = useNavigate()

  const viewGroup = async () => {
      try {
        navigate(`join/${id}`)
      } catch (error) {
        
      }
  }

    return (
        <div 
        className="flex flex-col justify-between bg-gradient-to-r from-blue-300 to-blue-400 h-[14vw] w-[25vw] cursor-pointer rounded-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl shadow-md p-4 space-y-4"
        onClick={viewGroup} 
      >
        <div className="flex flex-col items-center mt-[3vw] space-y-2">
          <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
          <h2 className="text-md text-gray-600">Description: {description}</h2>
        </div>
      
        <footer className="flex justify-between items-center border-t pt-2">
          <p className="text-sm text-gray-700 font-medium">Leader: {leader}</p>
        </footer>
      </div>
      
    )
}

export default GroupCard2