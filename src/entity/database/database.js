import mysql from "promise-mysql";
import config from "../../config";

const connection = mysql.createConnection({
  database: config.database,
  host: config.host,
  password: config.password,
  user: config.user,
});

const getConnection = () => {
  return connection;
};

module.exports = {
  getConnection,
};
