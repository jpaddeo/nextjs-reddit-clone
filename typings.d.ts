type Comments = {
  id: number
  created_at: string
  text: string
  username: string
}

type Vote = {
  id: number
  created_at: string
  post_id: number
  upvote: boolean
  username: string
}

type Subreddit = {
  id: number
  created_at: string
  topic: string
}

type Post = {
  id: number
  created_at: string
  body: string
  image: string
  title: string
  username: string
  subreddit_id: number
  votes: Vote[]
  comments: Comments[]
  subreddit: Subreddit[]
}
