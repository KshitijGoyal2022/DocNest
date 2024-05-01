import NotionService from '@/services/notion-service';
import ReactMarkdown from 'react-markdown';

export default async function DocumentationPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug;
  const notionService = new NotionService();
  const content = await notionService.getSinglePage(id);
  console.log('Page ID:', typeof id);

  return (
    <div className='prose lg:prose-xl mx-auto p-5'>
      {content ? (
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className='text-4xl font-bold py-5'>{props.children}</h1>
            ),
            h2: ({ node, ...props }) => (
              <h2 className='text-2xl font-bold py-5'>{props.children}</h2>
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
          }}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <p>No content</p>
      )}
    </div>
  );
}
