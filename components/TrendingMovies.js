import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from './Card';
import Loader from './Loader';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const TrendingMovies = ({ trendingMovies }) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Trending Movies Today</h2>
        <Link href="/movie">
          <p className="cursor-pointer border-2 p-2 rounded-lg hover:bg-secondary-color ease-out duration-200 sm:text-base text-sm">
            View More
          </p>
        </Link>
      </div>
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
        {!trendingMovies ? (
          <Loader />
        ) : (
          trendingMovies?.results.map((item) => (
            <SwiperSlide key={item.id} className="swiper-slide">
              <Card media="movie" item={item} id={item.id} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
};

export default TrendingMovies;
