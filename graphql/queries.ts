import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query GetSubredditListByTopicQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      created_at
      topic
    }
  }
`

export const GET_SUBREDDIT_WITH_LIMIT = gql`
  query GetSubredditWithLimitQuery($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      id
      created_at
      topic
    }
  }
`

export const GET_ALL_POSTS = gql`
  query GetAllPostsQuery {
    getPostList {
      id
      created_at
      body
      image
      title
      subreddit_id
      username
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

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query GetAllVotesByPostIdQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      id
      created_at
      post_id
      upvote
      username
    }
  }
`

export const GET_ALL_POST_BY_TOPIC = gql`
  query GetAllPostByTopicQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      id
      created_at
      body
      image
      title
      subreddit_id
      username
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

export const GET_POST_BY_ID = gql`
  query GetAllPostByTopicQuery($id: ID!) {
    getPostListById(id: $id) {
      id
      created_at
      body
      image
      title
      subreddit_id
      username
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
