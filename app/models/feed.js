import db from '../../config/db';
import Sequelize from 'sequelize';
import uuidGenerator from '../../helpers/uuid-generator';
var sequelize = db.sequelize;
var User = require('./user');
import _ from 'lodash';

const tableName = 'Feeds';

var Feed = sequelize.define(tableName, {
	uuid: {
		type: Sequelize.UUID,
		defaultValue: () => {
			return uuidGenerator.generate(tableName)
		},
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING
	}, 
	description: {
		type: Sequelize.STRING
	},
	location: {
		type: Sequelize.STRING
	},
	rate: {
		type: Sequelize.STRING
	},
	category: {
		type: Sequelize.STRING(1200)
	},
    isFavourite: {
        type: Sequelize.BOOLEAN
    },
    photo: {
        type: Sequelize.STRING
    }
}, { 
	freezeTableName: true,
	collate: 'utf8_general_ci',
	instanceMethods: {
		toJSON: () => {
			const privateAttributes = ['createdAt', 'updatedAt'];
			return _.omit(this.dataValues, privateAttributes);
		}
	} 
});


// Feed.belongsTo(User);

sequelize.sync({force: true});

module.exports = Feed;
