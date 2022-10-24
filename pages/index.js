import axios from 'axios';
import Home from '../components/Home';
import Head from 'next/head';

export default function HomePage({
  trendingMovies,
  trendingSeries,
  topMovies,
  topSeries,
}) {
  return (
    <main className="mx-4 sm:mx-0">
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Home
        trendingMovies={trendingMovies}
        trendingSeries={trendingSeries}
        topMovies={topMovies}
        topSeries={topSeries}
      />
    </main>
  );
}

export async function getServerSideProps() {
  const { data: trendingMovies } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`
  );
  const { data: trendingSeries } = await axios.get(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}`
  );

  const { data: topMovies } = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`
  );

  const { data: topSeries } = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}`
  );

  return {
    props: {
      trendingMovies,
      trendingSeries,
      topMovies,
      topSeries,
    },
  };
}
