
// eslint-disable-next-line no-unused-vars
import React, { createContext, useState , useEffect} from 'react';


export const SearchContext = createContext();

// eslint-disable-next-line react/prop-types
export const SearchProvider = ({ children }) => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchFilter, setSearchFilter] = useState(() => {
    const savedFilter = localStorage.getItem('searchFilter');
    return savedFilter ? JSON.parse(savedFilter) : { title: "" };
  });

  useEffect(() => {
    localStorage.setItem('searchFilter', JSON.stringify(searchFilter));
  }, [searchFilter]);


  return (
    <SearchContext.Provider value={{ isSearched, setIsSearched, searchFilter, setSearchFilter }}>
      {children}
    </SearchContext.Provider>
)};

