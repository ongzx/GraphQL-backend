import db from '../config/db';
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var User = require('./models/user');
var Feed = require('./models/feed');

module.exports = function(app, apiRoutes, jwt) {

	apiRoutes.post('/register', function(req, res) {

		User
		.findOrCreate({
			where: {
				username: req.body.username
			},
			defaults: {
				email: req.body.email,
				password: req.body.password,
				isAdmin: req.body.isAdmin,
				token: ''
			}
		})
		.spread(function(user, created) {
			if (created) {
				res.json({
					success: true, 
					user: user.get({plain: true}),
					message: 'User created.'
				});
			} else {
				res.json({
					success: false,
					message: 'User exist!'
				})
			}
		});

	});

	apiRoutes.post('/authenticate', function(req, res) {

		User
		.find({
			where:{
				username: req.body.username
			}
		})
		.then(function(user) {
			if (!user) {
				res.json({
					success: false, 
					message: 'Authentication failed. User not found.'
				});
			} else if (user) {
				if (user.password != req.body.password) {
					res.json({
						success: false, 
						message: 'Authentication failed. Wrong password.'
					});
				} else {					
					var token = jwt.sign({user: user}, app.get('superSecret'), {
						expiresIn : 60*60*24
					});

					user
					.update({
						token: token
					})
					.then(function() {
						res.json({
							success: true,
							message: 'Authentication successful',
							user: user,
							token: token
						})
					});
					
				}
			}
		});
	});

	apiRoutes.use(function(req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					console.log(err);
					return res.json({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided'
			});
		}
	});

	apiRoutes.get('/', function(req,res) {
		res.json({message:'Welcome to the coolest API on earth!'});
	});

	apiRoutes.get('/users', function(req, res) {
		User.findAll().then(function(data){
			res.json({users:data});
		});
	});

}