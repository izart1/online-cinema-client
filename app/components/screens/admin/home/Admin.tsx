import { FC } from 'react';

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import styles from './Admin.module.scss';
import Statistics from './Statistics/Statistics';

const Admin: FC = () => {
  return (
    <Meta>
      <AdminNavigation />
      <Heading title="Statistics" />
      <Statistics />
    </Meta>
  );
};

export default Admin;
