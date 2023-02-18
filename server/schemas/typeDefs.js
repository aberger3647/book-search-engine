const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        user: [User]
    }

    input BookInput {
        authors: [authors]
        description: String!
        title: String!
        bookId: String!
        image: String
        link: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth 
        addUser(username: String!, email: String!, password! String!): Auth
        saveBook(BookInput): User 
        removeBook(bookId: String): User
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        bookId!: String!
        authors: [authors]
        description: String!
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: String!
        user: [User]
    }
`

module.exports = typeDefs;