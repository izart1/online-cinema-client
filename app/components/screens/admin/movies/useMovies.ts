import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { MovieService } from '@/services/movie.service';

import { getGenresList } from '@/utils/movie/getGenresList';
import { toastError } from '@/utils/toast-error';

import { getAdminUrl } from '@/config/url.config';

export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { push } = useRouter();

  const queryData = useQuery(
    ['search movie list', debouncedSearch],
    () => MovieService.getAllMovies(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (movie): ITableItem => ({
            _id: movie._id,
            editUrl: getAdminUrl(`movie/edit/${movie._id}`),
            items: [
              movie.title,
              getGenresList(movie.genres),
              String(movie.rating),
            ],
          })
        ),

      onError: (error) => {
        toastError(error, 'Movies list');
      },
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: createAsync } = useMutation(
    'create movie',
    () => MovieService.createMovie(),
    {
      onError: (error) => {
        toastError(error, 'Create movie');
      },
      onSuccess: ({ data: _id }) => {
        toastr.success('Create movie', 'Create was successful');
        push(getAdminUrl(`movie/edit/${_id}`));
      },
    }
  );

  const { mutateAsync: deleteAsync } = useMutation(
    'delete movie',
    (movieId: string) => MovieService.deleteMovie(movieId),
    {
      onError: (error) => {
        toastError(error, 'Delete movie');
      },
      onSuccess: () => {
        toastr.success('Delete movie', 'Delete was successful');
        queryData.refetch();
      },
    }
  );
  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
      createAsync,
    }),
    [queryData, searchTerm, deleteAsync, createAsync]
  );
};
