import React from "react";
import { useEffect, useState } from "react";
import Member from "./Member.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Input from "./Input.jsx";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Resources from "./Resources.jsx";

function Group() {

    const [groupData, setGroupData] = useState({})
    const [mem, setMem] = useState(true)
    const [res, setRes] = useState(false)
    const [vid, setVid] = useState(false)
    const { register, handleSubmit } = useForm()
    const [isOpen, setIsOpen] = useState(false)
    const [isRes, setIsRes] = useState(false)

    const [members, setMembers] = useState([])
    const [resources, setResources] = useState([])

    const userId = useParams()
    const navigate = useNavigate()

    const openForm = () => {
        setIsOpen(true)
    }

    const closeForm = () => {
        setIsOpen(false)
    }

    const openRes = () => {
        setIsRes(true)
    }

    const closeRes = () => {
        setIsRes(false)
    }

    useEffect(() => {
      
        const fetchUser = async function () {   
            const newId = userId.groupId
         
            const memberData = await axios.get(`http://localhost:8000/api/v1/group/c/${newId}`, {withCredentials: true})
            const resourceData = await axios.get(`http://localhost:8000/api/v1/resource/getResource/${newId}`, {withCredentials: true})
            if(!memberData) {
                throw new Error('No member data')
            }

            setMembers(memberData.data.data.member)
          
            setResources(resourceData.data.data)
        }

        fetchUser()
        
    }, [])

    // Methods to toggle between various headers
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

    const addMember = async(data) => {
        try {
            const addMem = await axios.post(`http://localhost:8000/api/v1/group/add/${userId.groupId}`, data, {
                withCredentials: true
            })
        
            if(!addMem) {
                throw new Error("Request failed to add members")
            }
            
            navigate('/group')
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    const addResource = async(data) => {
        try {
            const formData = new FormData

            formData.append("title", data.title)
            formData.append('url', data.url[0])
            formData.append('description', data.description)


            const liveResource = await axios.post(`http://localhost:8000/api/v1/resource/addResource/${userId.groupId}`, formData, {
                withCredentials: true
            })

            if(!liveResource) {
                throw new Error('Failed to request resource')
            }

            setIsRes(false)
            setResources(liveResource.data.data)

            navigate('/group')
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

     
    return (
        <div className="flex justify-around min-h-[calc(100vh-5vw)] bg-gradient-to-r from-slate-400 to-slate-800">
            <div className="bg-white w-[50%] rounded-xl">
                Chat section
            </div>

            {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg relative max-w-[90%] w-full md:max-w-[40%]">
       
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Add new Member</h2>

            <form onSubmit={handleSubmit(addMember)}>
              <div className="mb-4">
                <Input
                    label="Username"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    {
                        ...register(
                            "username",{
                                required: true
                            }
                        )
                    }
                />
              </div>

              <div className="mb-4">
              <Input
                    label="Email"
                    placeholder="Enter a valid email address "
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    {...register("email", {
                        required: "Email is required", 
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
                            message: "Please enter a valid email address" 
                        }
                    })}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-whites py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Member
              </button>
            </form>
          </div>
        </div>
      )}
    {/* Pop up form for adding resource  */}
        {isRes && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 shadow-lg relative max-w-[90%] w-full md:max-w-[40%]">
        
                <button
                onClick={closeRes}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                &times;
                </button>

                <h2 className="text-2xl font-bold mb-4">Add Resource</h2>

                <form onSubmit={handleSubmit(addResource)}>
                <div className="mb-4">
                    <Input
                        label="Title"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {
                            ...register(
                                "title",{
                                    required: true
                                }
                            )
                        }
                    />
                </div>

                <div className="mb-4">
                <Input
                        label="URL"
                        placeholder="Attest link to your file"
                        type="file"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register("url", {
                            required: true
                        })}
                    />
                </div>

                <div className="mb-4">
                <Input
                        label="Description"
                        placeholder="Keep it short"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register("description", {
                            required: true
                        })}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-whites py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Add 
                </button>
                </form>
            </div>
            </div>
        )}

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
                        <ul className="h-[30vw] mt-[2vw] flex flex-col overflow-y-auto gap-[1vw]" >
                            {
                                members.map((mtr) => (
                                    <li className="">
                                        <Member username={mtr.username} profilePic={mtr.profilePic} email={mtr.email} />
                                    </li>
                                ))
                            }
                        </ul> 
                    )

                }


                {
                    (res && !isRes) && (
                        <ul className="flex flex-col items-center h-[30vw] overflow-y-auto mt-[2vw] gap-[1vw]" >
                            {
                                resources.map((res) => (
                                    <li className="w-[70%]">
                                        <Resources title={res.title} description={res.description} url={res.url}  />
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }


                {
                    vid && (
                        <div className="h-[35vw] mt-[2vw]">
                            Video call here
                        </div>
                    )
                }

                {
                    mem && (
                        <button className="bg-blue-500 w-[10vw] mt-[2vw] text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95" onClick={openForm}>
                            Add Members
                        </button>
                    )
                }

                {
                    res && (
                        <button className="bg-blue-500 w-[10vw] mt-[2vw] text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95" onClick={openRes}>
                            Add Resource
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Group