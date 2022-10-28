import React, { useState } from 'react';
import useSWR from 'swr';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput';
import Card from '../components/Card';
import { useRouter } from 'next/router';
import { btnStyle } from '../utils/utils';
import toast from 'react-hot-toast';

const MoviesPage = () => {
  const [pageCount, setPageCount] = useState(1);
  const { back } = useRouter();

  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/discover/movie/?api_key=2a3efbbdcc66ed82dfbc4902bb7c157c&page=${pageCount}`
  );
  if (error) toast.error(error);

  const prevPage = () => {
    if (pageCount < 1) return;
    setPageCount((prev) => prev - 1);
  };

  const nextPage = () => {
    setPageCount((prev) => prev + 1);
  };

  return (
    <section className="container mx-auto my-6">
      <h2 className="text-xl text-center my-6">Discover Movies</h2>
      <div className="flex items-center justify-between sm:mx-0 mx-4">
        <SearchInput media="movie" />
        <button className={`${btnStyle} mt-0 px-1`} onClick={() => back()}>
          Go back
        </button>
      </div>
      <div className="my-6 grid">
        {!error && !movies ? (
          <Loader />
        ) : (
          movies?.results.map((item) => (
            <Card id={item.id} key={item.id} item={item} media="movie" />
          ))
        )}
      </div>
      <div className="flex justify-center items-center">
        {pageCount > 1 && (
          <button className={btnStyle} onClick={prevPage}>
            Prev
          </button>
        )}
        <button className={btnStyle} onClick={nextPage}>
          Next
        </button>
      </div>
    </section>
  );
};

export default MoviesPage;
