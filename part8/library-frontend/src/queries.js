import { gql } from '@apollo/client'

export const ALL_AUTHORS_AND_BOOKS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
    allBooks  {
      title
      author
      published
    }
  }
`
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author
      genres
      id
    }
  }
`