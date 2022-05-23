import { gql } from '@apollo/client'

export const INSERT_POST = gql`
  mutation InsertPostMutation(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      id
      created_at
      body
      image
      subreddit_id
      title
      username
    }
  }
`
export const INSERT_SUBREDDIT = gql`
  mutation InsertSubredditMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      created_at
      topic
    }
  }
`
