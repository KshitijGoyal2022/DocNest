import Link from 'next/link';

export default function NavLink({
  id,
  children,
  icon = null,
}: {
  id: string;
  children: React.ReactNode;
  icon?: React.ReactNode; 
}) {
  return (
    <Link
      href={`/docs/${id}`}
      className='flex items-center justify-between gap-2 py-2 pr-3 pl-4 text-sm transition-colors duration-300 ease-in-out rounded-md '
    >
      {icon && <span className='mr-2 flex items-center'>{icon}</span>}
      <span className='truncate flex-1'>{children}</span>
    </Link>
  );
}
