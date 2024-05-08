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

    useEffect(() => {
        const handleLinkClick = event => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            const targetElement = document.querySelector(`[data-id="${targetId}"]`);
            setSelectedId(targetId);  // Update the selectedId state on click

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleLinkClick);
        });

        return () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleLinkClick);
            });
        };
    }, []); 

    return (
      <div className='w-64 bg-white h-full overflow-y-auto fixed right-20 top-30 p-5'>
        <ul className='list-none p-0 m-0'>
          {headings.map((heading, index) => (
            <li key={index} className='mb-2'>
              <a href={`#${heading.id}`} className={`text-gray-400 hover:text-black text-sm ${selectedId === heading.id ? 'text-sky-500' : ''}`}>
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
