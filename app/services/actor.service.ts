import { IActor } from '@/shared/types/movie.types';

import { getActorsUrl } from '@/config/api.config';

import axios, { axiosClassic } from '@/api/interceptors';
import { IActorEditInput } from '@/components/screens/admin/actor/actor-edit.interface';

export const ActorService = {
  async getAllActors(searchTerm?: string) {
    return axiosClassic.get<IActor[]>(getActorsUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    });
  },
  async getByIdActor(_id: string) {
    return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`));
  },
  async updateActor(_id: string, data: IActorEditInput) {
    return axios.put<string>(getActorsUrl(`/${_id}`), data);
  },
  async createActor() {
    return axios.post<string>(getActorsUrl('/'));
  },

  async deleteActor(_id: string) {
    return axios.delete<string>(getActorsUrl(`/${_id}`));
  },
};
