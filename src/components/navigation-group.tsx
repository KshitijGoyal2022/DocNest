import { TreeNode } from "@/types/navigation-d"
import NavLink from "./navlink"

export default function NavigationGroup({
    node,
    level = 0, // Base level for top-most nodes
    className,
  }: {
    node: TreeNode
    level?: number // Level to determine the indentation based on depth
    className?: string
  }) {
  
    const paddingLeft = 5 + level * 5 // Adjust padding as needed
  
    return (
      <li
        className='relative mt-2'
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <div className="text-xl font-semibold">
          <NavLink id={node.id}>
            {node.title}
          </NavLink>
        </div>
        <ul role="list">
          {node.children.map((child) => (
            <NavigationGroup node={child} level={level + 1} key={child.id} /> // Recursive call with incremented level
          ))}
        </ul>
      </li>
    )
  }
  