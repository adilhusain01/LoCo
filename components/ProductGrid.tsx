import { ShopDto } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { ProductCart } from './ProductCart';
import { Button } from './ui/button';
import { Ban, MoreVertical, PlusCircle } from 'lucide-react';
import { ProductCreateDialog } from './ProductCreateDialog';
import { Doc } from '@junobuild/core-peer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { ProductDropdownMenu } from './ProductDropdownMenu';

const PRODUCT_LIMIT = 5;

export interface ProductGridProps {
  shopData: Doc<ShopDto>;
}

export const ProductGrid = ({ shopData }: ProductGridProps) => {
  const products = shopData.data.products!;
  const limitReached = products.length >= PRODUCT_LIMIT;

  const [imageLoading, setImageLoading] = useState(true);

  const handleLoadingComplete = () => {
    setImageLoading(false);
  };

  return (
    <div>
      <div className='flex gap-4 items-center pb-2'>
        <h2 className='font-semibold text-xl text-white'>All products</h2>
        {limitReached ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='flex gap-2 items-center'
                  size='sm'
                  variant='secondary'
                >
                  <Ban className='w-5 h-5' />
                  Add
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Currently you can create only 5 products. We&apos;re lifting
                  the limit soon!
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <ProductCreateDialog
            triggerElement={
              <Button
                className='flex gap-2 items-center bg-[#4acd8d] hover:bg-[#228c58] hover:text-white border-none'
                size='sm'
                variant='outline'
              >
                <PlusCircle className='w-5 h-5' />
                Add
              </Button>
            }
            shop={shopData}
          />
        )}
      </div>
      <div className='flex flex-wrap mt-5'>
        {products.map((product) => {
          return (
            <div
              key={product.title}
              className='lg:w-1/4 md:w-1/2 p-4 w-full'
              style={{
                background: '#17171c',
                boxShadow: '19px 19px 37px #0c0c0f, -19px -19px 37px #222229',
                borderRadius: '10px',
              }}
            >
              <div
                className='block relative h-48 rounded overflow-hidden'
                role='button'
              >
                <div className='absolute top-1 right-1'>
                  <ProductDropdownMenu
                    productId={product.id}
                    shopData={shopData}
                    triggerElement={
                      <Button
                        className='justify-center hover:bg-gray-400'
                        variant='ghost'
                        size='icon'
                      >
                        <MoreVertical />
                      </Button>
                    }
                  />
                </div>
                {imageLoading && <Skeleton className='h-full w-full' />}
                <ProductCart
                  product={product}
                  triggerElement={
                    <Image
                      alt={product.title}
                      className='object-cover object-center w-full h-full block'
                      src={product.imageUrl ?? 'https://dummyimage.com/420x260'}
                      width={0}
                      height={0}
                      onLoad={handleLoadingComplete}
                    />
                  }
                />
              </div>
              <div className='mt-4'>
                <h3 className='text-gray-400 text-xs tracking-widest mb-1'>
                  {product.description}
                </h3>
                <h2 className='text-gray-400 text-lg font-medium'>
                  {product.title}
                </h2>
                <div className='font-medium flex items-center gap-1 mt-1 text-gray-400'>
                  <p>{product.price} ICP</p>
                  <Image
                    className='w-auto h-10'
                    src='/assets/icp-token-white.svg'
                    alt='icp token'
                    width={0}
                    height={0}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
