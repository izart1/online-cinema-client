import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import Catalog from '@/components/ui/catalog-movies/Catalog';

import { IActor, IMovie } from '@/shared/types/movie.types';

import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

import Error404 from '../404';

interface IActorPage {
  movies: IMovie[];
  actor: IActor | undefined;
}

const ActorPage: NextPage<IActorPage> = ({ movies, actor }) => {
  return actor ? (
    <Catalog movies={movies || []} title={actor.name} />
  ) : (
    <Error404 />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: actors } = await ActorService.getAllActors();
    const paths = actors.map((a) => ({
      params: { slug: a.slug },
    }));

    return { paths, fallback: 'blocking' };
  } catch (err) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data: actor } = await ActorService.getActorsBySlug(
      String(params?.slug)
    );

    const { data: movies } = await MovieService.getMovieByActor(actor._id);

    return {
      props: {
        movies,
        actor,
      },
      revalidate:60
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ActorPage;
