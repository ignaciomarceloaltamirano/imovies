/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const Card = ({ id, item, media }) => {
  const cardStyle =
    'rounded flex justify-center align-center flex-col p-2 hover:bg-primary-color bg-secondary-color transition-all ease-in duration-200 cursor-pointer relative ';
  return (
    <Link href={media === 'movie' ? `/movie/${id}` : `/tv/${id}`}>
      <div className={cardStyle}>
        <span className="absolute text-sm p-1 rounded -right-0 -top-3 z-10 bg-[#69306d] cursor-default">
          {item.vote_average.toFixed(1)}
        </span>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
            alt={item.title || item.name}
          />
        </div>
        <h2 className="text-sm text-center flex-wrap my-2">
          {item.title || item.name || item.original_title}
        </h2>

        <p className="text-sm text-center capitalize">
          {item.release_date || item.first_air_date}
        </p>
      </div>
    </Link>
  );
};

export default Card;
