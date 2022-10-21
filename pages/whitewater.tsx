import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { Typography } from '@mui/material'
import ListLayout from '@/layouts/ListLayout'

import {
  getLocalPosts,
  getMediumPosts,
  getAllPosts,
  getPhotographyPosts,
  filterByTag,
  getAllDisplayPosts,
} from '@/lib/utils/contentProvider'
import ArticleCard from '@/components/ArticleCard'
import ArticleGallery from '@/components/ArticleGallery'

export const getStaticProps = async () => {
  // Get all local posts
  const localPosts = await getLocalPosts()
  // Get all remote posts
  const mediumPosts = await getMediumPosts()
  // Get all photography posts
  const photographyPosts = await getPhotographyPosts()
  // Get all posts
  const allPosts = await getAllDisplayPosts()
  // Get all by tag
  const filteredPosts = filterByTag('photography', allPosts)
  // Sort by date
  // Remove archived
  //

  return {
    props: {
      localPosts,
      mediumPosts,
      photographyPosts,
      allPosts,
      filteredPosts,
    },
  }
}
export default function Whitewater({ allPosts }) {
  const posts = allPosts.filter((post) => !post.tags.includes('example'))
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ArticleGallery articles={posts} />
    </>
  )
}
