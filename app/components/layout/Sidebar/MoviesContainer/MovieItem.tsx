import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import MaterialIcon from '@/components/ui/MaterialIcon';

import { IMovie } from '@/shared/types/movie.types';

import { getGenresListEach } from '@/utils/movie/getGenresList';

import { getGenreUrl } from '@/config/url.config';

import styles from './MovieList.module.scss';

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
  return (
    <div className={styles.item}>
      <Link href={movie.slug}>
        <Image
          src={movie.poster}
          width={65}
          height={97}
          style={{ height: '97px' }}
          alt={movie.title}
          draggable={false}
          priority
        />
      </Link>
      <div className={styles.info}>
        <div>
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.genres}>
            {movie.genres.map((genre, idx) => (
              <Link key={genre._id} href={getGenreUrl(genre.slug)}>
                {getGenresListEach(idx, movie.genres.length, genre.name)}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.rating}>
          <MaterialIcon name="MdStarRate" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
