'use client';
import { useEffect, useState, useRef } from 'react';

export default function RightSidebar({ recordMap }) {
  const [selectedId, setSelectedId] = useState(null);
  const clickInProgress = useRef(false);

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
    const handleScroll = () => {
      if (clickInProgress.current) return; // Prevent handling scroll during click-induced scroll
      const offset = 130;
      const scrollPosition = window.scrollY + offset;
      let closestHeading = null;
      let smallestDiff = Infinity;

      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) {
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          const diff = Math.abs(elementPosition - scrollPosition);

          if (elementPosition >= scrollPosition && diff < smallestDiff) {
            smallestDiff = diff;
            closestHeading = heading.id;
          }
        }
      });

      const reachedBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (reachedBottom) {
        closestHeading = headings[headings.length - 1]?.id;
      }

      setSelectedId(closestHeading);
    };

    const handleLinkClick = (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').substring(1);
      setSelectedId(targetId);
      clickInProgress.current = true;
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        setTimeout(() => {
          clickInProgress.current = false;
        }, 1000); // Adjust timeout duration as needed
      }
    };

    window.addEventListener('scroll', handleScroll);
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => anchor.addEventListener('click', handleLinkClick));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      anchors.forEach((anchor) => anchor.removeEventListener('click', handleLinkClick));
    };
  }, [headings]);

  return (
    <div className='w-40 lg:w-64 bg-white overflow-y-auto fixed right-0 lg:right-20 top-30 p-5 border-gray-200 border-l hidden md:block'>
      <span className='text-black text-sm font-medium'>On this page</span>
      <ul className='list-none p-0 mt-3'>
        {headings.map((heading, index) => (
          <li key={index} className='mb-1'>
            <a
              href={`#${heading.id}`}
              className={`hover:text-gray-500 text-sm font-medium ${
                selectedId === heading.id ? 'text-sky-600' : 'text-gray-400'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
