'use client'
import { pb } from '@/my-lib/pocketbase'
import { Button } from '@/components/ui/button'
import { Menu, X, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { userAtom } from '@/jotai'
import { IUser } from '@/types'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const user = useAtomValue(userAtom) as IUser
  const setUser = useSetAtom(userAtom)
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Posts', href: '/posts' },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex min-w-1/3 flex-grow-1">
              <span className="text-2xl font-bold text-gray-800 w-full flex">Te Rangitaki</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block w-2/3">
            <div className=" flex justify-around ">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!user && (
              <a href="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </a>
            )}
            {user && (
              <>
                {user.role === 'editor' && (
                  <Link href="/new">
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New
                    </Button>
                  </Link>
                )}
                <Button
                  size="sm"
                  onClick={() => {
                    pb.authStore.clear()
                    setUser([])
                    window.location.reload()
                  }}
                >
                  Sign Out
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 space-y-2 px-3">
              {!user && (
                <a href="/login">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </a>
              )}
              {user && (
                <Button
                  className="w-full"
                  onClick={() => {
                    pb.authStore.clear()
                  }}
                >
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar