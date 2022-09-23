import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG = true;

//SQlite methods
const ExecuteQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.transaction(trans => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
          resolve(results);
        },
        error => {
          reject(error);
        },
      );
    });
  });

export async function InsertQuery() {
  // single insert query
  let singleInsert = await ExecuteQuery(
    'INSERT INTO cobrador (id_cobrador, nombre, contraseña, estado) VALUES( ?, ?, ?, ?)',
    [1, 'Marco', '12345', 0],
  );
  console.log(singleInsert);
}

export async function SelectQuery() {
  let selectQuery = await ExecuteQuery('SELECT * FROM cobrador', []);
  console.log(selectQuery);
  var rows = selectQuery.rows;
  for (let i = 0; i < rows.length; i++) {
    var item = rows.item(i);
    console.log(item);
  }
}
