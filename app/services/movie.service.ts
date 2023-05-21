import { IMovie } from '@/shared/types/movie.types';

import { getMoviesUrl } from '@/config/api.config';

import axios, { axiosClassic } from '@/api/interceptors';

export const MovieService = {
  async getAllMovies(searchTerm?: string) {
    return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    });
  },

  async getMostPopularMovies() {
    const { data: movies } = await axiosClassic.get<IMovie[]>(
      getMoviesUrl('/most-popular')
    );
    return movies;
  },

  async deleteMovie(_id: string) {
    return axios.delete<string>(getMoviesUrl(`/${_id}`));
  },
};
