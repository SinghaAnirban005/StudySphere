import React from "react";
import { useState, useEffect } from "react";
import Input from "./Input";
import GroupCard from "./GroupCard.jsx";
import axios from "axios";

function JoinG() {

    const [groups, setGroups] = useState([])
    useEffect(() => {
        const fetchGroups = async () => {
          try {
            const item = await axios.get('http://localhost:8000/api/v1/group/getG');
      
            if (!item) {
              throw new Error("Failed to fetch groups");
            }
      
            setGroups(item.data.data)
          } catch (error) {
            console.error("Error fetching groups:", error);
          }
        };
      
        fetchGroups();
      }, []);

    return (
        <div className="flex flex-col min-h-[calc(100vh-5vw)] items-center bg-gradient-to-r from-slate-400 to-slate-800">
            <div className="flex justify-center items-center gap-[1vw] mt-[2vw]">
                <Input 
                    placeholder="Search for groups"
                />
                <button className="h-[2vw] w-[2vw]">
                    <img src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png" alt="serach" />
                </button>
            </div>

            <ul className="flex flex-wrap justify-center max-w-[100%] px-[2vw] gap-[1vw] min-h-[40vw] mt-[1vw]">
                {
                groups.map((card) => (
                    <li className="">
                    <GroupCard name={card.name} description={card.description} />
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default JoinG