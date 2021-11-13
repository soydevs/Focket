import React, { useEffect, useState } from "react";

const SearchBar = ({ handleSearch = () => {} }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div>
      <input
        type='text'
        value={query}
        placeholder='Search articles'
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
