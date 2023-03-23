import {ExecuteQuery} from './LocalConfig';

//clients
export async function insertClient(client) {
  let client$ = await ExecuteQuery('SELECT * FROM client WHERE id = ?', [
    client.id,
  ]);

  if (client$.rows.length == 0) {
    let query = await ExecuteQuery(
      'INSERT INTO client (id, day_payment, name_complete, address, phone, balance, status, position, id_sector, id_user) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        client.id,
        client.day_payment,
        client.name_complete,
        client.address,
        client.phone,
        client.balance,
        client.status,
        client.position,
        client.id_sector,
        client.id_user,
      ],
    );

    return query;
  } else {
    let query = await ExecuteQuery(
      'UPDATE client SET day_payment = ?, name_complete = ?, address = ?, phone = ?, status = ?, id_sector = ? WHERE id = ?',
      [
        client.day_payment,
        client.name_complete,
        client.address,
        client.phone,
        client.status,
        client.id_sector,
        client.id,
      ],
    );

    return query;
  }
}

export async function selectClients(sectorId) {
  let query = await ExecuteQuery(
    'SELECT * FROM client WHERE id_sector = ? AND status != 3',
    [sectorId],
  );
  let clients$ = query.rows;

  return clients$;
}

export async function selectAllClients() {
  let query = await ExecuteQuery('SELECT * FROM client WHERE status = 2', []);
  let clients$ = query.rows;

  return clients$;
}

export async function selectTotalClients() {
  let query = await ExecuteQuery('SELECT * FROM client WHERE status != 3', []);
  let clients$ = query.rows;

  return clients$;
}

export async function selectBalanceClient(id) {
  let query = await ExecuteQuery('SELECT * FROM client WHERE id = ?', [id]);
  let clients$ = query.rows;

  return clients$;
}

export async function updateBalanceClient(id, balance) {
  let query = await ExecuteQuery(
    'UPDATE client SET balance = ?, status = 2 WHERE id = ?',
    [balance, id],
  );

  return query;
}

export async function updateStatusClient(id) {
  let query = await ExecuteQuery('UPDATE client SET status = 1 WHERE id = ?', [
    id,
  ]);

  return query;
}

export async function updateNewStatusClient(id) {
  let query = await ExecuteQuery('UPDATE client SET status = 0 WHERE id = ?', [
    id,
  ]);

  return query;
}

export async function updateClient(id, edit_data) {
  let query = await ExecuteQuery(
    'UPDATE client SET day_payment = ?,  phone = ?, position = ? WHERE id = ?',
    [edit_data.day_payment, edit_data.phone, edit_data.position, id],
  );

  return query;
}

export async function updatePositionClient(id, position) {
  let query = await ExecuteQuery(
    'UPDATE client SET position = ? WHERE id = ?',
    [position, id],
  );

  return query;
}
