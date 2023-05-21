import { IActor } from '@/shared/types/movie.types';

import { getActorsUrl } from '@/config/api.config';

import axios, { axiosClassic } from '@/api/interceptors';

export const ActorService = {
  async getAllActors(searchTerm?: string) {
    return axiosClassic.get<IActor[]>(getActorsUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    });
  },

  async deleteActor(_id: string) {
    return axios.delete<string>(getActorsUrl(`/${_id}`));
  },
};
