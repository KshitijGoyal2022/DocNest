export interface Page {
    id: string
    title: string
    hasSubItems: boolean
    parentId?: string | null
    subItems?: Page[]
  }
  
  export interface TreeNode {
    id: string
    title: string
    children: TreeNode[]
  }