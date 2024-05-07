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

  const modifiedRecordMap = { ...recordMap }; // Create a shallow copy of the recordMap

  // if (recordMap && recordMap.block) {
  //   const blockIds = Object.keys(recordMap.block); // Get all block IDs
  //   if (blockIds.length > 0) {
  //     const firstBlockId = blockIds[4]; // Assume the first one in the order is the one to remove
  //     delete modifiedRecordMap.block[firstBlockId]; // Remove the first block from the record
  //   }
  // }
  console.log(modifiedRecordMap)
;

  return (
    <div className='prose lg:prose-xl mx-auto p-5 min-h-screen '>
      {recordMap ? (
        <>
          <NotionPage recordMap={modifiedRecordMap} />
        </>
      ) : (
        <p>No content</p>
      )}
    </div>
  );
}
