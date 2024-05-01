'use client'
import { signOut } from 'next-auth/react';

export default function Header() {
  return (
    <div className='border-b border-gray-200 py-5 flex justify-between'>
      <h3 className='flex text-base font-semibold leading-6 text-gray-900 pl-10 items-center '>
        Verosoft Design Documentation Center
      </h3>
      <div
        className='mr-4 text-white bg-sky-600 hover:bg-sky-700 cursor-pointer p-2 rounded-lg'
        onClick={() => signOut()}
      >
        Logout
      </div>
    </div>
  );
}
