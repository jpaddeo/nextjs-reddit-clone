import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TimeAgo from 'react-timeago'

import { GET_POST_BY_ID } from '../../graphql/queries'
import { INSERT_COMMENT } from '../../graphql/mutations'

import Post from '../../components/Feed/Post'
import Avatar from '../../components/PostBox/Avatar'

type Props = {}

type FormData = {
  comment: string
}

function PostPage({}: Props) {
  const {
    query: { id },
  } = useRouter()
  const { data: session } = useSession()

  const { data } = useQuery(GET_POST_BY_ID, {
    variables: {
      id: id,
    },
  })
  const post: Post = data?.getPostListById

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const [addComment] = useMutation(INSERT_COMMENT, {
    refetchQueries: [GET_POST_BY_ID, 'getPostListById'],
  })

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const notification = toast.loading('Saving your comment...')
    try {
      await addComment({
        variables: {
          post_id: id,
          username: session?.user?.name,
          text: formData.comment,
        },
      })

      setValue('comment', '')
      toast.success('Comment created!', {
        id: notification,
      })
    } catch (error) {
      toast.error('Uops! Something go bad!', {
        id: notification,
      })
    }
  }

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <textarea
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? 'What are your thoughts?' : 'Please sign in to comment'
            }
            {...register('comment')}
          />
          <button
            type="submit"
            disabled={!watch('comment')}
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>

      <div className="-my-5 rounded-b-md border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />

        {post?.comments.map((comment) => (
          <div
            key={comment.id}
            className="relative flex items-center space-x-2 space-y-5"
          >
            <hr className="absolute top-10 left-7 z-0 h-16 border" />
            <div>
              <Avatar seed={comment.username} />
            </div>
            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">
                  {comment.username}
                </span>
                {' - '}
                <TimeAgo date={comment.created_at} />
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPage
