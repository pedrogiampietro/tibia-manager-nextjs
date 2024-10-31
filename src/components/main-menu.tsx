import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import Link from "next/link";


export default function MainMenu() {
  return (
    <Accordion type="single" collapsible className="space-y-2 p-2 bg-sidebar rounded-lg">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="p-2 bg-primary rounded-md text-white hover:bg-sidebar-primary-foreground transition-colors flex justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={'/icons/icon-news.gif'}
              width={24}
              height={24}
              alt="News Icon"
            />
            <span className="text-white">News</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <div className="flex flex-col space-y-2">
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/'}>Last news</Link>
            </Button>
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/road-map'}>Road Map</Link>
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-none">
        <AccordionTrigger className="p-2 bg-primary rounded-md text-white hover:bg-sidebar-primary-foreground transition-colors flex justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={'/icons/icon-community.gif'}
              width={24}
              height={24}
              alt="Community Icon"
            />
            <span className="text-white">Community</span>
          </div>

        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <div className="flex flex-col space-y-2">
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/characters'}>Characters</Link>
            </Button>
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/online'}>Who's Online</Link>
            </Button>
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/highscores'}>Highscores</Link>
            </Button>
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/guilds'}>Guilds</Link>
            </Button>
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/last-kills'}>Last Kills</Link>
            </Button>
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/support-list'}>Support List</Link>
            </Button>
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/casts'}>Casts</Link>
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="border-none">
        <AccordionTrigger className="p-2 bg-primary rounded-md text-white hover:bg-sidebar-primary-foreground transition-colors flex justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={'/icons/icon-library.gif'}
              width={24}
              height={24}
              alt="Library Icon"
            />
            <span className="text-white">Library</span>
          </div>
 
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <div className="flex flex-col space-y-2">
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/server-info'}>Server Infos</Link>
            </Button>
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/loyalty'}>Loyalty</Link>
            </Button>
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/rules'}>Rules</Link>
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="border-none">
        <AccordionTrigger className="p-2 bg-primary rounded-md text-white hover:bg-sidebar-primary-foreground transition-colors flex justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={'/icons/icon-shops.gif'}
              width={24}
              height={24}
              alt="Shop Icon"
            />
            <span className="text-white">Shop</span>
          </div>
       
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <div className="flex flex-col space-y-2">
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/shop'}>Buy Coins</Link>
            </Button>
            <Button asChild className="justify-start text-sm text-gray-200 bg-gray-700 rounded-md">
              <Link href={'/character-market'}>Character Market</Link>
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
