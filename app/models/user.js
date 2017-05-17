import db from '../../config/db';
import Sequelize from 'sequelize';
import Feed from './feed';
import _ from 'lodash';
import Faker from 'faker';
import uuidGenerator from '../../helpers/uuid-generator';

let sequelize = db.sequelize;

const tableName = 'Users';

var User = sequelize.define(tableName, {
	uuid: {
		type: Sequelize.UUID,
		defaultValue: () => {
			return uuidGenerator.generate(tableName)
		},
		primaryKey: true,
	},
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
	facebookId: {
		type: Sequelize.STRING
	},
	token: {
		type: Sequelize.STRING(1200)
	}
}, { 
	freezeTableName: true,
	collate: 'utf8_general_ci',
	instanceMethods: {
		toJSON: () => {
			const privateAttributes = ['password', 'createdAt', 'updatedAt'];
			return _.omit(this.dataValues, privateAttributes);
		}
	}
});

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
				facebookId: '',
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
