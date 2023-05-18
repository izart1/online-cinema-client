import { getAdminHomeUrl, getAdminUrl } from '@/config/url.config';

import { INavItem } from './admin-navigation.interface';

export const navItems: INavItem[] = [
  {
    title: 'Statistics',
    link: getAdminHomeUrl(),
  },
  {
    title: 'Users',
    link: getAdminUrl('user'),
  },
  {
    title: 'Movies',
    link: getAdminUrl('movie'),
  },
  {
    title: 'Actors',
    link: getAdminUrl('actor'),
  },
  {
    title: 'Genres',
    link: getAdminUrl('genre'),
  },
];
