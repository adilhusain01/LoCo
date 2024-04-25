'use client';

import { Navbar } from '@/components/Navbar';
import { SignInButton } from '@/components/SignInButton';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navbar />

      <section className='text-gray-600'>
        <div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
          <div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
            <h1 className='font-bold sm:text-4xl text-3xl mb-4 text-neutral-50'>
              LoCo - Local Commerce
            </h1>
            <p className='mb-4 leading-relaxed text-2xl text-neutral-50'>
              A free market for trading goods without intermediate agents.
              <br></br>
              Using ICP&apos;s powerful architecture to ensure the operations.{' '}
              <br></br>
              Trust being built by Blockchain and its transparency.<br></br>
            </p>
            <p className='mb-8 leading-relaxed text-lg text-neutral-50'>
              LoCo is running on the Internet Computer blockchain
            </p>
            {/* <SignInButton /> */}
          </div>
          <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
            <Image
              
              className='object-cover object-center rounded'
              alt='loco hero shop example'
              src='/assets/main.png'
              width={720}
              height={600}
            />
          </div>
        </div>
        <div className='container'>
          <Image
            className='w-auto h-8'
            src='/assets/100-on-chain-icp-badge.svg'
            alt='Powered By Internet Computer badge'
            width={0}
            height={0}
            style={{
              backgroundColor: 'white',
              padding: '5px',
              borderRadius: '5px',
            }}
          />
        </div>
      </section>
    </>
  );
}
