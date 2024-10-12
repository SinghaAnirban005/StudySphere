import React from "react";
import { useEffect, useState } from "react";
import Member from "./Member.jsx";
import axios from "axios"
import { useParams } from "react-router-dom";

function Group() {

    const [groupData, setGroupData] = useState({})
    const [mem, setMem] = useState(true)
    const [res, setRes] = useState(false)
    const [vid, setVid] = useState(false)

    const [members, setMembers] = useState([])
    const userId = useParams()

    useEffect(() => {
      
        const fetchUser = async function () {   
            const newId = userId.groupId
         
            const memberData = await axios.get(`http://localhost:8000/api/v1/group/c/${newId}`, {withCredentials: true})

            if(!memberData) {
                throw new Error('No member data')
            }

            setMembers(memberData.data.data)
            

        }

        fetchUser()
        
    }, [])

    const handleMem = () => {
        setRes(false)
        setVid(false)
        setMem(true)
    }

    const handleRes = () => {
        setRes(true)
        setVid(false)
        setMem(false)
    }

    const handleVid = () => {
        setRes(false)
        setVid(true)
        setMem(false)
    }

     
    return (
        <div className="flex justify-around min-h-[calc(100vh-5vw)] bg-gradient-to-r from-slate-400 to-slate-800">
            <div className="bg-white w-[50%] rounded-xl">
                Chat section
            </div>

            <div className="flex flex-col mt-[1vw]">
                <div className="flex w-[45vw] justify-between gap-[1vw]">
                    <button onClick={handleMem}  className="bg-yellow-400 text-slate-800 py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105">
                        Members
                    </button>
                    <button onClick={handleRes} className="bg-yellow-400 text-slate-800 py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105">
                        Resources
                    </button>
                    <button  onClick={handleVid} className="bg-yellow-400 text-slate-800 py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105">
                        Video
                    </button>
                </div>

                {
                    mem && (
                        <ul className="h-[35vw] mt-[2vw]" >
                            <Member />
                        </ul>
                    )
                }


                {
                    res && (
                        <div className="h-[35vw] mt-[2vw]" >
                            Resources here
                        </div>
                    )
                }


                {
                    vid && (
                        <div className="h-[35vw] mt-[2vw]">
                            Video call here
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Group