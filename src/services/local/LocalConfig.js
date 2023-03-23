import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG = true;

export async function ExecuteQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
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
}
