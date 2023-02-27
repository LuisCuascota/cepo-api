import mysql from "promise-mysql";
import config from "../../config";

const connection = mysql.createConnection({
  database: config.database.name,
  host: config.database.host,
  password: config.database.password,
  user: config.database.user,
});

const getConnection = () => {
  return connection;
};

module.exports = {
  getConnection,
};
