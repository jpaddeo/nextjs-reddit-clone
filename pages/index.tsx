import type { NextPage } from 'next'

import Head from 'next/head'

import PostBox from '../components/PostBox'
import Feed from '../components/Feed'

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>JPA - Reddit Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />
      <div className="flex">
        <Feed />
      </div>
    </div>
  )
}

export default Home
