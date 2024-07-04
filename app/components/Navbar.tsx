'use client'

import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";


const links = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Men',
    href: '/men'
  },
  {
    name: 'Women',
    href: '/women'
  },
  {
    name: 'Teens',
    href: '/teens'
  },

]



export default function Navbar() {

  const path = usePathname();
  const {handleCartClick} = useShoppingCart()
  return (
    <header className="mb-4 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href={'/'}>
          <h1 className="text-2xl md:text-4xl font-bold ">Next<span className="text-primary">Cart</span></h1>
        </Link>

        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {path === link.href ? (
                <Link href={link.href} className="text-primary font-semibold">{link.name}</Link>
              ) : (
                <Link href={link.href} className="hover:text-primary font-semibold text-gray-600 transition duration-300 ">{link.name}</Link>
              )}
            </div>

          ))}
        </nav>

        <div className="flex divide-x border-r sm:border-l">
          <Button onClick={() => handleCartClick()} variant='outline' className="flex flex-col gap-y-1.5 h-12 w-12 sm:w-20 sm:h-20 md:h-16 md:w-24 rounded-none">

            <ShoppingCartIcon  className="w-6 h-6" />
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">Cart</span>
          </Button>
          


        </div>

      </div>
    </header>
  )
}