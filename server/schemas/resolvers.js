const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select('-__v -password')
					.populate('savedBooks');

				return userData;
			}
			throw new AuthenticationError('Please log in for more information');
		},
		// // get all books
		// books: async () => {
		// 	return Book.find();
		// },
		// // get a book by id
		// book: async (parent, { title }) => {
		// 	return Book.findOne({ title });
		// },
		// get all users
		// users: async () => {
		// 	return User.find().select('-__v -password').populate('books');
		// },
		// user: async (parent, { username }) => {
		// 	return User.findOne({ username })
		// 		.select('-__v -password')
		// 		.populate('books');
		// },
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Incorrent credentials');
			}
			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}
			const token = signToken(user);
			return { token, user };
		},
		saveBook: async (parent, { book }, context) => {
			if (context.user) {
				const book = await Book.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { savedBooks: { input } } },
					{ new: true }
				).populate('savedBooks');
				return book;
			}
		},
		removeBook: async (paremt, { bookId }, context) => {
			if (context.user) {
				const book = await Book.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { savedBooks: { bookId: bookId } } }
				);
				return book;
			}
		},
	},
};

module.exports = resolvers;
