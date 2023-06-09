import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { ActorService } from '@/services/actor.service';

import { convertMongoDate } from '@/utils/date/convertMongoDate';
import { toastError } from '@/utils/toast-error';

import { getAdminUrl } from '@/config/url.config';

export const useActors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { push } = useRouter();

  const queryData = useQuery(
    ['search actor list', debouncedSearch],
    () => ActorService.getAllActors(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (actor): ITableItem => ({
            _id: actor._id,
            editUrl: getAdminUrl(`actor/edit/${actor._id}`),
            items: [actor.name, String(actor.countMovies)],
          })
        ),

      onError: (error) => {
        toastError(error, 'Actor list');
      },
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: createAsync } = useMutation(
    'create actor',
    () => ActorService.createActor(),
    {
      onError: (error) => {
        toastError(error, 'Create actor');
      },
      onSuccess: ({ data: _id }) => {
        toastr.success('Create actor', 'Create was successful');
        push(getAdminUrl(`actor/edit/${_id}`));
      },
    }
  );

  const { mutateAsync: deleteAsync } = useMutation(
    'delete actor',
    (actorId: string) => ActorService.deleteActor(actorId),
    {
      onError: (error) => {
        toastError(error, 'Delete actor');
      },
      onSuccess: () => {
        toastr.success('Delete actor', 'Delete was successful');
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
