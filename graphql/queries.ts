import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query GetSubredditListByTopicQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`
export const GET_ALL_POSTS = gql`
  query GetAllPostsQuery {
    getPostList {
      body
      created_at
      id
      image
      title
      subreddit_id
      username,
      subreddit {
        id
        created_at
        topic
      }      
      comments {
        id
        created_at
        text
        username
      }
      votes {
        id
        created_at
        upvote
        username
      }
    }
  }
`
