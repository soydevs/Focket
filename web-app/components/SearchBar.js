const SearchBar = ({ searchValue, handleSearch = () => {} }) => {
  return (
    <div>
      <input
        type='text'
        value={searchValue}
        placeholder='Search articles'
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button
        disabled={!searchValue}
        onClick={() => handleSearch("")}
        className='btn'
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
