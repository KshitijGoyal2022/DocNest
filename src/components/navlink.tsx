import clsx from "clsx";
import Link from "next/link";

export default function NavLink({
  id,
  children,
  active = false,
  isAnchorLink = false,
  icon = null, // Optional icon to include in the NavLink
}: {
  id: string;
  children: React.ReactNode;
  tag?: string;
  active?: boolean;
  isAnchorLink?: boolean;
  icon?: React.ReactNode; // React node for an icon
}) {
  return (
    <Link
      href={id}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex items-center justify-between gap-2 py-2 pr-3 pl-4 text-sm transition-colors duration-300 ease-in-out rounded-md',
        {
          'pl-7': isAnchorLink,
          'bg-blue-500 text-white hover:bg-blue-600': active,
          'bg-gray-100 hover:bg-gray-300 text-gray-700 hover:text-gray-900': !active,
        }
      )}
    >
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      <span className="truncate flex-1">{children}</span>
    </Link>
  );
}
