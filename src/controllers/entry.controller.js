import { getConnection } from "./../database/database";

const getEntryOptionList = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM Entry_type");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getEntryCount = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT count(e.number)-1 as count FROM Entry e"
    );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const postNewEntry = async (req, res) => {
  try {
    const connection = await getConnection();
    await connection.query("INSERT INTO Entry SET ?", req.body);
    res.json({ message: "OK" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const postNewEntryDetails = async (req, res) => {
  try {
    const connection = await getConnection();
    req.body.map(async (entryDetail) => {
      await connection.query("INSERT INTO Entry_detail SET ?", entryDetail);
    });
    res.json({ message: "OK" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getEntryOptionList,
  getEntryCount,
  postNewEntry,
  postNewEntryDetails,
};
