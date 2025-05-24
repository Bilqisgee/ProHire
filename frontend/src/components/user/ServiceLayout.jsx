// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SearchContext } from '@/context/SearchContext.jsx';
import { FiSearch } from 'react-icons/fi';
import { MdCancel } from "react-icons/md";
import { useLocation } from "react-router-dom";

function ServiceLayout() {
  const { isSearched, searchFilter, setSearchFilter, setIsSearched } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState(searchFilter.title || '');

  const location = useLocation();
  const isAdminView = location.pathname.includes("/user/service/admin-view/");

  const handleOnSearch = () => {
    setSearchFilter({ title: searchTerm });
    setIsSearched(true);
  };

  const handleClearSearch = () => {
    setSearchFilter({ title: "" });
    setIsSearched(false);
    setSearchTerm("");
  };

  return (
    <div className=''>
      {/* Search Input */}
      {!isAdminView && (
        <div className="mt-10 flex items-center justify-center">
          <div className="flex items-center border-2 border-green-950 rounded-lg overflow-hidden bg-white bg-opacity-90">
            <input
              type="text"
              placeholder="Search for help"
              className="bg-transparent lg:p-3 p-2 focus:outline-none w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleOnSearch()} // Allow search on Enter key
            />
            <FiSearch
              className="text-green-950 mx-2 border-l-green-950 hover:text-green-900 cursor-pointer transition-colors"
              onClick={handleOnSearch}
            />
          </div>
        </div>
      )}

      {/* Display Current Search Filter */}
      {!isAdminView && isSearched && searchFilter.title !== "" && (
        <div>
          <h3 className='font-medium text-lg mt-4 ml-5'>Current Search</h3>
          <div className='mb-4 text-white'>
            <span className='inline-flex items-center gap-2.5 bg-green-900 border-green-950 px-4 py-1.5 rounded ml-5 mt-10'>
              {searchFilter.title}
              <MdCancel
                className="cursor-pointer hover:text-red-500"
                onClick={handleClearSearch} // Clear search on cancel
              />
            </span>
          </div>
        </div>
      )}

      {/* Render Child Routes */}
      <Outlet />
    </div>
  );
}

export default ServiceLayout;
