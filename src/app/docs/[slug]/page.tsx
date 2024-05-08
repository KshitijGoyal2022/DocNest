import { NotionAPI } from 'notion-client';
import NotionPage from '@/components/notion-page';

export default async function DocumentationPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug;
  const notion = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_TOKEN_V2
  })
  const recordMap = await notion.getPage(id);

  return (
    <div className='prose lg:prose-xl mx-auto p-5 min-h-screen '>
      {recordMap ? (
        <>
          <NotionPage recordMap={recordMap} />
        </>
      ) : (
        <p>No content</p>
      )}
    </div>
  );
}
