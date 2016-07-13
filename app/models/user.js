import db from '../db';
import Feed from './feed';
import _ from 'lodash';
import Faker from 'faker';

let sequelize = db.sequelize;
let Sequelize = db.Sequelize;

var User = sequelize.define('Users', {
	username: {
		type: Sequelize.STRING
	}, 
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	isAdmin: {
		type: Sequelize.BOOLEAN
	},
	token: {
		type: Sequelize.STRING(1200)
	}
}, { freezeTableName: true });

User.hasMany(Feed);
Feed.belongsTo(User);

sequelize.sync({force: true})
	.then(() => {
		_.times(10, () => {
			return User.create({
				username: Faker.internet.userName(),
				firstName: Faker.name.firstName(),
				lastName: Faker.name.lastName(),
				email: Faker.internet.email(),
				password: Faker.internet.password(),
				isAdmin: false,
				token: ''
			}).then(user => {
				return user.createFeed({
					title: `Sample title by ${user.firstName}`,
					description: 'this is sample description',
					location: Faker.address.country(),
					rate: Faker.commerce.price(),
					category: 'category A',
					isFavourite: false,
					photo: Faker.random.image()
				})
			})
		})
	});

module.exports = User;
