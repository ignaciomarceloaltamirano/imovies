import { getProviders, signIn as SignIntoProvider } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const signIn = ({ providers }) => {
  return (
    <div className="bg-black text-white h-[92vh] w-[100vw] grid place-items-center">
      {Object.values(providers).map((provider) => (
        <div
          className="justify-center items-center flex   hover:bg-primary-color p-3 rounded-md bg-white text-black cursor-pointer ease-in-out duration-300"
          key={provider.name}
        >
          <FcGoogle />
          <button
            onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/' })}
          >
            &nbsp; Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default signIn;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
