import { useState } from 'react'

import { useSession } from 'next-auth/react'

import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'

import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'

import { useMutation } from '@apollo/client'

import client from '../../apollo-client'

import Avatar from './Avatar'

import { INSERT_POST, INSERT_SUBREDDIT } from '../../graphql/mutations'
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../../graphql/queries'

type Props = {
  subreddit?: string
}

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

function PostBox({ subreddit }: Props) {
  const { data: session } = useSession()
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const [addPost] = useMutation(INSERT_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  })
  const [addSubreddit] = useMutation(INSERT_SUBREDDIT)

  const onSubmit = handleSubmit(async (formData: FormData) => {
    const notification = toast.loading('Creating post ...')

    try {
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      })

      const subredditExists = getSubredditListByTopic.length > 0
      const image = formData.postImage || ''
      if (!subredditExists) {
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody,
            image,
            subreddit_id: newSubreddit.id,
            username: session?.user?.name,
          },
        })
      } else {
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody,
            image,
            subreddit_id: getSubredditListByTopic[0].id,
            username: session?.user?.name,
          },
        })
      }

      setValue('postTitle', '')
      setValue('postBody', '')
      setValue('postImage', '')
      setValue('subreddit', '')
      toast.success('Post created!', {
        id: notification,
      })
    } catch (error) {
      toast.error('Uops! Something go bad!', {
        id: notification,
      })
    }
  })

  return (
    <form
      className="sticky top-16 md:top-20 z-50 rounded-md border border-gray-300 bg-white p-2"
      onSubmit={onSubmit}
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          type="text"
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none disabled:cursor-not-allowed"
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : 'Create a post by entering a title...'
              : 'Sign in to post'
          }
          {...register('postTitle', { required: true })}
        />
        <PhotographIcon
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300'
          }`}
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
        />
        <LinkIcon className="h-6 cursor-pointer text-gray-300" />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              type="text"
              placeholder="Text (optional)"
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('postBody')}
            />
          </div>

          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit:</p>
              <input
                type="text"
                placeholder="i.e. reactjs"
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register('subreddit', { required: true })}
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                type="text"
                placeholder="Optional"
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register('postImage')}
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>- A Post title is required</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p>- A Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
