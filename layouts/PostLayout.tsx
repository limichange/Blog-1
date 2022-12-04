import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ReactNode } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import { getSection } from '@/lib/utils/posts'
import { BlogNewsletterForm } from '@/components/NewsletterForm'
import { useRouter } from 'next/router'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  frontMatter: PostFrontMatter
  authorDetails: AuthorFrontMatter[]
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
}

function onAuthorClick(router) {
  router.push('/about')
}

function AuthorView(props) {
  return (
    <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11">
      <dt className="sr-only">Authors</dt>
      <dd>
        <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
          {props.authorDetails.map((author) => (
            <li className="flex items-center space-x-2" key={author.name}>
              {author.avatar && (
                <Image
                  src={author.avatar}
                  width="38"
                  height="38"
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
                />
              )}
              <dl className="whitespace-nowrap text-sm font-medium leading-5">
                <dt className="sr-only">Name</dt>
                <dd className="text-left text-gray-900">{author.name}</dd>
                <dt className="sr-only">Instagram</dt>
                <dd>
                  {author.instagram && (
                    <Link
                      href={author.instagram}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      {author.instagram.replace('https://www.instagram.com/', '@')}
                    </Link>
                  )}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </dd>
    </dl>
  )
}
function TagView(props) {
  return (
    props.tags && (
      <div className="py-4 xl:py-8">
        <h2 className="text-xs uppercase tracking-wide text-gray-500">Tags</h2>
        <div className="flex flex-wrap">
          {props.tags.map((tag) => (
            <Link
              href={`/search?tag=${tag}`}
              key={tag}
              className="mr-3 mt-2 text-sm font-medium uppercase text-primary-500 hover:text-primary-600"
            >
              {tag.split(' ').join('-')}
            </Link>
          ))}
        </div>
      </div>
    )
  )
}

function NextPreviousView(props) {
  const [next, prev] = [props.next, props.prev]
  return (
    (next || prev) && (
      <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
        {prev && (
          <div>
            <h2 className="text-xs uppercase tracking-wide text-gray-500">Previous Article</h2>
            <div className="text-primary-500 hover:text-primary-600">
              <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
            </div>
          </div>
        )}
        {next && (
          <div>
            <h2 className="text-xs uppercase tracking-wide text-gray-500">Next Article</h2>
            <div className="text-primary-500 hover:text-primary-600">
              <Link href={`/blog/${next.slug}`}>{next.title}</Link>
            </div>
          </div>
        )}
      </div>
    )
  )
}

function BackLink(props) {
  const href = props.section ? '/' + props.section : '/'
  const title = props.section ? props.section : 'Blog'
  const title1 = title[0].toUpperCase() + title.slice(1)

  return (
    <div className="pt-4 xl:pt-8">
      <Link href={href} className="text-primary-500 hover:text-primary-600">
        &larr; {' Back to ' + title1}
      </Link>
    </div>
  )
}

function PrintsView(props) {
  return (
    props.section &&
    props.section === 'photography' && (
      <div className="py-4 xl:pt-8">
        <h2 className="text-xs uppercase tracking-wide text-gray-500">FOR PRINTS, INQUIRE AT:</h2>

        <Link
          href="mailto:prints@gregliest.com"
          className="text-primary-500 hover:text-primary-600"
        >
          prints@gregliest.com
        </Link>
      </div>
    )
  )
}

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }: Props) {
  const { slug, fileName, date, title, tags } = frontMatter
  const section = getSection(frontMatter)
  const router = useRouter()

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />

      <BackLink section={section} />
      <article>
        <div className="xl:divide-y xl:divide-gray-200">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <p
                className={`${
                  frontMatter.draft ? 'flex' : 'hidden'
                } text-extrabold justify-center text-5xl text-red-600`}
              >
                *DRAFT*
              </p>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <button onClick={() => onAuthorClick(router)}>
              <AuthorView authorDetails={authorDetails} />
            </button>
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8">{children}</div>
              <div className="pt-6 pb-6 text-sm text-gray-700">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y"></div>
              <div className="divide-gray-200 text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y">
                <BlogNewsletterForm title="SUBSCRIBE" />
                <PrintsView section={section} />
                <TagView tags={tags} />
                <NextPreviousView next={next} prev={prev} />
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
