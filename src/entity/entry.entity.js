import { getConnection } from "./database/database";
import { EntriesCodeEnum } from "../service/shared/entriesCode.enum";

const getEntryOptionList = async (req, res) => {
  try {
    const connection = await getConnection();

    return await connection.query("SELECT * FROM Entry_type;");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getTotalFeeCapitalByAccount = async (req, res) => {
  try {
    const { account } = req.params;
    const connection = await getConnection();

    return await connection.query(
      "SELECT sum(D.value) as total FROM Entry_detail D INNER JOIN Entry E on D.entry_number = E.number WHERE D.type_id= ? and E.account_number= ? ;",
      [EntriesCodeEnum.FeeCapital, account]
    );
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getEntryCount = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT count(e.number)-1 as count FROM Entry e;"
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

    await connection.query("INSERT INTO Entry SET ?", req.body.header);

    req.body.detail.map(async (entryDetail) => {
      await connection.query("INSERT INTO Entry_detail SET ?", entryDetail);
    });

    res.json({ message: "OK" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getEntryCount,
  getEntryOptionList,
  getTotalFeeCapitalByAccount,
  postNewEntry,
};
