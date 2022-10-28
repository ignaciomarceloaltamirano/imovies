import image from '../public/no-results-icon.jpg';
import Image from 'next/image';
import { MdSearchOff } from 'react-icons/md';

const NoResults = ({ term }) => {
  return (
    <div className="flex flex-col items-center justify-center order-2 w-full p-4 text-center my-4">
      <p className="text-[6rem] text-primary-color mb-4">
        <MdSearchOff />
      </p>
      <h2 className="text-2xl">No results found for {`"${term}"`}</h2>
    </div>
  );
};

export default NoResults;
