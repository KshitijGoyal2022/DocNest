// @ts-nocheck 

import { Page, TreeNode } from '@/types/navigation-d'
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'


export default class NotionService {
  client: Client
  n2m: NotionToMarkdown

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_API_KEY })
    this.n2m = new NotionToMarkdown({ notionClient: this.client })
  }

  async getAllPages() {
    try {
      const databaseId = process.env.NOTION_DOC_DATABASE_ID!;
      const response = await this.client.databases.query({
        database_id: databaseId,
      });
  
      const pages = response.results.map((page) => ({
        id: page.id,
        title: page.properties['Name'].title[0].text.content,
        hasSubItems: page.properties['Sub-item']?.relation?.length > 0,
        parentId: page.properties['Parent item']?.relation[0]?.id || null,
      }));
  
      const tree = this.buildTree(pages);
      return tree;
    } catch (error) {
      console.error("Error fetching pages from Notion:", error);
      return []; // Return an empty array or handle the error as appropriate
    }
  }
  
  async getSinglePage(pageId: string) {
    const mdBlocks = await this.n2m.pageToMarkdown(pageId)
    let markdown = this.n2m.toMarkdownString(mdBlocks)
    return markdown.parent
  }

  private buildTree(pages: Page[], parentId: string | null = null): TreeNode[] {
    return pages
      .filter((page) => page.parentId === parentId)
      .map((page) => ({
        id: page.id,
        title: page.title,
        children: page.hasSubItems ? this.buildTree(pages, page.id) : [],
      }))
  }
}
