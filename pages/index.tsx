import type { NextPage } from 'next'

import Head from 'next/head'

import { useQuery } from '@apollo/client'

import PostBox from '../components/PostBox'
import Feed from '../components/Feed'
import SubredditRow from '../components/SubredditRow'

import { GET_SUBREDDIT_WITH_LIMIT } from '../graphql/queries'

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBREDDIT_WITH_LIMIT, {
    variables: {
      limit: process.env.NEXT_PUBLIC_TOP_COMUNITIES_LIMIT || 10,
    },
  })

  const topSubreddits: Subreddit[] = data?.getSubredditListLimit

  return (
    <div className="my-7 mx-auto max-w-5xl px-4">
      <Head>
        <title>JPA - Reddit Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />
      <div className="flex space-x-4">
        <Feed />
        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <div>
            {topSubreddits?.map((topSubreddit, index) => (
              <SubredditRow key={topSubreddit.id} topic={topSubreddit.topic} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
