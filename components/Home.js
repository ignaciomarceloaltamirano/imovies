import TrendingMovies from './TrendingMovies';
import TrendingSeries from './TrendingSeries';
import TopMovies from './TopMovies';
import TopSeries from './TopSeries';

const Home = ({ trendingMovies, trendingSeries, topMovies, topSeries }) => {
  return (
    <section className="container mx-auto my-6">
      <main>
        <TrendingMovies trendingMovies={trendingMovies} />
        <TopMovies topMovies={topMovies} />
        <TrendingSeries trendingSeries={trendingSeries} />
        <TopSeries topSeries={topSeries} />
      </main>
    </section>
  );
};

export default Home;
