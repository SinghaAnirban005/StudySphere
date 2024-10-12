import React from "react";

function Member({username, profilePic}) {
    return (
        <div className="flex items-center justify-between bg-white rounded-2xl h-[4vw] cursor-pointer">
            <img src={profilePic} alt="profile" className="" />
            <h2 className="">
                {username}
            </h2>
        </div>
    )
}

export default Member