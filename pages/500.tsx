import React from 'react';

import Heading from '@/components/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

const Error500 = () => {
  return (
    <Meta title="Error 500">
      <Heading title="500 Internal Server Error" />
    </Meta>
  );
};

export default Error500;
