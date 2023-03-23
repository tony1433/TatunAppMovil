import {ExecuteQuery} from './LocalConfig';

//payment
export async function insertPayment(payment) {
  let query = await ExecuteQuery(
    'INSERT INTO payment (date, hour, total, id_client, id_user) VALUES( ?, ?, ?, ?, ?)',
    [
      payment.date,
      payment.hour,
      payment.total,
      payment.id_client,
      payment.id_user,
    ],
  );

  return query;
}

export async function insertPaymentByClient(payment) {
  let sale_credit$ = await ExecuteQuery('SELECT * FROM payment WHERE id = ?', [
    payment.id_app,
  ]);

  if (sale_credit$.rows.length == 0) {
    let query = await ExecuteQuery(
      'INSERT INTO payment (date, hour, total, id_client, id_user) VALUES( ?, ?, ?, ?, ?)',
      [
        payment.date,
        payment.hour,
        payment.total,
        payment.id_client,
        payment.id_user,
      ],
    );

    return query;
  } else {
    let query = await ExecuteQuery(
      'UPDATE payment SET date = ?, hour = ?, total = ? WHERE id = ?',
      [payment.date, payment.hour, payment.total, payment.id_app],
    );

    return query;
  }
}

export async function selectTotalPayments(date) {
  let query = await ExecuteQuery(
    'SELECT SUM(total) AS total FROM payment WHERE date=?',
    [date],
  );
  let total = query.rows;

  return total;
}

export async function selectPayments(date) {
  let query = await ExecuteQuery('SELECT * FROM payment WHERE date=?', [date]);
  let payments = query.rows;

  return payments;
}

export async function selectHistoryPayments(id_client) {
  let query = await ExecuteQuery('SELECT * FROM payment WHERE id_client = ?', [
    id_client,
  ]);
  let payments = query.rows;

  return payments;
}

export async function selectPaymentByClient(clientId, dateFirst, dateEnd) {
  let query = await ExecuteQuery(
    'SELECT * FROM payment WHERE id_client= ? and date BETWEEN ? and ?',
    [clientId, dateFirst, dateEnd],
  );
  let payments = query.rows;

  return payments;
}
