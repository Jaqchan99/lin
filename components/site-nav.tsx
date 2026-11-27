'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const items = [
  { label: '首頁', href: '/', match: (path: string) => path === '/' },
  {
    label: '作品集',
    href: '/collection',
    match: (path: string) =>
      path.startsWith('/collection') || path.startsWith('/cocktail'),
  },
  { label: '關於我', href: '/#about', match: () => false },
]

export function SiteNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="主選單">
      <ul className="flex items-center gap-6 text-sm sm:gap-10">
        {items.map((item) => {
          const active = item.match(pathname)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-block border-b py-1 tracking-[0.08em] transition-colors outline-offset-4 focus-visible:outline-2 focus-visible:outline-ink',
                  active
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-soft hover:text-ink',
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
