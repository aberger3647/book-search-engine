const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args) => {
            return User.find({ $or: [{ _id: args.id }, { username: args.username }] });
        },
    },
    Mutation: {
        login: async (parent, args) => {
            const user = await User.findOne({
                $or:
                [{ username: args.username },
                { email: args.email}]
            });
            const correctPw = await user.isCorrectPassword(args.password);

            if (!correctPw) { 
                await user.isCorrectPassword(args.password);
            };

            const token = signToken(user)
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id },
                { $addToSet: { savedBooks: args } },
                { new: true, runValidators: true }
            );
            return updatedUser;
        },
        removeBook: async (parent, args) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            return updatedUser;
        },
    }

};

module.exports = resolvers