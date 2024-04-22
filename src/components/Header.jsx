import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='pb-6 bg-white lg:pb-0'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <nav className='flex items-center justify-between h-16 lg:h-20'>
          <div className='flex-shrink-0'>
            <Link to={'/'} title='' className='flex'>
              <h1 className='text-3xl font-bold'>Hava Durumu Sorgulama</h1>
            </Link>
          </div>
          <a
            href='#'
            title=''
            className='items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700'
            role='button'
          >
            <Menu />
          </a>
        </nav>
      </div>
    </header>
  );
};
