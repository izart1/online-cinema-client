import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface';

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

  async getMovieByGenres(genreIds: string[]) {
    return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
      genreIds,
    });
  },

  async getMovieByActor(actorId: string) {
    return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`));
  },

  async getMovieBySlug(slug: string) {
    return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`));
  },

  async getByIdMovie(_id: string) {
    return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`));
  },
  async updateMovie(_id: string, data: IMovieEditInput) {
    return axios.put<string>(getMoviesUrl(`/${_id}`), data);
  },
  async createMovie() {
    return axios.post<string>(getMoviesUrl('/'));
  },

  async deleteMovie(_id: string) {
    return axios.delete<string>(getMoviesUrl(`/${_id}`));
  },

  async updateCountOpened(slug: string) {
    return axiosClassic.put<string>(getMoviesUrl('/update-count-opened'), {
      slug,
    });
  },
};
