import './globals.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import { Toaster } from '@/components/ui/toaster';
import { Provider } from '@/providers/providers';
import Link from 'next/link';
import MainMenu from '@/components/main-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

import LoginBox from '@/components/login-box';
import configLua from '@/hooks/configLua';
import { RankPodiumListWidget } from '@/components/RankTabsPodium';
import CountDown from '@/components/count-down';
import { StatusServer } from '@/utils/statusServer';
import { Typography } from '@/components/Typography';
import { prisma } from '@/lib/prisma';
import { IconiFy } from '@/components/Iconify';
import Boosted from '@/components/aimations/boosted';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';

import { Download, Menu } from 'lucide-react';
import { getSeverConfig, status, totalOnline } from '@/lib/server-utils';
import MobileMenu from '@/components/mobile-menu';
import Image from 'next/image';

const lua = configLua();

export const revalidate = 0;

export const metadata: Metadata = {
  title: {
    default: lua['serverName'],
    template: `%s - ${lua['serverName']}`,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const statusServer = await status();
  const countOnline = await totalOnline();

  const boostedCreature = await getSeverConfig('boost_monster_url');
  const boostedBoss = await getSeverConfig('boost_boss_url');

  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-background text-foreground`}
        suppressHydrationWarning
      >
        <Provider>
          <div className='fixed left-0 right-0 top-0 z-10 border-b border-border bg-secondary md:left-[280px]'>
            <div className='col-span-12 mx-auto mb-8 px-4'>
              <div className='flex h-16 items-center justify-between'>
                <div className='flex md:hidden'>
                  <MobileMenu />
                </div>

                <div className='flex flex-1 justify-center md:ml-[120px]'>
                  <div className='flex flex-col items-center rounded-b-xl border-x border-b border-border bg-background/50 px-6 py-2 leading-tight'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      PLAYERS ONLINE
                    </span>
                    <span className='text-2xl font-bold text-primary'>
                      {countOnline}
                    </span>
                  </div>
                </div>

                <div className='hidden gap-3 md:flex'>
                  <Link
                    href='#'
                    className='block h-6 w-8 overflow-hidden rounded transition-opacity hover:opacity-80'
                  >
                    <img
                      src='https://flagcdn.com/pl.svg'
                      alt='Polish'
                      className='h-full w-full object-cover'
                    />
                  </Link>
                  <Link
                    href='#'
                    className='block h-6 w-8 overflow-hidden rounded transition-opacity hover:opacity-80'
                  >
                    <img
                      src='https://flagcdn.com/br.svg'
                      alt='Portuguese'
                      className='h-full w-full object-cover'
                    />
                  </Link>
                  <Link
                    href='#'
                    className='block h-6 w-8 overflow-hidden rounded transition-opacity hover:opacity-80'
                  >
                    <img
                      src='https://flagcdn.com/es.svg'
                      alt='Spanish'
                      className='h-full w-full object-cover'
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-16'>
            <SidebarProvider>
              <Sidebar
                variant='inset'
                className='hidden w-72 border-r border-sidebar-border bg-sidebar md:block'
              >
                <SidebarHeader className='p-6'>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        size='lg'
                        asChild
                        className='hover:bg-sidebar-accent/10'
                      >
                        <Link href='/'>
                          <div className='flex aspect-square size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                            <IconiFy icon='line-md:home' className='size-6' />
                          </div>
                          <div className='grid flex-1 text-left text-sm leading-tight'>
                            <span className='truncate font-semibold text-sidebar-foreground'>
                              {lua['serverName']}
                            </span>
                            <span className='truncate text-xs text-sidebar-primary-foreground'>
                              Home
                            </span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup className='mb-8'>
                    <LoginBox />
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarGroupLabel className='mb-4 font-semibold text-sidebar-primary-foreground'>
                      Menu
                    </SidebarGroupLabel>
                    <MainMenu />
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className='border-t border-sidebar-border p-6'>
                  <span className='flex justify-center text-sm text-sidebar-primary-foreground'>
                    Pedrozera!
                  </span>
                </SidebarFooter>
              </Sidebar>
              <SidebarInset>
                <ScrollArea className='h-screen w-full px-4 py-8 md:px-12'>
                  <div className='mx-auto grid grid-cols-1 sm:grid-cols-12 sm:gap-6'>
                    <div className='col-span-12 mb-8'>
                      <div className='flex items-center justify-center'>
                        <Link href='/'>
                          <Image
                            src='/logo.gif'
                            alt='Logo Server'
                            width={380}
                            height={380}
                            className='w-full max-w-[380px]'
                          ></Image>
                        </Link>
                      </div>
                    </div>

                    <div className='col-span-12 space-y-6 pb-8 md:col-span-9'>
                      <div className='rounded-lg bg-card shadow-lg'>
                        <div className='flex items-center justify-between rounded bg-secondary/50 p-4'>
                          <div className='flex flex-wrap gap-4 md:gap-6'>
                            <Link
                              href={'/download'}
                              className='group flex items-center text-sm text-card-foreground hover:text-primary'
                            >
                              <IconiFy
                                icon={'line-md:download-loop'}
                                className='mr-2 transition-transform group-hover:scale-110'
                              />{' '}
                              Download
                            </Link>
                            <Link
                              href={process.env.DISCORD_URL ?? '#'}
                              className='group flex items-center text-sm text-card-foreground hover:text-primary'
                            >
                              <IconiFy
                                icon={'line-md:discord'}
                                className='mr-2 w-6 transition-transform group-hover:scale-110'
                              />{' '}
                              Join Discord
                            </Link>
                            <Link
                              href={process.env.YOUTUBE_URL ?? ' #'}
                              className='group flex items-center text-sm text-card-foreground hover:text-primary'
                            >
                              <IconiFy
                                icon={'line-md:youtube'}
                                className='mr-2 w-6 transition-transform group-hover:scale-110'
                              />{' '}
                              YouTube
                            </Link>
                            <Link
                              href={process.env.INSTAGRAM_URL ?? '#'}
                              className='group flex items-center text-sm text-card-foreground hover:text-primary'
                            >
                              <IconiFy
                                icon={'line-md:instagram'}
                                className='mr-2 w-6 transition-transform group-hover:scale-110'
                              />{' '}
                              Instagram
                            </Link>
                            <Link
                              href={process.env.FACEBOOK_URL ?? '#'}
                              className='group flex items-center text-sm text-card-foreground hover:text-primary'
                            >
                              <IconiFy
                                icon={'line-md:facebook'}
                                className='mr-2 w-6 transition-transform group-hover:scale-110'
                              />{' '}
                              Facebook
                            </Link>
                            <Link
                              href={process.env.WHATSAPP_URL ?? '#'}
                              className='group flex items-center text-sm text-card-foreground hover:text-primary'
                            >
                              <IconiFy
                                icon={'ic:twotone-whatsapp'}
                                className='mr-2 w-6 transition-transform group-hover:scale-110'
                              />{' '}
                              WhatsApp
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className='rounded-lg bg-card p-4 shadow-lg md:p-6'>
                        {children}
                      </div>

                      <div className='flex justify-between rounded-lg bg-card p-4 shadow-lg'>
                        <Typography
                          variant={'overline'}
                          className='text-xs text-card-foreground md:text-sm'
                        >
                          © HypeOT 2019-2024. All rights reserved.
                        </Typography>
                        <Typography
                          variant={'overline'}
                          className='text-xs text-card-foreground md:text-sm'
                        >
                          <Link
                            href='#'
                            className='transition-colors hover:text-primary'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 24 24'
                            >
                              <g
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='1.5'
                              >
                                <path d='M3.2 14.222V4a2 2 0 0 1 2-2h13.6a2 2 0 0 1 2 2v10.222m-17.6 0h17.6m-17.6 0l-1.48 5.234A2 2 0 0 0 3.644 22h16.712a2 2 0 0 0 1.924-2.544l-1.48-5.234' />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M11 19h2m1-13l2 2l-2 2m-4-4L8 8l2 2'
                                />
                              </g>
                            </svg>
                          </Link>
                        </Typography>
                      </div>
                    </div>

                    <div className='col-span-12 space-y-6 md:col-span-3'>
                      <Card className='bg-card shadow-lg'>
                        <CardHeader className='border-b border-border'>
                          <CardTitle className='grid grid-cols-2 text-center text-card-foreground'>
                            <div>Creature</div>
                            <div>Boss</div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-row justify-between p-4'>
                          {boostedCreature && boostedCreature[0] && (
                            <Boosted
                              boosted={{
                                boostname: boostedCreature[0].id,
                                lookaddons: 0,
                                lookbody: 0,
                                lookfeet: 0,
                                lookhead: 0,
                                looklegs: 0,
                                lookmount: 0,
                                looktype: boostedCreature[0].id,
                              }}
                              kind='creature'
                            />
                          )}

                          {boostedBoss && boostedBoss[0] && (
                            <Boosted
                              boosted={{
                                boostname: boostedBoss[0].id,
                                lookaddons: 0,
                                lookbody: 0,
                                lookfeet: 0,
                                lookhead: 0,
                                looklegs: 0,
                                lookmount: 0,
                                looktype: boostedBoss[0].id,
                              }}
                              kind='boss'
                            />
                          )}
                        </CardContent>
                      </Card>
                      <div className='rounded-lg bg-card p-4 shadow-lg'>
                        <CountDown hour={19} min={55} />
                      </div>
                      <div className='rounded-lg bg-card p-4 shadow-lg'>
                        <RankPodiumListWidget />
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </SidebarInset>
            </SidebarProvider>
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
