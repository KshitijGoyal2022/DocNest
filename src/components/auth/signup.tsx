'use client';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


import { RegisterSchema } from '@/schemas';

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }
      console.log('Account created', data);
      router.push('/sign-in')
    } catch (error: any) {
      console.error('Creation error:', error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <Link href='/'>
            <Image
              className='mx-auto w-auto'
              src='/vsd_logo.png'
              alt='Your Company'
              width={60}
              height={60}
            />
          </Link>

          <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Create your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
            <form
              className='space-y-6'
              action='#'
              method='POST'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Username
                </label>
                <div className='mt-2'>
                  <input
                    id='username'
                    {...register('username')}
                    name='username'
                    type='text'
                    placeholder='GlockTopus'
                    className='pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.username && (
                    <p className='text-red-500 text-xs italic'>
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    {...register('email')}
                    name='email'
                    type='email'
                    placeholder='glocktopus@gmail.com'
                    autoComplete='email'
                    className='pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email && (
                    <p className='text-red-500 text-xs italic'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    {...register('password')}
                    name='password'
                    type='password'
                    placeholder='********'
                    autoComplete='current-password'
                    className='pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.password && (
                    <p className='text-red-500 text-xs italic'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
                >
                  Sign up
                </button>
              </div>
            </form>

            <div>
              <p className='mt-10 text-center text-sm text-gray-500'>
                Already have an account?{' '}
                <Link
                  href='/sign-in'
                  className='font-semibold leading-6 text-sky-600 hover:text-sky-500'
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
