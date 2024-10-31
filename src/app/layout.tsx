import './globals.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

import { Toaster } from "@/components/ui/toaster";
import { Provider } from '@/providers/providers';
import Link from 'next/link';
import MainMenu from '@/components/main-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

import LoginBox from '@/components/login-box';
import configLua from '@/hooks/configLua';
import RashidBox from '@/components/rashid-box';
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
  SidebarGroup, SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarProvider
} from "@/components/ui/sidebar";

import { Download, Menu } from 'lucide-react';
import { getSeverConfig, status, totalOnline } from '@/lib/server-utils';
import MobileMenu from '@/components/mobile-menu';

const lua = configLua()

export const revalidate = 0

export const metadata: Metadata = {
  title: {
    default: lua['serverName'],
    template: `%s - ${lua['serverName']}`,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const statusServer = await status()
  const countOnline = await totalOnline()

  const boostedCreature = await getSeverConfig('boost_monster_url')
  const boostedBoss = await getSeverConfig('boost_boss_url')

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`} suppressHydrationWarning>
        <Provider>
          <div className="fixed top-0 left-0 right-0 bg-secondary border-b border-border z-10">
            <div className="container mx-auto px-4">
              <div className="h-16 flex items-center justify-between">

                <div className="flex md:hidden">
                  <MobileMenu />
                </div>
                <Link
                  href="/download"
                  className="items-center gap-2 text-primary hover:text-primary/90 transition-colors md:flex hidden"
                >
                  <Download className="h-5 w-5" />
                  Download
                </Link>

                <div className="flex flex-col items-center leading-tight">
                  <span className="text-sm text-muted-foreground">PLAYERS ONLINE</span>
                  <span className="text-xl font-bold text-primary">{countOnline}</span>
                </div>

                <div className="gap-3 md:flex hidden">
                  <Link href="#" className="block w-8 h-6 rounded overflow-hidden hover:opacity-80 transition-opacity">
                    <img
                      src="https://flagcdn.com/pl.svg"
                      alt="Polish"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <Link href="#" className="block w-8 h-6 rounded overflow-hidden hover:opacity-80 transition-opacity">
                    <img
                      src="https://flagcdn.com/br.svg"
                      alt="Portuguese"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <Link href="#" className="block w-8 h-6 rounded overflow-hidden hover:opacity-80 transition-opacity">
                    <img
                      src="https://flagcdn.com/es.svg"
                      alt="Spanish"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16">
            <SidebarProvider>
              <Sidebar variant="inset" className="bg-sidebar border-r border-sidebar-border w-72 md:block hidden">
                <SidebarHeader className="p-6">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="lg" asChild className="hover:bg-sidebar-accent/10">
                        <Link href="/">
                          <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <IconiFy icon="line-md:home" className="size-6" />
                          </div>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold text-sidebar-foreground">{lua['serverName']}</span>
                            <span className="truncate text-xs text-sidebar-primary-foreground">Home</span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup className="mb-8">
                    <LoginBox />
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarGroupLabel className="text-sidebar-primary-foreground font-semibold mb-4">Menu</SidebarGroupLabel>
                    <MainMenu />
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="p-6 border-t border-sidebar-border">
                  <span className="flex justify-center text-sm text-sidebar-primary-foreground">Pedrozera!</span>
                </SidebarFooter>
              </Sidebar>
              <SidebarInset>
                <ScrollArea className="h-screen w-full px-4 md:px-12 py-8">
                  <div className='grid sm:grid-cols-12 sm:gap-6 grid-cols-1 mx-auto max-w-screen-xl'>
                    <div className='col-span-12 mb-8'>
                      <div className='flex justify-center items-center'>
                        <Link href="/">
                          <video className='w-full max-w-[380px]' autoPlay muted playsInline loop>
                            <source src="/movies/logo.webm" type="video/webm" />
                          </video>
                        </Link>
                      </div>
                    </div>

                    <div className='col-span-12 md:col-span-9 space-y-6 pb-8'>
                      <div className='bg-card rounded-lg shadow-lg'>
                        <div className='flex items-center justify-between bg-secondary/50 rounded p-4'>
                          <div className='flex flex-wrap gap-4 md:gap-6'>
                            <Link href={'/download'} className='flex items-center text-sm text-card-foreground hover:text-primary group'>
                              <IconiFy icon={'line-md:download-loop'} className="mr-2 group-hover:scale-110 transition-transform" /> Download
                            </Link>
                            <Link href={process.env.DISCORD_URL ?? '#'} className='flex items-center text-sm text-card-foreground hover:text-primary group'>
                              <IconiFy icon={'line-md:discord'} className='w-6 mr-2 group-hover:scale-110 transition-transform' /> Join Discord
                            </Link>
                            <Link href={process.env.YOUTUBE_URL ?? ' #'} className='flex items-center text-sm text-card-foreground hover:text-primary group'>
                              <IconiFy icon={'line-md:youtube'} className='w-6 mr-2 group-hover:scale-110 transition-transform' /> YouTube
                            </Link>
                            <Link href={process.env.INSTAGRAM_URL ?? '#'} className='flex items-center text-sm text-card-foreground hover:text-primary group'>
                              <IconiFy icon={'line-md:instagram'} className='w-6 mr-2 group-hover:scale-110 transition-transform' /> Instagram
                            </Link>
                            <Link href={process.env.FACEBOOK_URL ?? '#'} className='flex items-center text-sm text-card-foreground hover:text-primary group'>
                              <IconiFy icon={'line-md:facebook'} className='w-6 mr-2 group-hover:scale-110 transition-transform' /> Facebook
                            </Link>
                            <Link href={process.env.WHATSAPP_URL ?? '#'} className='flex items-center text-sm text-card-foreground hover:text-primary group'>
                              <IconiFy icon={'ic:twotone-whatsapp'} className='w-6 mr-2 group-hover:scale-110 transition-transform' /> WhatsApp
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className='bg-card shadow-lg rounded-lg p-4 md:p-6'>
                        {children}
                      </div>

                      <div className='flex justify-between p-4 bg-card shadow-lg rounded-lg'>
                        <Typography variant={'overline'} className='text-card-foreground text-xs md:text-sm'>
                          © Progamo Ltda.
                        </Typography>
                        <Typography variant={'overline'} className='text-card-foreground text-xs md:text-sm'>
                          <Link href='#' className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.2 14.222V4a2 2 0 0 1 2-2h13.6a2 2 0 0 1 2 2v10.222m-17.6 0h17.6m-17.6 0l-1.48 5.234A2 2 0 0 0 3.644 22h16.712a2 2 0 0 0 1.924-2.544l-1.48-5.234" /><path strokeLinecap="round" strokeLinejoin="round" d="M11 19h2m1-13l2 2l-2 2m-4-4L8 8l2 2" /></g></svg>
                          </Link>
                        </Typography>
                      </div>
                    </div>

                    <div className='col-span-12 md:col-span-3 space-y-6'>
                      <Card className="bg-card shadow-lg">
                        <CardHeader className='border-b border-border'>
                          <CardTitle className='grid grid-cols-2 text-center text-card-foreground'>
                            <div>Creature</div>
                            <div>Boss</div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-row justify-between p-4'>
                          {boostedCreature && boostedCreature[0] && (
                            <Boosted boosted={{
                              boostname: boostedCreature[0].id,
                              lookaddons: 0,
                              lookbody: 0,
                              lookfeet: 0,
                              lookhead: 0,
                              looklegs: 0,
                              lookmount: 0,
                              looktype: boostedCreature[0].id
                            }} kind="creature" />
                          )}

                          {boostedBoss && boostedBoss[0] && (
                            <Boosted boosted={{
                              boostname: boostedBoss[0].id,
                              lookaddons: 0,
                              lookbody: 0,
                              lookfeet: 0,
                              lookhead: 0,
                              looklegs: 0,
                              lookmount: 0,
                              looktype: boostedBoss[0].id
                            }} kind="boss" />
                          )}
                        </CardContent>
                      </Card>
                      <div className='bg-card shadow-lg rounded-lg p-4'>
                        <CountDown hour={19} min={55} />
                      </div>
                      <div className='bg-card shadow-lg rounded-lg p-4'>
                        <RashidBox />
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
  )
}