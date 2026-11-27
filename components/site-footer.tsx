import Link from 'next/link'

const contacts = [
  { label: 'Email', href: 'mailto:hello@example.com' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'WeChat', href: '#' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-ink">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 py-10 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16">
        <div className="flex flex-col gap-3">
          <p className="font-wide text-3xl font-extrabold tracking-[0.01em]">
            LIN
          </p>
          <p className="text-xs tracking-[0.12em] text-ink-soft">
            Bartender / Mixologist
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <nav aria-label="頁尾選單">
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/" className="hover:underline underline-offset-4">
                  首頁
                </Link>
              </li>
              <li>
                <Link
                  href="/collection"
                  className="hover:underline underline-offset-4"
                >
                  作品集
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:underline underline-offset-4"
                >
                  關於我
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <p className="mb-2 text-[11px] tracking-[0.14em] text-ink-soft">
              聯絡（佔位連結）
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {contacts.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    className="hover:underline underline-offset-4"
                  >
                    {contact.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-1 border-t border-rule px-5 py-5 text-[11px] tracking-[0.1em] text-ink-soft sm:flex-row sm:justify-between sm:px-10 lg:px-16">
        <span>© 2026 LIN — Cocktail Archive</span>
        <span className="flex flex-wrap items-center gap-x-4">
          <span>示意插畫 · 配方僅供參考</span>
          <Link
            href="/studio"
            className="underline-offset-4 hover:text-ink hover:underline"
          >
            創作者入口
          </Link>
        </span>
      </div>
    </footer>
  )
}
