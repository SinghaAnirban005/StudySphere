import React from "react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

function Home() {

    const [ loading, setLoading ] = useState(true)
    const userStatus = useSelector((state) => state.staus)

    return (
        <div className="min-h-[calc(100vh-5vw)] bg-red-500">   
            <h1>Home page</h1>
        </div>
    )
}

export default Home