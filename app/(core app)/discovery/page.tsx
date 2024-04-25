'use client';

import { DiscoverySearchBar } from '@/components/DiscoverySearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import { RouteId } from '@/lib';
import { ChannelDto, ShopDto } from '@/lib/types';
import { Doc, ListResults, listDocs } from '@junobuild/core-peer';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Discovery() {
  const [shopsData, setShopsData] = useState<
    ListResults<Doc<ShopDto>> | undefined
  >();
  const [channelsData, setChannelsData] = useState<
    ListResults<Doc<ChannelDto>> | undefined
  >();
  const [shopsLoading, setShopsLoading] = useState(false);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const [shopsError, setShopsError] = useState<any>(null);
  const [channelsError, setChannelsError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      setShopsLoading(true);
      await listDocs({
        collection: 'shops',
        filter: {
          paginate: { limit: 4 },
          order: { field: 'created_at', desc: true },
        },
      })
        .then((data) =>
          setShopsData(data as ListResults<Doc<ShopDto>> | undefined)
        )
        .catch((error) => {
          console.log('Failed to fetch shops data', error);
          setShopsError(error);
        })
        .finally(() => setShopsLoading(false));
    })();

    (async () => {
      setChannelsLoading(true);
      await listDocs({
        collection: 'channels',
        filter: {
          paginate: { limit: 4 },
          order: { field: 'created_at', desc: true },
        },
      })
        .then((data) =>
          setChannelsData(data as ListResults<Doc<ChannelDto>> | undefined)
        )
        .catch((error) => {
          console.log('Failed to fetch channels data', error);
          setChannelsError(error);
        })
        .finally(() => setChannelsLoading(false));
    })();
  }, []);

  return (
    <div>
      <DiscoverySearchBar />

      <div className='mt-8'>
        <h2 className='font-semibold text-lg pb-2 text-neutral-50'>Shops</h2>
        <div className='flex flex-wrap'>
          {shopsLoading ? (
            [1, 2, 3].map((item) => (
              <Skeleton key={item} className='m-4 w-64 h-64' />
            ))
          ) : shopsError ? (
            <div>Error: {shopsError.message}</div>
          ) : shopsData?.items_length ? (
            shopsData.items.map((item) => {
              const productCount = item.data.products?.length;
              console.log(
                `Image name for shop ${item.key}: ${item.data.design}.webp`
              ); // Add this line
              return (
                <div key={item.key} className='p-4 md:w-1/3'>
                  <div
                    className='h-full border-2 border-none border-opacity-60 shadow-md rounded-lg overflow-hidden'
                    style={{
                      background: '#17171c',
                      boxShadow:
                        '19px 19px 37px #0c0c0f, -19px -19px 37px #222229',
                    }}
                  >
                    <Link href={RouteId.shop(item.key)}>
                      <Image
                        className='lg:h-48 md:h-36 w-full object-cover object-center'
                        src={`/assets/${item.data.design}.webp`}
                        alt='shop cover'
                        width={0}
                        height={0}
                      />
                    </Link>
                    <div className='p-6'>
                      <h4 className='tracking-widest text-xs font-medium text-gray-200 mb-1'>
                        {productCount === 1
                          ? productCount + ' Product'
                          : productCount + ' Products'}
                      </h4>
                      <h3 className='capitalize text-lg font-medium text-gray-400 mb-3'>
                        {item.data.title}
                      </h3>
                      <p className='leading-relaxed mb-3 text-gray-400'>
                        {item.data.description}
                      </p>
                      <div className='flex items-center flex-wrap '>
                        <Link
                          href={RouteId.shop(item.key)}
                          className='text-[#4acd8d] inline-flex items-center md:mb-2 lg:mb-0 hover:text-indigo-900'
                        >
                          Visit Shop
                          <MoveRight />
                        </Link>
                        {/* TODO: add sold products count */}
                        {/* TODO: add rating */}
                        {/* TODO: add to favorites */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No shops data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
