'use client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ThemeSwitch from './theme-switch';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className='border-b border-gray-200 py-5 flex justify-between'>
      <div className='flex items-center px-10 gap-x-2 md:gap-x-16'>
        <div className='block lg:hidden'>
          <Link href='/' aria-label='Home'>
            <Image src='/vsd_logo.png' alt='logo' width={60} height={60} />
          </Link>
        </div>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='text-base leading-6 w-64 md:w-96  border border-gray-300 focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50 rounded-lg shadow-sm pl-4 pr-3 py-2'
        />
      </div>
      <div className='flex gap-x-5'>
        <ThemeSwitch />
        <div
          className='mr-4 text-white bg-sky-600 hover:bg-sky-700 cursor-pointer p-2 rounded-lg'
          onClick={() => signOut()}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
