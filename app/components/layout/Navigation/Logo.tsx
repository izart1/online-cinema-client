import Image from 'next/image';
import Link from 'next/link';

import logoImg from '@/assets/images/logo.svg';
import { FC } from 'react';

const Logo: FC = () => {
  return (
    <Link href={'/'}>
      <span className="px-layout mb-10 block">
        <Image
          src={logoImg}
          width={247}
          height={34}
          alt="Online  cinema"
          draggable={false}
        />
      </span>
    </Link>
  );
};

export default Logo;
