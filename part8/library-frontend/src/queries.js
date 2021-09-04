import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
    id
  }
`

export const ALL_AUTHORS_AND_BOOKS = gql`
  ${BOOK_DETAILS}
  query {
    allAuthors {
      name
      born
      bookCount
    }
    allBooks {
      ...BookDetails
    }
  }
`

export const ADD_BOOK = gql`
  ${BOOK_DETAILS}
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_BOOKS_WITH_GENRE = gql`
  ${BOOK_DETAILS}
  query all_books_with_genre($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`