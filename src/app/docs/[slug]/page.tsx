import NotionService from '@/services/notion-service';

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
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p>No content</p>
      )}
    </div>
  );
}
