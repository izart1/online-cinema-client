import { IGenre } from '@/shared/types/movie.types';

import { getGenresUrl } from '@/config/api.config';

import { axiosClassic } from '@/api/interceptors';

export const GenreService = {
  async getAllGenres(searchTerm?: string) {
    return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    });
  },
};
