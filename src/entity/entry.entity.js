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

const getEntryListPaginated = async (req) => {
  const connection = await getConnection();
  const limit = req.query.limit;
  const offset = req.query.offset;
  const account = req.query.account;
  const number = req.query.number;

  let query =
    "SELECT E.number, P.names, P.surnames, E.date, E.amount, E.is_transfer, E.place, E.account_number FROM Entry E INNER JOIN Account A on E.account_number = A.number INNER JOIN Person P on A.dni = P.dni";
  let params = [];

  if (account || number) {
    query += " WHERE ";
    if (account) {
      query += "E.account_number = ? ";
      params.push(+account);
    }
    if (number) {
      query += "E.number = ? ";
      params.push(+number);
    }
  }
  query += " ORDER BY E.number DESC LIMIT ? OFFSET ?";
  params.push(+limit);
  params.push(+offset);

  return connection.query(query, params);
};

const getEntryDetailByNumber = async (req) => {
  const connection = await getConnection();
  const { number } = req.params;

  return connection.query(
    "SELECT  T.description, D.value FROM Entry_type T LEFT JOIN Entry_detail D on D.type_id = T.id AND D.entry_number=?;",
    [number]
  );
};

export const methods = {
  getEntryCount,
  getEntryDetailByNumber,
  getEntryListPaginated,
  getEntryOptionList,
  getTotalFeeCapitalByAccount,
  saveEntryDetail,
  saveEntryHeader,
};
