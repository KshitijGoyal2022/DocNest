'use client'
import { useState } from 'react';
import NavLink from "./navlink";
import { TreeNode } from '@/types/navigation-d';

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function NavigationGroup({
    node,
    level = 0, // Base level for top-most nodes
    className,
  }: {
    node: TreeNode;
    level?: number; // Level to determine the indentation based on depth
    className?: string;
  }) {
    const [isOpen, setIsOpen] = useState(false); // State to toggle visibility
    const paddingLeft = 5 + level * 5; // Adjust padding as needed

    const toggleChildren = () => {
        setIsOpen(!isOpen); // Toggle the visibility of children
    };

    return (
      <li
        className='relative mt-2'
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <div className="text-xl font-semibold flex justify-between items-center">
          <NavLink id={node.id}>{node.title}</NavLink>
          {node.children.length > 0 && (
            <button
              onClick={toggleChildren}
              className="text-sm px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
              aria-label={isOpen ? "Collapse" : "Expand"}
            >
              {isOpen ? <FaArrowUp className='w-3 h-3'/> : <FaArrowDown className='w-3 h-3' />} {/* Display '+' or '-' based on the state */}
            </button>
          )}
        </div>
        {isOpen && (
          <ul role="list">
            {node.children.map((child) => (
              <NavigationGroup node={child} level={level + 1} key={child.id} /> // Recursive call with incremented level
            ))}
          </ul>
        )}
      </li>
    );
  }
