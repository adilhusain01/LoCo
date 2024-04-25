'use client';

import {
  ChevronRight,
  LayoutDashboard,
  MoreVertical,
  Settings,
  Store,
} from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { RouteId } from '@/lib';
import { SettingsDropdownMenu } from './SettingsDropdownMenu';
import { useShop } from '@/hooks';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { ChannelDto } from '@/lib/types';
import { SidebarProfileInfo } from './SidebarProfileInfo';
import { ShopDropdownMenu } from './ShopDropdownMenu';

export const Sidebar = () => {
  const { hasShop, data: shops } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='bg-[#1c1c24] flex flex-col w-64 gap-4 h-full overflow-auto p-2'>
      <div className='flex items-center justify-between gap-2 bg-[#4acd8d] p-2 rounded-lg'>
        <SidebarProfileInfo />
        <SettingsDropdownMenu
          triggerElement={
            <Button
              className='justify-center hover:bg-[#228c58] hover:text-white'
              variant='ghost'
              size='icon'
            >
              <Settings />
            </Button>
          }
        />
      </div>

      <Link
        className={`flex items-center justify-between gap-2 ${buttonVariants({
          variant: 'ghost',
        })}`}
        href={RouteId.discovery}
        style={{
          backgroundColor: isHovered ? '#020817' : '#1C1C24',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='flex items-center gap-2 text-neutral-50'>
          <LayoutDashboard />
          Discovery
        </div>
      </Link>

      {hasShop && (
        <Link
          href={RouteId.shop(shops[0]?.key)}
          className={`flex items-center justify-between gap-2 ${buttonVariants({
            variant: 'ghost',
          })} text-white`}
        >
          <div className='flex items-center gap-2'>
            <Store />
            My Shop
          </div>
          <ShopDropdownMenu
            shop={shops[0]}
            triggerElement={
              <Button className='justify-center' variant='ghost' size='icon'>
                <MoreVertical className='w-5 h-5' />
              </Button>
            }
          />
        </Link>
      )}

      <Separator className='bg-[#4acd8d]' />

      {/* <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Channels</AccordionTrigger>
          <AccordionContent>
            {hasChannel ? (
              channels.map((channel) => {
                return (
                  <Link
                    key={channel.key}
                    href={RouteId.channel(channel.key)}
                    className={`flex items-center justify-between gap-2 ${buttonVariants(
                      {
                        variant: 'ghost',
                        className: 'w-full',
                      }
                    )}`}
                  >
                    <div className='flex items-center gap-2 truncate'>
                      <ChevronRight />
                      <p className='truncate'>
                        {(channel.data as ChannelDto).title}
                      </p>
                    </div>
                    <ChannelDropdownMenu
                      channel={channel}
                      triggerElement={
                        <Button
                          className='justify-center'
                          variant='ghost'
                          size='icon'
                        >
                          <MoreVertical className='w-5 h-5' />
                        </Button>
                      }
                    />
                  </Link>
                );
              })
            ) : (
              <p>Start by joining or creating a channel</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
    </div>
  );
};
