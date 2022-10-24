import Link from 'next/link';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import Image from 'next/image';
import { useMainContext } from '../context/mainContext';

const Navbar = () => {
  const { data: session } = useSession();
  const { watchlist } = useMainContext();

  const btnStyle =
    'bg-black hover:bg-primary-color transition-all ease-in duration-300 ml-3 sm:px-4 px-2 py-2 sm:text-base text-sm rounded';

  return (
    <nav className="h-[8vh] sticky top-0 bg-secondary-color text-white flex md:p-0 p-5 z-50">
      <div className="container flex justify-between items-center mx-auto">
        <Link href="/">
          <a className="sm:text-3xl text-xl mr-4">IMovies</a>
        </Link>
        <div className="mr-auto lg:block hidden">
          <Link href="/">
            <a className="mr-4 text-lg">Home</a>
          </Link>
          <Link href="/movie">
            <a className="mr-4 text-lg">Movies</a>
          </Link>
          <Link href="/tv">
            <a className="text-lg">TV Series</a>
          </Link>
          {session && (
            <Link href="/watchlist">
              <a className="text-lg ml-4">Watchlist</a>
            </Link>
          )}
          {watchlist.length > 0 && (
            <span className="ml-2 bg-primary-color px-2 py-1 text-sm rounded-full">
              {watchlist.length}
            </span>
          )}
        </div>
        {session ? (
          <>
            <p className="mr-4 lg:block hidden">{session?.user.tag}</p>
            <div className="flex items-center">
              <Image
                className="rounded-full"
                src={session?.user.image}
                width={35}
                height={35}
                alt="profileImage"
              />
              <button className={btnStyle} onClick={() => signOut()}>
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <button
            className={btnStyle}
            onClick={() => signIn({ callback: '/' })}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
