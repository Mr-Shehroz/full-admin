'use client'

import { signOut } from 'next-auth/react'
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  Grid,
  Clipboard,
  Settings,
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/' },
    { name: 'Products', icon: <Package size={18} />, href: '/products' },
    { name: 'Categories', icon: <Grid size={18} />, href: '/categories' },
    { name: 'Orders', icon: <Clipboard size={18} />, href: '/orders' },
    { name: 'Settings', icon: <Settings size={18} />, href: '/settings' },
  ]
  async function logOut () {
    await signOut()
    await router.push('/')
  }

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#84cc16] p-4 text-white fixed top-0 left-0 right-0 z-50">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block fixed top-0 left-0 w-64 h-full bg-[#0f766e] text-white px-4 py-6 z-40 transition-all duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
        <nav className="space-y-3">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === item.href
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded transition ${
                  isActive
                    ? 'bg-[#14b8a6] font-semibold shadow'
                    : 'hover:bg-[#14b8a6]'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          })}
          <button
            onClick={logOut}
            className="w-full mt-6 text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded font-medium transition"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  )
}
