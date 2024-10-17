import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const userStatus = useSelector((state) => state.status);
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();

  return userStatus ? (
    <div className="flex justify-around items-center bg-gradient-to-r from-slate-400 to-slate-800 min-h-[calc(100vh-5vw)] p-8">
      <section className="min-h-[40vw] max-w-[50vw] space-y-6">
        <h1 className="text-[4vw] font-bold text-white">
          Welcome to <span className="text-yellow-400">Study Sphere</span>
        </h1>
        <h2 className="text-[2vw] mt-[1vw] text-gray-200">
          {userData.fullName}
        </h2>
        <p className="text-[1.2vw] mt-[3vw] text-gray-300 leading-relaxed">
          Empower your group studies with seamless collaboration, shared
          resources, and smarter learning tools to achieve success together.
        </p>
        <div className="mt-[2vw] space-y-2 text-white">
          <p className="font-semibold">Why Choose Us?</p>
          <p>• Collaborate Seamlessly</p>
          <p>• Create groups, share resources</p>
        </div>
        <div className="mt-[4vw] flex space-x-4">
          <button
            className="bg-white text-black font-semibold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-yellow-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-500 active:scale-95"
            onClick={() => navigate("/joinGroups")}
          >
            Join Groups
          </button>
          <button
            className="bg-white text-black font-semibold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-yellow-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-500 active:scale-95"
            onClick={() => navigate("/group")}
          >
            Create Groups
          </button>
          <button
            className="bg-white text-black font-semibold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-yellow-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-500 active:scale-95"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </button>
        </div>
      </section>
      <img
        src={userData.profilePic}
        alt="Profile Pic"
        className="rounded-[12vw] shadow-xl shadow-slate-900 h-[40vw] max-w-[40vw] object-cover transform transition-transform hover:scale-105"
      />
    </div>
  ) : (
    <div className="flex justify-around items-center min-h-[calc(100vh-5vw)] bg-gradient-to-r from-transparent to-yellow-400 p-8">
      <img
        src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlOV8zZF9jaGFyYWN0ZXJfaWxsdXN0cmF0aW9uX2Z1bGxib2R5X2lzb2xhdGVkX2luX19mY2Q2NjZjNy1mMzJjLTQ1MzQtYmQ3NS05NTI0NzgxZjUzYmNfMi5wbmc.png"
        alt="Cartoon"
        className="h-[40vw] rounded-xl shadow-lg transform transition-transform hover:scale-105"
      />
      <div className="max-w-[70vw] h-[40vw] text-center space-y-6">
        <h1 className="text-[3vw] font-bold text-gray-900">
          Revolutionize How You Collaborate and Learn Together!
        </h1>
        <h2 className="text-[1.8vw] mt-[1.3vw] text-gray-700">
          Empower your group studies with seamless collaboration, shared
          resources, and smarter learning tools.
        </h2>
        <h2 className="text-[1.8vw] mt-[4vw] text-gray-800">
          Ready to Boost Your Learning Experience?
        </h2>
        <button
          className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-200 transition duration-300 mt-[2vw] shadow-md transform transition-transform hover:scale-105"
          onClick={() => navigate("/login")}
        >
          Join Us Today
        </button>
      </div>
    </div>
  );
}

export default Home;
