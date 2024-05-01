import NotionService from "@/services/notion-service"
import NavigationGroup from "./navigation-group"

export async function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
    const notionService = new NotionService()
    const treeData = await notionService.getAllPages()
   
    return (
      <nav {...props}>
        <ul role="list" className="list-none p-4 bg-white shadow rounded-lg">
          {treeData.map((node, index) => (
            <NavigationGroup
              key={node.id}
              node={node}
            />
          ))}
        </ul>
      </nav>
    )
  }