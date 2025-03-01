import { getPostedDate, PostFrontMatter } from 'types/PostFrontMatter'

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function sortByDate(posts: PostFrontMatter[]) {
  posts.sort((post1, post2) => dateSortDesc(post1.date, post2.date))
  return posts
}

// Sorts by posted date then by date
export function sortByPostedDate(posts: PostFrontMatter[]) {
  posts.sort((post1, post2) => {
    const result = dateSortDesc(getPostedDate(post1), getPostedDate(post2))
    return result == 0 ? dateSortDesc(post1.date, post2.date) : result
  })
  return posts
}

export function getLatestPostDate(posts: PostFrontMatter[]) {
  let date = ''
  posts.forEach((post) => {
    const postedDate = getPostedDate(post)
    date = postedDate > date ? postedDate : date
  })

  return date
}

export function filterByTag(tag: string, posts: PostFrontMatter[]) {
  return posts.filter((post) => post.tags.includes(tag.toLowerCase()))
}

export function filterByText(text: string, posts: PostFrontMatter[]) {
  return posts.filter((post) => post.title.toLowerCase().includes(text.toLowerCase()))
}

export function removeArchived(posts: PostFrontMatter[]) {
  return posts.filter((post) => !post.archived)
}

const SECTION_HIERARCHY = ['code', 'whitewater', 'photography']

// The order in which tags take precedence for section assignment
export function getSection(post: PostFrontMatter) {
  return SECTION_HIERARCHY.find((tag) => post.tags.includes(tag))
}
