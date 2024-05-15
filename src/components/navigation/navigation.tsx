import NotionService from '@/services/notion-service';
import NavigationGroup from './navigation-group';
import MobileNavigation from './mobile-navigation';

export async function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  const notionService = new NotionService();
  const treeData = await notionService.getAllPages();
  console.log('Fetched tree data again');

  return (
    <nav {...props}>
      <ul
        role='list'
        className='list-none hidden lg:block p-4 shadow rounded-lg '
      >
        {treeData.map((node, index) => (
          <NavigationGroup key={node.id} node={node} />
        ))}
      </ul>

      <ul className='block lg:hidden'>
        <MobileNavigation treeData={treeData} />
      </ul>
    </nav>
  );
}
