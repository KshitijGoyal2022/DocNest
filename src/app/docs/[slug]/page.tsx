import { NotionAPI } from 'notion-client';
import NotionPage from '@/components/notion-page';
import RightSidebar from '@/components/right-sidebar';

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
          </>
        ) : (
          <p>No content</p>
        )}
      </div>
      <RightSidebar recordMap={recordMap} />
    </div>
  );
}
