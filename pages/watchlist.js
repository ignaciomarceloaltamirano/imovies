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
      <button className={`${btnStyle} mb-6`} onClick={() => back()}>
        Go back
      </button>
      {watchlist.map((item) => (
        <div
          className="lg:w-3/5 w-full mx-auto flex border-t p-4 h-[25vh]"
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
            <div className="ml-4 sm:text-lg ">
              <div className="flex items-center">
                <Link
                  href={
                    item.media === 'movie'
                      ? `movie/${item.id}`
                      : `tv/${item.id}`
                  }
                >
                  <h2 className="cursor-pointer">{item.name || item.title}</h2>
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
                      className={item?.episode_run_time.length !== 0 && 'ml-4'}
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
              <p className="my-2 text-sm md:text-base ">
                {item.overview.split('. ')[0] + '.'}
              </p>
            </div>
          </div>
        </div>
      ))}
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
