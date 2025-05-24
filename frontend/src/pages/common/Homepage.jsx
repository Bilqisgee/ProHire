import mockProfiles from "@/store/admin/profile.js";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Facebook, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";



function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to calculate the number of visible profiles based on screen width
  const getVisibleProfiles = () => {
    return window.innerWidth >= 1024 ? 5 : 3; // 5 for large screens, 3 for smaller screens
  };

  const handlePrev = () => {
    const visibleProfiles = getVisibleProfiles();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mockProfiles.length - visibleProfiles : prevIndex - 1
    );
  };

  const handleNext = () => {
    const visibleProfiles = getVisibleProfiles();
    setCurrentIndex((prevIndex) =>
      prevIndex >= mockProfiles.length - visibleProfiles ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="mx-auto w-full p-4  relative">
      {/* Section 1 */}
      <div
        className="mx-auto w-full h-80 p-4 mt-6 shadow-lg rounded-xl  sm:bg md:bg-cover bg-center bg-[url(/src/assets/homepage.jpg)] bg-local ">
        <div className="relative z-10">
          <div className="mt-10 text-gray-200">
            <h1 className="text-pretty font-semibold text-5xl">
              Welcome to
              <span className="text-green-950 font-bold text-5xl">ProHire</span>
            </h1>
            <p className="font-bold md:break-inside-auto italic text-2xl flex-shrink-0 ">
              At <span className="text-green-950 font-bold">ProHire</span>, we
              make it effortless to find skilled domestic workers tailored to your
              needs. Whether you need a cleaner, cook, nanny, or any household
              help, we connect you with trusted professionals in just a few
              clicks.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 - Profile Carousel */}
      <div className="relative w-full  mx-auto mt-10 bg-white p-4 rounded-lg shadow-md overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition z-10"
        >
          <ChevronLeft />
        </button>

        {/* Profile Cards */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / getVisibleProfiles())}%)` }}
        >
          {mockProfiles.map((profile, index) => (
            <div
              key={index}
              className="min-w-[calc(33.33%-1rem)] lg:min-w-[calc(20%-1rem)] mx-2 bg-white border-2 border-green-950 p-4 rounded-lg shadow flex-shrink-0 transition-transform duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-xl"
            >
              <img
                src={profile.image}
                alt="profile picture"
                className="w-32 h-32 mx-auto mb-4 object-cover "
              />
              <h3 className="text-center font-bold">{profile.name}</h3>
              <p className="text-center text-gray-500">{profile.title}</p>
              <p className="text-center text-gray-400">{profile.gender}</p>
              <button className="mt-2 bg-green-950 text-white py-1 px-4 rounded hover:bg-green-900 block mx-auto">
                View
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition z-10"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Section 3 - How to Hire */}
      <div className="relative w-full  mx-auto mt-10 bg-white p-4 text-center ">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          How to Hire Workers Through <span className="text-green-950 text-4xl">ProHire</span>
        </h1>

        <div className="flex items-center justify-center space-x-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center border-2 border-green-950 rounded-full text-green-950 text-xl font-bold">
              1
            </div>
            <h2 className="font-semibold mt-3 text-green-950">Select Your Worker</h2>
            <p className="text-gray-600 max-w-xs text-sm mt-1 ">
              Describe your needs and choose from background-checked, client-reviewed professionals.
            </p>
          </div>

          {/* Arrow */}
          <ArrowRight className="text-green-950 w-8 h-8 hidden md:block" />

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center border-2 border-green-950 rounded-full text-green-950 text-xl font-bold">
              2
            </div>
            <h2 className="font-semibold mt-3 text-green-950">Schedule a Time</h2>
            <p className="text-gray-600 max-w-xs text-sm mt-1">
              Pick a time that works for you and get your task done effortlessly.
            </p>
          </div>

          {/* Arrow */}
          <ArrowRight className="text-green-950 w-8 h-8 hidden md:block" />

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center border-2 border-green-950 rounded-full text-green-950 text-xl font-bold">
              3
            </div>
            <h2 className="font-semibold mt-3 text-green-950">Pay When Done</h2>
            <p className="text-gray-600 max-w-xs text-sm mt-1">
              Only pay through ProHire once the task is completed to your satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4- footer */}
      <div className="w-full bg-green-950 p-6 text-white mt-10 rounded-lg shadow-sm">
        <footer className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div className="space-y-2">
            <h2 className="font-semibold">About Us</h2>
            <p>Feedback</p>
            <p>Trust, Safety & Security</p>
          </div>

          {/* Middle Section */}
          <div className="space-y-2">
            <h2 className="font-semibold">Help & Support</h2>

            <p>Terms of Service</p>
          </div>

          {/* Right Section */}
          <div className="space-y-2">
            <h2 className="font-semibold">Privacy Policy</h2>
            <p>Cookie Settings</p>
          </div>
        </footer>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mt-6">
          <Facebook className="w-6 h-6 cursor-pointer hover:text-gray-400" />
          <Linkedin className="w-6 h-6 cursor-pointer hover:text-gray-400" />
          <Twitter className="w-6 h-6 cursor-pointer hover:text-gray-400" />
          <Youtube className="w-6 h-6 cursor-pointer hover:text-gray-400" />
          <Instagram className="w-6 h-6 cursor-pointer hover:text-gray-400" />
        </div>

        {/* Divider */}
        <hr className="border-gray-500 my-4" />

        {/* Bottom Section */}
        <div className="text-center text-sm">
          © 2025 ProHire Inc.
        </div>


      </div>

    </div>
  );
}

export default Homepage