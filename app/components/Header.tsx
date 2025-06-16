import Link from 'next/link'
import { UserNav } from '@/app/components/UserNav'

export function Header() {
  return (
    <header className="h-16 z-50">
        <div className="flex items-center justify-end w-full gap-4 h-full px-4">
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/help" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Help
            </Link>
            <Link href="/notifications" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Notifications
            </Link>
          </nav>
          <UserNav />
        </div>
    </header>
  )
} 