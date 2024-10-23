import React, { useEffect } from "react";
import { useState } from "react";
import Input from "./Input.jsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import GroupCard from "./GroupCard.jsx";
import { groups } from "../store/Slice.js";
import { Comment } from "react-loader-spinner"

const apiUrl = import.meta.env.VITE_API_URL

function MyGroups() {

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [leaders, setLeaders] = useState([])
    const [data, setData] = useState([])
    const [leaderName, setLeaderName] = useState('')

    const openForm = () => {
        setIsOpen(true)
    }

    const closeForm = () => {
        setIsOpen(false)
    }

    const createGroup = async(data) => {
        try {   
            const group = await axios.post(`${apiUrl}/api/v1/group/createGroup`, data, {
                withCredentials: true
            })
            
            if(!group) {
                throw new Error(400, "Failed to create group")
            }

            dispatch(groups(group.data.data._id))
            alert('Study Group has been succesfully created ')
            setIsOpen(false)
        } catch (error) {
          alert('⚠️ Cannot create Group ⚠️')
            throw new Error(error?.message)
        }
    }

    useEffect(() => {
      setLoading(true)
      const fetchGroups = async () => {
        try {
          
          const cadet = await axios.get(
            `${apiUrl}/api/v1/users/getGroups`,
            { withCredentials: true }
          );        

          setData(cadet.data.data);

        } catch (error) {
          console.error("Error loading groups", error);
        }
        finally{
          setLoading(false)
        }
      };
  
      fetchGroups();
    
    }, [])
    

    return (
        loading ? (
          <div className="flex min-h-[calc(100vh-5vw)] justify-center items-center bg-gradient-to-r from-slate-400 to-slate-800">
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
          <div className="flex flex-col min-h-[calc(100vh-5vw)] items-center bg-gradient-to-r from-slate-400 to-slate-800">
            <button onClick={openForm} className="bg-blue-500 max-w-[10vw] mt-[1vw] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 h-[3vw] transition duration-300">
                Create
            </button>

            {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg relative max-w-[90%] w-full md:max-w-[40%]">
       
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Create your Group</h2>

            <form onSubmit={handleSubmit(createGroup)}>
              <div className="mb-4">
                <Input
                    label="Group Name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    {
                        ...register(
                            "name",{
                                required: true
                            }
                        )
                    }
                />
              </div>

              <div className="mb-4">
              <Input
                    label="Description"
                    placeholder="Max 20 words"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    {
                        ...register(
                            "description",{
                                required: true
                            }
                        )
                    }
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {
        !isOpen && (
          <ul className="flex flex-wrap justify-center max-w-[100%] px-[2vw] gap-[1vw] min-h-[40vw] mt-[1vw]">
        {
          data.map((card, index) => (
            <li className="" key={index}>
              <GroupCard name={card.name} description={card.description} _id={card._id} leader={card.leader.fullName} />
            </li>
          ))
        }
      </ul>
        )
      }

        </div>
        )
    )
}

export default MyGroups