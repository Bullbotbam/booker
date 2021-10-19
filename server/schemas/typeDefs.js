const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
	type Auth {
		token: ID!
		user: User
	}

	type User {
		_id: ID
		username: String
		email: String
		bookCount: Int
		savedBooks: [Book]
	}

	type Book {
		_id: ID
		authors: [String]
		description: String
		bookId: String
		image: String
		link: String
		title: String
	}

	type Query {
		me: User
	}

	input inputSavedBooks {
		bookId: String
		authors: [String]
		description: String
		title: String
		image: String
		link: String
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		saveBook(input: inputSavedBooks!): User
		removeBook(bookId: ID!): User
	}
`;

// export typeDefs;
module.exports = typeDefs;
