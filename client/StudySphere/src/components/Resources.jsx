import React from "react";

function Resources({ title, description, url }) {

    return (
        <div className="flex flex-col justify-between bg-gradient-to-r from-green-300 to-green-500 h-[8vw] w-[100%] cursor-pointer rounded-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4">
            
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            </div>

            <p className="mt-2 text-gray-700 text-sm">
                {description}
            </p>

            <footer className="mt-4">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                >
                    Visit Resource
                </a>
            </footer>
        </div>
    );
}


export default Resources