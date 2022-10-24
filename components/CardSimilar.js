/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const CardSimilar = ({ id, item }) => {
  // console.log(item);
  // console.log(id);
  return (
    <Link href={item.title ? `/movie/${id}` : `/tv/${id}`}>
      <a>
        <div className="rounded flex justify-center align-center flex-col p-2 hover:bg-primary-color bg-secondary-color transition-all ease-in duration-200 cursor-pointer relative">
          <span className="absolute text-sm p-1 rounded -right-0 -top-3 z-10 bg-[#69306d] cursor-default">
            {item.vote_average.toFixed(1)}
          </span>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
              alt={item.title || item.name}
            />
          </div>
          <h2 className="text-md text-center flex-wrap my-4">
            {item.title || item.name || item.original_title}
          </h2>

          <p className="text-md text-center capitalize">
            {item.release_date || item.first_air_date}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default CardSimilar;
