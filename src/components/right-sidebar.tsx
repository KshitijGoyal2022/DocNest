'use client'
import { useEffect, useState } from 'react';

export default function RightSidebar({ recordMap }) {
    const [selectedId, setSelectedId] = useState(null); // State to track selected ID

    const extractHeadings = (recordMap) => {
      const headings = [];
  
      if (recordMap && recordMap.block) {
        for (const blockId in recordMap.block) {
          const block = recordMap.block[blockId].value;
          if (['header', 'sub_header', 'sub_sub_header'].includes(block.type)) {
            const dataId = blockId.replace(/-/g, '');
            headings.push({
              id: dataId,
              text: block.properties?.title[0][0],
            });
          }
        }
      }
      return headings;
    };

    const headings = extractHeadings(recordMap);
    console.log(headings)

    useEffect(() => {
        const handleLinkClick = event => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            console.log("Target ID:", targetId);
            setSelectedId(targetId);  // Update the selectedId state on click
            const targetElement = document.querySelector(`[data-id="${targetId}"]`);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', handleLinkClick);
        });

        // Debug: Log the current selectedId
        console.log("Current selectedId:", selectedId);

        return () => {
            anchors.forEach(anchor => {
                anchor.removeEventListener('click', handleLinkClick);
            });
        };
    }, [selectedId]); // Include selectedId in the dependency array to update component with state changes

    return (
      <div className='w-64 bg-white overflow-y-auto fixed right-20 top-30 p-5 border-gray-400 border-b'>
        <span className='text-black text-sm font-medium'>On this page</span>
        <ul className='list-none p-0 mt-3'>
          {headings.map((heading, index) => (
            <li key={index} className='mb-1'>
              <a href={`#${heading.id}`} className={` hover:text-gray-600 text-sm font-medium ${selectedId === heading.id ? 'text-sky-600' : 'text-gray-400'}`}>
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
}
