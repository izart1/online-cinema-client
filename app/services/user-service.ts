import { IProfileInput } from '@/components/screens/profile/profile.interface';

import { IUser } from '@/shared/types/user.types';

import { getUsersUrl } from '@/config/api.config';

import axios from '@/api/interceptors';

export const UserService = {
  async getAllUsers(searchTerm?: string) {
    return axios.get<IUser[]>(getUsersUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    });
  },

  async getUserById(_id: string) {
    return axios.get<IUser>(getUsersUrl(`/${_id}`));
  },

  async userUpdate(_id: string, data: IProfileInput) {
    return axios.put<string>(getUsersUrl(`/${_id}`), data);
  },

  async getProfile() {
    return axios.get<IUser>(getUsersUrl('/profile'));
  },
  async updateProfile(data: IProfileInput) {
    return axios.put<string>(getUsersUrl('/profile'), data);
  },
  async deleteUser(_id: string) {
    return axios.delete<string>(getUsersUrl(`/${_id}`));
  },
};
