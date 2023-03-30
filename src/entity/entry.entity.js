import { getConnection } from "./database/database";
import { EntriesCodeEnum } from "../service/shared/entriesCode.enum";

const getEntryOptionList = async () => {
  const connection = await getConnection();

  return connection.query("SELECT * FROM Entry_type;");
};

const getTotalFeeCapitalByAccount = async (account) => {
  const connection = await getConnection();

  return connection.query(
    "SELECT sum(D.value) as total FROM Entry_detail D INNER JOIN Entry E on D.entry_number = E.number WHERE D.type_id= ? and E.account_number= ? ;",
    [EntriesCodeEnum.FeeCapital, account]
  );
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

const saveEntryHeader = async (header) => {
  const connection = await getConnection();

  await connection.query("INSERT INTO Entry SET ?", header);
};

const saveEntryDetail = async (detail) => {
  const connection = await getConnection();

  detail.map(async (entryDetail) => {
    await connection.query("INSERT INTO Entry_detail SET ?", entryDetail);
  });
};

export const methods = {
  getEntryCount,
  getEntryOptionList,
  getTotalFeeCapitalByAccount,
  saveEntryDetail,
  saveEntryHeader,
};
