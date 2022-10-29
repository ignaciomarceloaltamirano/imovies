/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useSession, getSession } from 'next-auth/react';
import { useMainContext } from '../context/mainContext';
import { AiFillDelete, AiFillStar } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { btnStyle, episodeRuntime, movieRuntime } from '../utils/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

const WatchlistPage = () => {
  const { watchlist } = useMainContext();
  const { data: session } = useSession();
  const { back } = useRouter();

  const removeFromWatchlist = async (item) => {
    const docRef = doc(db, 'watchlist', session?.user?.uid);
    await setDoc(
      docRef,
      {
        items: watchlist.filter((element) => element.id !== item?.id),
      },
      { merge: 'true' }
    );
    toast.success(`${item?.name || item?.title} removed from your watchlist`);
  };
  return (
    <section className="container mx-auto my-6">
      <div className="sm:mx-0 mx-4">
        <button className={`${btnStyle} mb-6`} onClick={() => back()}>
          Go back
        </button>
      </div>
      {watchlist.length < 1 && (
        <div className="text-center flex items-center justify-center h-[50vh] flex-col sm:mx-0 mx-4 sm:text-lg text-sm">
          <p className="text-[6rem] text-primary-color">
            <MdOutlineAddCircleOutline />
          </p>
          <h2 className="text- my-2">Your watchlist is empty.</h2>
          <p className="text-">
            Add movies and shows to your Watchlist to keep track of what you
            want to watch.
          </p>
          <Link href="/movie">
            <a className="text-primary-color text- mt-2 mb-0">Browse Movies</a>
          </Link>
          <Link href="/tv">
            <a className="text-primary-color text-">Browse TV Shows</a>
          </Link>
        </div>
      )}
      <AnimatePresence>
        {watchlist.map((item) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:w-3/5 w-full mx-auto flex border-b p-4 sm:h-[25vh] h-[35vh]"
            key={item.id}
          >
            <div className="flex sm:w-1/4 w-1/2 justify-center items">
              <Link
                href={
                  item.media === 'movie' ? `movie/${item.id}` : `/tv/${item.id}`
                }
              >
                <img
                  className="cursor-pointer -[170px] h-full"
                  src={item.image}
                  alt={item.title}
                />
              </Link>
            </div>
            <div className="w-full flex">
              <div className="ml-4 sm:text-lg">
                <div className="flex items-center">
                  <Link
                    href={
                      item.media === 'movie'
                        ? `movie/${item.id}`
                        : `tv/${item.id}`
                    }
                  >
                    <h2 className="cursor-pointer">
                      {item.name || item.title}
                    </h2>
                  </Link>
                  <p className="ml-2 sm:block hidden">
                    (
                    {item.first_air_date?.slice(0, 4) ||
                      item.release_date?.slice(0, 4)}
                    )
                  </p>
                  <p className="ml-2 text-[#cda83b] sm:block hidden">
                    <AiFillStar />
                  </p>
                  <p className="ml-1 sm:block hidden">
                    {' '}
                    {item.rating.toFixed(1)}
                  </p>
                  <p
                    className="cursor-pointer ml-auto text-xl hover:text-primary-color transition-all ease-in duration-200"
                    onClick={() => removeFromWatchlist(item)}
                  >
                    <AiFillDelete />
                  </p>
                </div>
                <div className="flex items-center text-sm my-2">
                  <p className={item.media === 'movie' ? 'mr-4' : ''}>
                    {item.episode_run_time
                      ? episodeRuntime(item)
                      : movieRuntime(item)}
                  </p>
                  {item.media === 'tv' && (
                    <>
                      <p
                        className={
                          item?.episode_run_time.length !== 0 && 'ml-4'
                        }
                      >
                        TV Series
                      </p>
                      <span className="border-r mx-4 h-4  sm:block hidden"></span>
                      <p className="sm:block hidden">
                        {item?.episodes_number}eps
                      </p>
                      {
                        <span className="border-r mx-4 h-4 sm:block hidden"></span>
                      }
                    </>
                  )}
                  {item.genres.slice(0, 3).map((genre) => (
                    <p className="mr-4 sm:block hidden" key={genre?.id}>
                      {genre.name}
                    </p>
                  ))}
                </div>
                {item.cast.slice(0, 3).map((member) => (
                  <div key={member.id} className="sm:inline-block hidden">
                    <p className="text-sm sm:inline-block hidden">
                      {`${member.name}`}&nbsp;
                    </p>
                    {member.order < 2 && (
                      <span className="sm:inline-block hidden">,</span>
                    )}
                  </div>
                ))}
                <p className="my-2">{item.overview.split('. ')[0] + '.'}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};

export default WatchlistPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
