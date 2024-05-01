import Link from 'next/link';
import Image from 'next/image';
import { Footer } from './footer';
import { Navigation } from './navigation';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='h-full lg:ml-72 xl:ml-80'>
        <div
          className='contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex'
        >
          <div className='contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:dark:border-white/10'>
            <div className='hidden lg:flex'>
              <Link href='/' aria-label='Home'>
                <Image
                  src='/vsd_logo.png'
                  alt='logo'
                  width={60}
                  height={60}
                />
              </Link>
            </div>
            <Navigation className='hidden lg:mt-10 lg:block' />
          </div>
        </div>
        <div className='relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8'>
          <main className='flex-auto'>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
