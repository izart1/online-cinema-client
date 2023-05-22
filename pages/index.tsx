import { GetStaticProps, NextPage } from 'next';

import Home from '@/components/screens/home/Home';
import { IHome } from '@/components/screens/home/home.interface';
import { ISlide } from '@/components/ui/slider/slider.interface';

import { MovieService } from '@/services/movie.service';

import { getGenresList } from '@/utils/movie/getGenresList';

import { getMovieUrl } from '@/config/url.config';

const HomePage: NextPage<IHome> = ({ slides }) => {
  return <Home slides={slides} />;
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: movies } = await MovieService.getAllMovies();
    const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
      _id: m._id,
      link: getMovieUrl(m.slug),
      bigPoster: m.bigPoster,
      subTitle: getGenresList(m.genres),
      title: m.title,
    }));

    return {
      props: {
        slides,
      } as IHome,
    };
  } catch (err) {
    return {
      props: {
        slides: [],
      },
    };
  }
};

export default HomePage;
