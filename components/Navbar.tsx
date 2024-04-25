import { SignInButton } from './SignInButton';

export interface Props {}

export const Navbar = ({}: Props) => {
  return (
    <header className='text-neutral-50 mt-10'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <a className='flex font-medium items-center text-neutral-50 mb-4 md:mb-0'>
          <span className=' text-7xl font-bold'>LoCo</span>
        </a>
        <div className='md:ml-auto'>
          <SignInButton />
        </div>
      </div>
    </header>
  );
};
