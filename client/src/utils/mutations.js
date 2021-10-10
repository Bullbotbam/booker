import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation saveBook($input: inputSavedBooks!) {
		saveBook(input: $input) {
			_id
			username
			email
			bookCount
			savedBooks {
				_id
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;

export const REMOVE_BOOK = gql`
	mutation removeBook($book: String!) {
		removeBook(bookId: $bookId) {
			_id
			username
			bookCount
			savedBooks {
				_id
				author
				desciption
				title
				image
				link
			}
		}
	}
`;
