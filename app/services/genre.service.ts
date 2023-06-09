import { IGenreEditInput } from '@/components/screens/admin/genre/genre-edit.interface';
import { ICollection } from '@/components/screens/collections/collections.interface';

import { IGenre } from '@/shared/types/movie.types';

import { getGenresUrl } from '@/config/api.config';

import axios, { axiosClassic } from '@/api/interceptors';

export const GenreService = {
  async getAllGenres(searchTerm?: string) {
    return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    });
  },

  async getByIdGenre(_id: string) {
    return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`));
  },

  async getGenreBySlug(slug: string) {
    return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`));
  },

  async getCollections() {
    return axiosClassic.get<ICollection[]>(getGenresUrl(`/collections`));
  },

  async createGenre() {
    return axios.post<string>(getGenresUrl('/'));
  },

  async updateGenre(_id: string, data: IGenreEditInput) {
    return axios.put<string>(getGenresUrl(`/${_id}`), data);
  },

  async deleteGenre(_id: string) {
    return axios.delete<string>(getGenresUrl(`/${_id}`));
  },
};
