import React from "react";
import { useState } from "react";
import Input from "./Input.jsx";
import { useForm } from "react-hook-form";
import axios from "axios";

function MyGroups() {

    const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit } = useForm()

    const openForm = () => {
        setIsOpen(true)
    }

    const closeForm = () => {
        setIsOpen(false)
    }

    const createGroup = async(data) => {
        try {   
            const group = await axios.post('http://localhost:8000/api/v1/group/createGroup', data, {
                withCredentials: true
            })
            
            if(!group) {
                throw new Error(400, "Failed to create group")
            }

            alert('Study Group has been succesfully created ')
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-5vw)] bg-gradient-to-r from-slate-400 to-slate-800">
            <button onClick={openForm} className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 h-[3vw] transition duration-300">
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

        </div>
    )
}

export default MyGroups