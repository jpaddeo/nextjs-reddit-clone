import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { useMutation, useQuery } from '@apollo/client'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/outline'

import { Jelly } from '@uiball/loaders'

import TimeAgo from 'react-timeago'
import toast from 'react-hot-toast'

import { GET_ALL_VOTES_BY_POST_ID } from '../../graphql/queries'
import { INSERT_VOTE } from '../../graphql/mutations'

import Avatar from '../PostBox/Avatar'

type Props = {
  post: Post
}

function Post({ post }: Props) {
  const [vote, setVote] = useState<boolean>()
  const { data: session } = useSession()

  const { data: votesData, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  })

  const [addVote] = useMutation(INSERT_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId'],
  })

  const arrowClick = (event: any, isUpVote: boolean) => {
    event.preventDefault()
    upVote(isUpVote)
  }

  const upVote = async (isUpVote: boolean) => {
    if (!session) {
      toast.error('You must be logged in to vote')
      return
    }
    if (vote && isUpVote) return
    if (vote === false && !isUpVote) return

    const notification = toast.loading('Saving your vote...')
    try {
      await addVote({
        variables: {
          post_id: post?.id,
          username: session?.user?.name,
          upvote: Boolean(isUpVote),
        },
      })
      toast.success('Vote saved!', {
        id: notification,
      })
    } catch (error) {
      toast.error(`Something went wrong ${error}`, { id: notification })
    }
  }

  useEffect(() => {
    const votes: Vote[] = votesData?.getVotesByPostId
    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote

    setVote(vote)
  }, [votesData])

  const displayVotes = (data: any) => {
    const votes: Vote[] = votesData?.getVotesByPostId
    if (votes?.length === 0) return 0

    const countVotes = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    )

    if (countVotes === 0) {
      return votes[0].upvote ? 1 : -1
    }

    return countVotes
  }
  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )

  return (
    <Link href={`/post/${post?.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={(ev) => arrowClick(ev, true)}
            className={`vote-button hover:text-blue-400 ${
              vote && 'text-blue-400'
            }`}
          />
          <p className="text-xs font-bold text-black">
            {displayVotes(votesData)}
          </p>
          <ArrowDownIcon
            onClick={(ev) => arrowClick(ev, false)}
            className={`vote-button hover:text-red-400 ${
              vote === false && 'text-red-400'
            }`}
          />
        </div>
        <div className="p-3 pb-1">
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>
              - Posted by u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>

          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          <img className="w-full" src={post.image} alt={post.title} />

          <div className="flex space-x-4 text-gray-400">
            <div className="post-button">
              <ChatAltIcon className="h-6 w-6" />
              <p className="">{post.comments?.length} Comments</p>
            </div>
            <div className="post-button">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Awards</p>
            </div>
            <div className="post-button">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="post-button">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="post-button">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
