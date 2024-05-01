'use client'
import { useState } from 'react';
import NavLink from "./navlink";
import { TreeNode } from '@/types/navigation-d';

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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

    return (
      <li
        className='relative mt-2'
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <div className="text-xl font-semibold flex justify-between items-center bg-gray-100 hover:bg-gray-300 text-gray-700 hover:text-gray-900 rounded-lg" onClick={toggleChildren}>
          <NavLink id={node.id}>{node.title}</NavLink>
          {/* {node.children.length > 0 && (
            <button
              onClick={toggleChildren}
              className="text-sm px-2 py-1 rounded-md"
              aria-label={isOpen ? "Collapse" : "Expand"}
            >
              {isOpen ? <FaArrowUp className='w-3 h-3'/> : <FaArrowDown className='w-3 h-3' />}
            </button>
          )} */}
        </div>
        {isOpen && (
          <ul role="list">
            {node.children.map((child) => (
              <NavigationGroup node={child} level={level + 1} key={child.id} />
            ))}
          </ul>
        )}
      </li>
    );
  }
