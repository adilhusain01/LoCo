import { signIn } from '@junobuild/core-peer';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { RouteId } from '@/lib';

export const SignInButton = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn().then(() => router.push(RouteId.discovery));
  };

  return (
    <Button
      className='bg-[#4acd8d] hover:bg-[#228c58] text-primary hover:text-white'
      onClick={handleSignIn}
      style={{
        boxShadow: '19px 19px 37px #0b0b0d, -19px -19px 37px #23232b',
      }}
    >
      Enter LoCo
    </Button>
  );
};
