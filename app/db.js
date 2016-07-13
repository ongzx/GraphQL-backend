var Sequelize = require("sequelize");
var sequelize = new Sequelize('sansa','root', '',{
	host: 'localhost',
	port: 3306,
	dialect: 'mariadb'
});

var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;