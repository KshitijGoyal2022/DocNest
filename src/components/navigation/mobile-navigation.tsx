'use client'
import { useState, useEffect, useRef } from 'react';
import { FiMenu } from 'react-icons/fi';
import NavigationGroup from './navigation-group';

const MobileNavigation = ({ treeData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null); // Reference to the nav element

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the nav if clicking outside
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

  return (
    <div className='fixed z-50' ref={navRef}>
      <FiMenu onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer w-6 h-6 ml-3 mt-4" />
      {isMenuOpen && (
        <ul role='list' className='list-none p-4 bg-gray-600 shadow rounded-lg h-screen w-64'>
          {treeData.map((node, index) => (
            <NavigationGroup key={node.id} node={node} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MobileNavigation;

