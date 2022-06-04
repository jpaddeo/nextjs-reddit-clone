import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'

import Avatar from './PostBox/Avatar'

type Props = {
  topic: String
  index: number
}

export default function SubredditRow({ topic, index }: Props) {
  return (
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
      <Avatar seed={`/subreddit/${topic}`} />
      <p className="flex-1 truncate">r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="cursor-pointer rounded-lg bg-blue-400 p-2 text-white">
          View
        </div>
      </Link>
    </div>
  )
}
