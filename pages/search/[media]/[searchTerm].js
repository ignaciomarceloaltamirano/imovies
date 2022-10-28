import React, { useState } from 'react';
import useSWR from 'swr';
import Loader from '../../../components/Loader';
import SearchInput from '../../../components/SearchInput';
import Card from '../../../components/Card';
import { useRouter } from 'next/router';
import NoResults from '../../../components/NoResults';
import { btnStyle } from '../../../utils/utils';
import toast from 'react-hot-toast';

const TvSearchPage = () => {
  const [pageCount, setPageCount] = useState(1);
  const { query, back } = useRouter();
  const search = query.searchTerm;
  const media = query.media;

  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/search/${media}?api_key=${process.env.API_KEY}&language=en-US&query=${search}&page=${pageCount}&include_adult=false`
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
    <section className="container my-6 mx-auto">
      <h2 className="text-xl text-center my-6 mx-4 sm:mx-0">
        Discover {media === 'tv' ? 'TV Shows' : 'Movies'}
      </h2>
      <div className="flex items-center justify-between mx-4 sm:mx-0">
        <SearchInput media={media} />
        <button className={`${btnStyle} mr-0`} onClick={() => back()}>
          Go back
        </button>
      </div>
      <div className="my-6 grid mx-4 sm:mx-0">
        {!error && !data ? (
          <Loader />
        ) : (
          data?.results.map((item) => (
            <Card id={item.id} key={item.id} item={item} media={media} />
          ))
        )}
        {data?.results.length === 0 && <NoResults term={search} />}
      </div>
      <div className="flex justify-center items-center">
        {pageCount > 1 && (
          <button className={btnStyle} onClick={prevPage}>
            Prev
          </button>
        )}
        {data?.results.length < 20 ? null : (
          <button className={`${btnStyle} ml-4`} onClick={nextPage}>
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default TvSearchPage;
