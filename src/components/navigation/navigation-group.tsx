'use client';
import { useState } from 'react';
import NavLink from './navlink';
import { TreeNode } from '@/types/navigation-d';

import { MdKeyboardArrowDown , MdKeyboardArrowRight  } from 'react-icons/md';

export default function NavigationGroup({
  node,
  level = 0,
}: {
  node: TreeNode;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const paddingLeft = 5 + level * 5;

  const toggleChildren = () => {
    setIsOpen(!isOpen);
  };
  const icon = isOpen ?  <MdKeyboardArrowDown /> : <MdKeyboardArrowRight /> ;

  return (
    <li className='relative mt-1' style={{ paddingLeft: `${paddingLeft}px` }}>
      <div
        className='text-xl font-semibold flex justify-between items-center hover:bg-gray-100 text-gray-700 hover:text-gray-900 rounded-lg'
        onClick={toggleChildren}
      >
        <NavLink id={node.id} icon={node.children.length ? icon : null}>{node.title}</NavLink>
        
      </div>
      {isOpen && (
        <ul role='list'>
          {node.children.map((child) => (
            <NavigationGroup node={child} level={level + 1} key={child.id} />
          ))}
        </ul>
      )}
    </li>
  );
}
