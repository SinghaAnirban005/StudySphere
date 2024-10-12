import React from "react";
import { useNavigate } from "react-router-dom"

function GroupCard({name, description, _id}) {

    const navigate = useNavigate()
   
    const viewGroup = () => {
        navigate(`/c/${_id}`)
    }

    return (
        <div className="flex flex-col justify-between bg-gradient-to-r from-blue-300 to-blue-400 h-[14vw] w-[25vw] cursor-pointer rounded-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-xl" onClick={viewGroup}>
            <img
                src="https://www.shutterstock.com/image-vector/trash-bin-icon-vector-recycle-260nw-1909485802.jpg"
                className="h-[2vw] w-[2vw] rounded-xl"
                alt="delete"
            />
            <div className="flex flex-col items-center">
                <h1>{name}</h1>
                <h2>Description : {description}</h2>
            </div>

            <footer className="flex justify-between">
                <p>Leader : Anirban Singha</p>
            </footer>
        </div>
    )
}

export default GroupCard