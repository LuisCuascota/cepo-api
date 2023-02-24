import { getConnection } from "./database/database";

const getPersonList = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT a.number, a.dni, p.names, p.surnames FROM Person p LEFT OUTER JOIN Account a ON a.dni = p.dni ORDER BY a.number"
    );

    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getPersonList,
};
