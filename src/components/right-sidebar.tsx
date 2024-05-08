'use client'
import { useEffect } from 'react';

export default function RightSidebar({ recordMap }) {
    const extractHeadings = (recordMap) => {
      const headings = [];
  
      if (recordMap && recordMap.block) {
        for (const blockId in recordMap.block) {
          const block = recordMap.block[blockId].value;
          if (['header', 'sub_header', 'sub_sub_header'].includes(block.type)) {
            console.log("Original ID:", blockId);  // Debug: Log original ID
            const dataId = blockId.replace(/-/g, '');  // Attempt to remove hyphens
            console.log("Modified ID:", dataId);  // Debug: Log modified ID
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

    // Custom hook to handle smooth scrolling to elements with data-id
    useEffect(() => {
        const handleLinkClick = event => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            const targetElement = document.querySelector(`[data-id="${targetId}"]`);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };

        // Attach event listeners to all anchor tags
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleLinkClick);
        });

        // Clean up the event listeners when the component unmounts
        return () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleLinkClick);
            });
        };
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    return (
      <div className='w-64 bg-gray-50 h-full overflow-y-auto fixed right-0 top-0 p-5 shadow-lg'>
        <ul className='list-none p-0 m-0'>
          {headings.map((heading, index) => (
            <li key={index} className='mb-2'>
              <a href={`#${heading.id}`} className='text-blue-600 font-semibold hover:underline'>
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
