import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchInput = ({ media }) => {
  const [search, setSearch] = useState('');
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (search === '' || !search) return;
    push(`/search/${media}/${search}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const btnStyle =
    'bg-secondary-color hover:bg-primary-color transition-all ease-in duration-300 mr-3 sm:px-4 px-2 py-2 sm:text-base text-sm rounded';
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="sm:px-4 px-2 py-2 inline-block rounded-sm text-black outline-0 text-sm sm:w-4/6 w-1/2"
        placeholder="Search"
        onChange={handleChange}
        value={search}
      />
      <button className={btnStyle} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
