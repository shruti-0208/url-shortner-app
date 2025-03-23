import * as React from 'react';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <div className="bg-slate-900 text-white p-4 top-0 w-full"> 
        <div className='container mx-auto'>
            <nav className='py-5'>
                <div className='text-base'> URLSHORTNER</div>
            </nav>
        </div>
    </div>

  );
};

export default Header;
