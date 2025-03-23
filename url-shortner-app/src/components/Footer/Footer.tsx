import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <div className='bg-slate-900 text-white p-4 text-base text-center
    fixed bottom-0 w-full'> &#169; All rights reserved </div>
  );
};

export default Footer;
