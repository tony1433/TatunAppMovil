import {ExecuteQuery} from './LocalConfig';

//spent
export async function insertSpent(spent) {
  let query = await ExecuteQuery(
    'INSERT INTO spent (date, description, total, id_user) VALUES( ?, ?, ?, ?)',
    [spent.date, spent.description, spent.total, spent.id_user],
  );

  return query;
}

export async function selectTotalSpent(date) {
  let query = await ExecuteQuery(
    'SELECT SUM(total) AS total FROM spent WHERE date=?',
    [date],
  );
  let total = query.rows;

  return total;
}

export async function selectSpent(date) {
  let query = await ExecuteQuery('SELECT * FROM spent WHERE date=?', [date]);
  let spent = query.rows;

  return spent;
}
