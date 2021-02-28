import fs from "fs"
import matter from "gray-matter"
import path from "path"

const postDir = path.join(process.cwd(), "src/posts")

export const getPostMetadata = () => {
  const files = fs.readdirSync(path.join(postDir))
  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(postDir, filename), "utf-8")
    const { data: frontMatter } = matter(fileContent)
    const metaData = {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    }
    return metaData
  })

  return posts.sort((p1, p2) => (new Date(p2.meta.date)).getTime() - (new Date(p1.meta.date)).getTime())
}

export const getSinglePostMetadata = (slug: string) => {
  const markdownFile = fs.readFileSync(path.join(postDir, slug + ".mdx"), "utf-8")
  const { data: frontMatter, content } = matter(markdownFile)
  return {
    frontMatter: frontMatter,
    slug,
    content,
  }
}

export const getAllTags = () => {
  const tags: string[] = []

  const files = fs.readdirSync(path.join(postDir))
  files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(postDir, filename), "utf-8")
    const { data: frontMatter } = matter(fileContent)
    tags.push(...frontMatter.tags)
  })

  return Array.from(new Set(tags))
}