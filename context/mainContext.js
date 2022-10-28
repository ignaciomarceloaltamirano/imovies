import { createContext, useContext, useEffect, useState } from 'react';
import { onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.uid) {
      const docRef = doc(db, 'watchlist', session?.user?.uid);
      var unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setWatchlist(doc.data().items);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [session?.user?.uid]);

  const addShowToWatchlist = async (item, cast) => {
    const docRef = doc(db, 'watchlist', session?.user?.uid);
    try {
      await setDoc(
        docRef,
        {
          items: watchlist
            ? [
                ...watchlist,
                {
                  id: item?.id,
                  title: item?.name,
                  media: 'tv',
                  rating: item?.vote_average,
                  episode_run_time: item?.episode_run_time,
                  overview: item?.overview,
                  first_air_date: item?.first_air_date,
                  cast: cast?.slice(0, 5),
                  genres: item?.genres,
                  episodes_number: item?.number_of_episodes,
                  image: `https://image.tmdb.org/t/p/w780${item?.poster_path}`,
                },
              ]
            : [
                {
                  id: item?.id,
                  name: item?.name,
                  media: 'tv',
                  rating: item?.vote_average,
                  episode_run_time: item?.episode_run_time,
                  overview: item?.overview,
                  first_air_date: item?.first_air_date,
                  cast: cast?.slice(0, 5),
                  genres: item?.genres,
                  episodes_number: item?.number_of_episodes,
                  image: `https://image.tmdb.org/t/p/w780${item?.poster_path}`,
                },
              ],
        },
        { merge: 'true' }
      );
      toast.success(`${item?.name} added to your watchlist.`);
    } catch (err) {
      toast.error(err);
    }
  };

  const removeShowFromWatchlist = async (item) => {
    const docRef = doc(db, 'watchlist', session?.user?.uid);
    await setDoc(
      docRef,
      {
        items: watchlist.filter((element) => element.id !== item?.id),
      },
      { merge: 'true' }
    );
    toast.success(`${item?.name} removed from your watchlist`);
  };

  const addMovieToWatchlist = async (item, cast) => {
    const docRef = doc(db, 'watchlist', session?.user?.uid);
    try {
      await setDoc(
        docRef,
        {
          items: watchlist
            ? [
                ...watchlist,
                {
                  id: item?.id,
                  media: 'movie',
                  title: item?.title,
                  rating: item?.vote_average,
                  runtime: item?.runtime,
                  overview: item?.overview,
                  release_date: item?.release_date,
                  cast: cast?.slice(0, 5),
                  genres: item?.genres,
                  image: `https://image.tmdb.org/t/p/w780${item?.poster_path}`,
                },
              ]
            : [
                {
                  id: item?.id,
                  media: 'movie',
                  title: item?.title,
                  rating: item?.vote_average,
                  runtime: item?.runtime,
                  overview: item?.overview,
                  release_date: item?.release_date,
                  cast: cast?.slice(0, 5),
                  genres: item?.genres,
                  image: `https://image.tmdb.org/t/p/w780${item?.poster_path}`,
                },
              ],
        },
        { merge: 'true' }
      );
      toast.success(`${item?.title} added to your watchlist.`);
    } catch (err) {
      toast.error(err);
    }
  };

  const removeMovieFromWatchlist = async (item) => {
    const docRef = doc(db, 'watchlist', session?.user?.uid);
    await setDoc(
      docRef,
      {
        items: watchlist.filter((element) => element.id !== item?.id),
      },
      { merge: 'true' }
    );
    toast.success(`${item?.title} removed from your watchlist`);
  };

  const value = {
    watchlist,
    addShowToWatchlist,
    removeShowFromWatchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  return context;
};
