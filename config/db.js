import Sequelize from 'sequelize';
import env from './env';

const sequelize = new Sequelize(env.DB_NAME_MARIADB, env.DB_ROOT_USERNAME, env.DB_ROOT_PASSWORD, {
	host: env.DB_HOST_MARIADB,
	port: env.DB_PORT_MARIADB,
	dialect: env.DB_DIALECT_MARIADB
});

export default { sequelize };