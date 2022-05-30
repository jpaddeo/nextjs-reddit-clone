import type { NextPage } from 'next'

import Head from 'next/head'

import PostBox from '../components/PostBox'
import Feed from '../components/Feed'

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl px-4">
      <Head>
        <title>JPA - Reddit Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />
      <div className="flex space-x-4">
        <Feed />
        <div className="mt-5 hidden rounded-md border border-gray-300 bg-white shadow-sm lg:flex">
          <p>Top Communities</p>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Home
