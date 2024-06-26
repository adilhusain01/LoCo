import { useShop } from '@/hooks';
import { ShopCreateDialog } from './ShopCreateDialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Ban } from 'lucide-react';

export const DiscoverySearchBar = () => {
  const { hasShop } = useShop();

  return (
    <div className='flex gap-4 items-center justify-between'>
      <h1 className='font-bold text-2xl text-neutral-50'>Discovery</h1>
      <Input type='search' placeholder='Search for channels or shops' />
      <div className='flex gap-2'>
        {/* {hasChannel ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="flex gap-2 items-center" variant="secondary">
                  <Ban className="w-5 h-5" />
                  Create a channel
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Currently you can create only 1 channel. We&apos;re lifting
                  the limit soon!
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <ChannelCreateDialog
            triggerElement={<Button variant="outline">Create a channel</Button>}
          />
        )} */}
        {hasShop ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='flex gap-2 items-center' variant='secondary'>
                  <Ban className='w-5 h-5' />
                  Create a shop
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Currently you can create only 1 shop. We&apos;re lifting the
                  limit soon!
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <ShopCreateDialog
            triggerElement={
              <Button
                variant='outline'
                className='bg-[#4acd8d] hover:bg-[#228c58] hover:text-white border-none'
              >
                Create a shop
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};
