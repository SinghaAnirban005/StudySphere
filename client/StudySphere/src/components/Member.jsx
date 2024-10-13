import React from "react";

function Member({username, profilePic, email}) {
    return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-lg h-[4vw] cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <img src={profilePic} alt="Profile" className="h-[4vw] w-[4vw] rounded-full object-cover" />
        <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800">{username}</h2>
            <p className="text-sm text-gray-500">{email}</p> 
        </div>
    </div>
    )
}

export default Member