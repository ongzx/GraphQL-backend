var db = require('../db');
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;
var User = require('./user');

var Feed = sequelize.define('Feeds', {
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
}, { freezeTableName: true });


// Feed.belongsTo(User);

sequelize.sync({force: true});

module.exports = Feed;
