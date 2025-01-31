'use client';
import * as React from 'react';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import dynamic from 'next/dynamic';
import useDarkMode from '@/hooks/use-dark-mode';


export default function NotionPage({ recordMap }) {
  const isDarkMode = useDarkMode();
  console.log('isDarkMode', isDarkMode);
  const Code = dynamic(() =>
    import('react-notion-x/build/third-party/code').then((m) => m.Code)
  );
  const Collection = dynamic(() =>
    import('react-notion-x/build/third-party/collection').then(
      (m) => m.Collection
    )
  );
  const Equation = dynamic(() =>
    import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
  );
  const Pdf = dynamic(
    () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
    {
      ssr: false,
    }
  );
  const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
    {
      ssr: false,
    }
  );

  return (
    <div className='max-w-[300px] md:max-w-[550px] lg:max-w-none'>
      <style jsx global>{`
        .notion-collection-row {
          display: none;
        }
      `}</style>
      <NotionRenderer
        recordMap={recordMap}
        darkMode={isDarkMode}
        previewImages={true}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf
        }}
      />
    </div>
  );
}
