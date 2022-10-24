import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const HamburgerMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className={openMenu ? 'hamburger is-active' : 'hamburger'}
      >
        <div className="bar"></div>
      </button>
      <div
        className={
          openMenu
            ? 'fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center flex-col z-[899] bg-secondary-color opacity-1 transition-all ease-in duration-300 -translate-x-0  pointer-events-all '
            : 'fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center flex-col z-[899] bg-secondary-color opacity-0 transition-all ease-in duration-300 -translate-x-[100%] pointer-events-none'
        }
        onClick={() => {
          openMenu && setOpenMenu(false);
        }}
      >
        <Link href="/">
          <a className="text-white mb-4 text-3xl">Home</a>
        </Link>
        <Link href="/movie">
          <a className="text-white mb-4 text-3xl">Movies</a>
        </Link>
        <Link href="/tv">
          <a className="text-white text-3xl">TV Series</a>
        </Link>
        {session && (
          <Link href="/watchlist">
            <a className="text-white text-3xl mt-4">Watchlist</a>
          </Link>
        )}
      </div>
    </>
  );
};

export default HamburgerMenu;
