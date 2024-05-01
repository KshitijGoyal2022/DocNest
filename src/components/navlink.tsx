import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function NavLink({
  id,
  children,
  icon = null,
}: {
  id: string;
  children: React.ReactNode;
  icon?: React.ReactNode; 
}) {

  const pathname = usePathname();
  const isActive = pathname === `/docs/${id}`; // Update this path as necessary to match your routing structure
  const activeClass = "border-l-4 border-blue-500";
  return (
    <Link
      href={`/docs/${id}`}
      className={`flex items-center justify-between gap-2 py-2 pr-3 pl-4 text-sm transition-colors duration-300 ease-in-out rounded-md w-full ${isActive ? activeClass : ''}`}
    >
      {icon && <span className='mr-2 flex items-center'>{icon}</span>}
      <span className='truncate flex-1'>{children}</span>
    </Link>
  );
}
