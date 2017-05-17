import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import db from './config/db';
import Users from './app/models/user';
import Feeds from './app/models/feed';

const Feed = new GraphQLObjectType({
    name: 'Feed',
    description: 'This represents a feed',
    fields: () => {
        return {
            title: {
                type: GraphQLString,
                resolve(feed) {
                    return feed.title
                }
            },
            description: {
                type: GraphQLString,
                resolve(feed) {
                    return feed.description
                }
            },
            location: {
                type: GraphQLString,
                resolve(feed) {
                    return feed.location
                }
            },
            rate: {
                type: GraphQLString,
                resolve(feed) {
                    return feed.rate
                }
            },
            category: {
                type: GraphQLString,
                resolve(feed) {
                    return feed.category
                }
            },
            photo: {
                type: GraphQLString,
                resolve(feed) {
                    return feed.photo
                }
            },
            user: {
                type: User,
                resolve(user) {
                    return user.getUser();
                }
            }
        }
    }
})


const User = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(user) {
                    return user.id
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(user) {
                    return user.firstName
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(user) {
                    return user.lastName
                }
            },
            email: {
                type: GraphQLString,
                resolve(user) {
                    return user.email
                }
            },
            token: {
                type: GraphQLString,
                resolve(user) {
                    return user.token
                }
            },
            feeds: {
                type: new GraphQLList(Feed),
                resolve(user) {
                    return user.getFeeds();
                }
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
        return {
            user: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Users.findAll({where: args});
                }
            },
            feeds: {
                type: new GraphQLList(Feed),
                resolve(root, args) {
                    return Feeds.findAll({where: args});
                }
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: Query
})

export default schema;