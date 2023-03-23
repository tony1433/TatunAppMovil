import {ExecuteQuery} from './LocalConfig';

export async function insertUser(user) {
  let query = await ExecuteQuery(
    'INSERT INTO user (id, name, username, password, id_type) VALUES( ?, ?, ?, ?, ?)',
    [user.id, user.name, user.username, user.password, user.id_type],
  );

  return query;
}

export async function selectUser() {
  let query = await ExecuteQuery('SELECT * FROM user', []);
  let users$ = query.rows;

  return users$;
}

export async function deleteUser() {
  let query = await ExecuteQuery('DELETE FROM user', []);

  return query;
}
