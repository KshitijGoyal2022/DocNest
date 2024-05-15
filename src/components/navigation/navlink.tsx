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
  const isActive = pathname === `/docs/${id}`; 
  const activeClass = "border-l-4 border-blue-500 bg-blue-100 dark:bg-blue-900 dark:border-blue-500 text-blue-500 dark:text-blue-500";
  return (
    <Link
      href={`/docs/${id}`}
      className={`flex items-center justify-between py-2 pl-2 text-sm transition-colors duration-300 ease-in-out rounded-md w-full ${isActive ? activeClass : ''}`}
    >
      
      <span className='truncate flex-1'>{children}</span>
      {icon && <span className='mr-2 flex items-center text-xl'>{icon}</span>}
    </Link>
  );
}
