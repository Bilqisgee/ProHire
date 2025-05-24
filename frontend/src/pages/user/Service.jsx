// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { ServiceCategory } from '@/config';
import profiles from '@/store/admin/profile';
import ProfileCard from "@/components/user/ProfileCard";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { SearchContext } from '@/context/SearchContext.jsx';
import { fetchAllProfiles } from '@/store/admin/ProfileSlice';
import { useDispatch, useSelector } from 'react-redux';

function Service() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { searchFilter } = useContext(SearchContext);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  const dispatch = useDispatch();
  const userProfiles = useSelector((state) => state.profile.serviceProfiles); // Assuming this holds the fetched profiles
  console.log(userProfiles);
  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, [dispatch]);

  useEffect(() => {
    // Combine mock profiles with fetched user profiles
    const allProfiles = [...(Array.isArray(userProfiles) ? userProfiles : []), ...profiles];

    const matchesCategory = (profile) =>
      selectedCategories.length === 0 || selectedCategories.includes(profile.category);

    const matchesTitle = (profile) =>
      searchFilter.title === "" || profile.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const newFilteredProfiles = allProfiles.filter(
      (profile) => matchesCategory(profile) && matchesTitle(profile)
    );

    setFilteredProfiles(newFilteredProfiles);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [selectedCategories, searchFilter, userProfiles]); // Add userProfiles to dependencies

  function handleCategoryChange(category) {
    setSelectedCategories(
      prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  }

  console.log("Selected Categories:", selectedCategories);
  console.log("Search Filter:", searchFilter);
  console.log("Filtered Profiles:", filteredProfiles);

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      {/* Category */}
      <div>
        <h3 className='font-medium text-lg py-4'>Search by Category</h3>
        <ul className='space-y-4 text-green-950'>
          {ServiceCategory.map((category, index) => (
            <li className='flex gap-3 items-center' key={index}>
              <input
                className='scale-125'
                type="checkbox"
                onChange={() => handleCategoryChange(category)}
                checked={selectedCategories.includes(category)}
              />
              {category}
            </li>
          ))}
        </ul>
      </div>

      <section className='w-full lg:w-3/4 text-green-950 max-lg:px-4 lg:ml-40'>
        <h1 className='font-medium text-3xl py-2' id='profile-list'>Hire a Professional</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {filteredProfiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((profile, index) => (
            <ProfileCard
              key={index}
              name={profile.name}
              title={profile.title}
              gender={profile.gender}
              image={profile.image}
              id={profile._id}
            />
          ))}
        </div>
        {/* Pagination */}
        {
          filteredProfiles.length > 0 && (
            <div className='flex items-center justify-center space-x-2 mt-10'>
              <a href="#profile-list" key="prev">
                <FaArrowLeft onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
              </a>
              {Array.from({ length: Math.ceil(filteredProfiles.length / itemsPerPage) }).map((_, index) => (
                <a href="#profile-list" key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-green-950' : 'text-green-900'}`}
                  >
                    {index + 1}
                  </button>
                </a>
              ))}
              <a href="#profile-list" key="next">
                <FaArrowRight onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredProfiles.length / itemsPerPage)))} />
              </a>
            </div>
          )
        }
      </section>
    </div>
  );
}

export default Service;