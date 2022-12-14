/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';
import Video from '../../components/Video';
import { useSession } from 'next-auth/react';
import { useMainContext } from '../../context/mainContext';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import Card from '../../components/Card';
import { useState } from 'react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { btnStyle, episodeRuntime } from '../../utils/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import toast from 'react-hot-toast';

const Movie = ({ tv, videos, cast }) => {
  const {
    watchlist,
    addShowToWatchlist,
    removeShowFromWatchlist,
  } = useMainContext();
  const [pageCount, setPageCount] = useState(1);
  const { data: session } = useSession();
  const { back, query } = useRouter();
  const id = query.id;

  const { data: similar, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=${pageCount}`
  );
  if (error) toast.error(error);

  if (!tv || !videos || !cast) return <Loader />;

  const container = {
    hidden: { opacity: 0, y: '-200px' },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const prevPage = () => {
    if (pageCount < 1) return;
    setPageCount((prev) => prev - 1);
  };

  const nextPage = () => {
    setPageCount((prev) => prev + 1);
  };

  const inWatchlist = watchlist.find((item) => item.id === tv?.id);

  return (
    <section className="container mx-auto my-6">
      <button
        className={`${btnStyle} mx-4 sm:mx-0 mb-8`}
        onClick={() => back()}
      >
        Go back
      </button>
      <div className="details-grid mx-4 sm:mx-0">
        {/* IMAGE */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/w780${tv?.poster_path}`}
            alt={tv?.name}
          />
        </div>
        {/* INFO */}
        <div className="flex flex-col items-center justify-center sm:mt-0 mt-4">
          <motion.div variants={container} initial="hidden" animate="show">
            <div variants={item} className="flex items-center sm:mt-6">
              <h2 className="text-3xl font-bold">
                {tv?.name} {`(${tv?.first_air_date.slice(0, 4)})`}
              </h2>
              <p className="ml-auto text-lg">{episodeRuntime(tv)}</p>
            </div>

            <div className="my-4">
              {tv?.genres?.map((genre) => (
                <p
                  className="bg-secondary-color hover:bg-black transition-all duration-300 sm:mt-4 my-4 mr-4 p-2 border-2 rounded-full  border-primary-color inline-block"
                  key={genre?.id}
                >
                  {genre?.name}
                </p>
              ))}
            </div>
            <p className="text-lg max-w-prose">{tv?.overview}</p>
            {tv?.homepage && (
              <Link href={tv.homepage}>
                <a
                  className="font-bold inline-block mt-3 text-primary-color text-lg cursor-pointer"
                  target="_blank"
                  rel="noopener"
                >
                  Website
                </a>
              </Link>
            )}
            {session && (
              <button
                className={`${btnStyle} block`}
                onClick={
                  inWatchlist
                    ? () => removeShowFromWatchlist(tv)
                    : () => addShowToWatchlist(tv, cast)
                }
              >
                {inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              </button>
            )}
          </motion.div>
          {/* CAST */}
          <>
            <h3 className="text-2xl font-bold my-4">Casts</h3>
            <div className="casts">
              {cast?.slice(0, 5).map((member) => (
                <div key={member.id}>
                  <motion.img
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={`https://image.tmdb.org/t/p/w780${member?.profile_path}`}
                    alt={member.name}
                  />
                  <p className="text-sm text-center mt-2">{member?.name}</p>
                </div>
              ))}
            </div>
          </>
        </div>
      </div>
      {videos?.map((video) => (
        <Video key={video?.id} video={video} />
      ))}
      <h2 className="font-bold text-2xl my-6 sm:mx-0 mx-6">Similar TV Shows</h2>
      <Swiper
        className="swiper-container"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        modules={[Navigation, Scrollbar, Pagination, Autoplay]}
        navigation
        loop={true}
        autoplay={{ delay: 4000 }}
        scrollbar={{ draggable: true }}
      >
        {!similar && !error ? (
          <Loader />
        ) : (
          similar?.results.map((item) => (
            <SwiperSlide key={item.id} className="swiper-slide">
              <Card media="tv" item={item} id={item.id} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <div className="flex justify-center items-center">
        {pageCount > 1 && (
          <button className={btnStyle} onClick={prevPage}>
            Prev
          </button>
        )}
        <button className={`${btnStyle} ml-4`} onClick={nextPage}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Movie;

export async function getStaticPaths() {
  const { data: series } = await axios.get(
    `https://api.themoviedb.org/3/discover/tv/?api_key=${process.env.API_KEY}&page=1`
  );

  const paths = series.results.map((tv) => ({
    params: { id: tv.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const { data: tv } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );

  const { data: videosData } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`
  );

  const { data: castData } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );

  const videos = videosData.results.slice(0, 3);
  const cast = castData.cast;

  return {
    props: {
      tv,
      videos,
      cast,
    },
  };
}
