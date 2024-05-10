import { NotionAPI } from 'notion-client';
import NotionPage from '@/components/notion-page';
import RightSidebar from '@/components/right-sidebar';
import ReactMarkdown from 'react-markdown';
import NotionService from '@/services/notion-service';

export default async function DocumentationPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug;
  
  const notion = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_TOKEN_V2,
  });

  const recordMap = await notion.getPage(id);


    return (
      <div className='flex'>
        <div className='prose lg:prose-xl p-5 min-h-screen '>
          {recordMap ? (
            <>
              <NotionPage recordMap={recordMap} />
              {/* <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className='text-4xl font-bold py-5'>
                      {props.children}
                    </h1>
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className='text-2xl font-bold py-5'>
                      {props.children}
                    </h2>
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className='list-disc list-inside pb-5 pl-2'>
                      {props.children}
                    </ul>
                  ),
                  li: ({ node, ...props }) => (
                    <li className='mb-2'>{props.children}</li>
                  ),
                  p: ({ node, ...props }) => (
                    <p className='block'>{props.children}</p>
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className='text-sky-500 underline'
                      href={props.href}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {props.children}
                    </a>
                  ),
                  img: MarkdownImage,
                }}
              >
                {content}
              </ReactMarkdown> */}
            </>
          ) : (
            <p>No content</p>
          )}
        </div>
        <RightSidebar recordMap={recordMap} />
      </div>
    );
  }

