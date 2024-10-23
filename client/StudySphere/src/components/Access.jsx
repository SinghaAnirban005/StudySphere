import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { groups } from "../store/Slice.js";
import { Comment } from "react-loader-spinner";

function Access() {
  
const apiUrl = import.meta.env.VITE_API_URL

    const {groupId} = useParams()
    const [member, setMember] = useState(false)
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()
    
    const joinGroup = async() => {
        try {
          setLoading(true)
            const data = {
                username : userData.username,
                email : userData.email
            }

            const signUp = await axios.post(`${apiUrl}/api/v1/group/add/${groupId}`, data, {
                withCredentials: true
            })

            if(!signUp) {
                throw new Error("Failed to add user to group")
            }
       
            dispatch(groups(signUp.data.data._id))
            alert('Succesfully joined group')

            navigate(`/c/${groupId}`)
        } catch (error) {
            console.log(error)
            throw new Error("Something went wrong" + error?.message)
        }
        finally{
          setLoading(false)
        }
    }


    const navigateToGroup = () => {
        navigate(`/c/${groupId}`)

    }
    const userData = useSelector((state) => state.userData)
    useEffect(() => {
      
      console.log(userData)
      const isMember = userData.groups.includes(groupId)

        if(isMember) {
            setMember(true)
        }

    }, [])

    return (
        loading ? (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <Comment
                     visible={true} 
                     height="80" 
                     width="80" 
                     color="yellow" 
                     ariaLabel="comment-loading" 
                    />
            </div>
        ) : (
          !member ? (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl shadow-black p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Join the Study Group</h2>
              
              <p className="text-gray-600 text-center mb-6">
                To view and participate in group resources and discussions, you need to join the group first. Don't miss out on the collaborative learning experience!
              </p>
              
              <div className="flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                    onClick={joinGroup}
                >
                  Join Group
                </button>
              </div>
             
            </div>
          </div>
          ) :
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
          <div className="max-w-md w-full bg-white rounded-lg shadow-xl shadow-black p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Welcome Back to the Group!
            </h2>
            
            <p className="text-gray-600 text-center mb-6">
              You are already a member of this study group. Click below to access group resources and join the discussions.
            </p>
            
            <div className="flex justify-center">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                onClick={navigateToGroup}
              >
                Go to Group
              </button>
            </div>
            
            {/* Optional additional message */}
            <div className="mt-6 text-center text-gray-500 text-sm">
              Need help? <a className="text-blue-600 hover:text-blue-800 cursor-pointer">Contact Support</a>
            </div>
          </div>
        </div>
        
        )
      
    )
}

export default Access