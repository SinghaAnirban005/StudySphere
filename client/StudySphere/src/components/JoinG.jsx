import React from "react";
import { useState, useEffect } from "react";
import Input from "./Input";
import GroupCard2 from "./GroupCard2.jsx";
import { Comment } from "react-loader-spinner";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

function JoinG() {

    const [loading, setLoading] = useState(false)
    const [groups, setGroups] = useState([])
    const [item, setItem] = useState('')

    const handleSearch = async() => {
      try {
          const data = await axios.get(`${apiUrl}/api/v1/group/filterGroups`,{
            params: {
              name: item || ''
            },
            withCredentials: true
          })
    

          if(!data) {
            throw new ApiError(400, "Search parameters not defined well")
          }

          console.log(data)
          setGroups(data.data.data)

      } catch (error) {
        throw new Error("Failed to search groups !!")
      }
    }

    useEffect(() => {
      setLoading(true)
        const fetchGroups = async () => {
          try {
            const item = await axios.get(`${apiUrl}/api/v1/group/getG`);
      
            if (!item) {
              throw new Error("Failed to fetch groups");
            }
          
            setGroups(item.data.data)
          } catch (error) {
            console.error("Error fetching groups:", error);
          }
          finally{
            setLoading(false)
          }
        };
      
        fetchGroups();
      }, []);

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
      <div className="relative flex justify-center items-center gap-[1vw] mt-[2vw]">
        <div className="relative">
          
          <Input
            className="shine-effect h-[3vw] w-[25vw] pl-[1vw] pr-[4vw] text-black rounded-full focus:outline-none shadow-lg"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Search for groups"
          />
   
          <div className="shine-glow"></div>
        </div>
        <button
          className="h-[3vw] w-[3vw] bg-blue-600 rounded-full flex justify-center items-center shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out"
          onClick={handleSearch}
        >
          <img
            src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png"
            alt="search"
            className="h-[50%] w-[50%]"
          />
        </button>
      </div>
    
      <ul className="flex flex-wrap justify-center max-w-[100%] px-[2vw] gap-[1vw] min-h-[40vw] mt-[1vw]">
        {groups.map((card) => (
          <li key={card._id} className="">
            <GroupCard2
              name={card.name}
              description={card.description}
              leader={card.leader.fullName}
              id={card._id}
            />
          </li>
        ))}
      </ul>
    </div>
    
      )
    )
}

export default JoinG