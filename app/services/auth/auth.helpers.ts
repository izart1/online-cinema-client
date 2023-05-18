import Cookies from 'js-cookie';

import { IAuthResponse, ITokens } from '@/store/user/user.interface';

export const saveTokenStorage = (data: ITokens) => {
  Cookies.set('aToken', data.accessToken);
  Cookies.set('rToken', data.refreshToken);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokenStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};

export const removeTokenStorage = () => {
  Cookies.remove('aToken');
  Cookies.remove('rToken');
};
