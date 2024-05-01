import clsx from "clsx"
import Link from "next/link"

export default function NavLink({
    id,
    children,
    active = false,
    isAnchorLink = false,
  }: {
    id: string
    children: React.ReactNode
    tag?: string
    active?: boolean
    isAnchorLink?: boolean
  }) {
    return (
      <Link
        href={id}
        aria-current={active ? 'page' : undefined}
        className={clsx(
          'flex items-center justify-between gap-2 py-2 pr-3 text-sm transition-colors bg-gray-100 hover:bg-gray-300 rounded-md',
          isAnchorLink ? 'pl-7' : 'pl-4',
          active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-700 hover:text-gray-900',
        )}
      >
        <span className="truncate">{children}</span>
      </Link>
    )
  }