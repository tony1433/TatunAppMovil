import {ExecuteQuery} from './LocalConfig';

//sale_credit
export async function insertSale_credit(sale) {
  let query = await ExecuteQuery(
    'INSERT INTO sale_credit (date, hour, quantity, id_product, id_client, id_user) VALUES( ?, ?, ?, ?, ?, ?)',
    [
      sale.date,
      sale.hour,
      sale.quantity,
      sale.id_product,
      sale.id_client,
      sale.id_user,
    ],
  );

  return query;
}

export async function insertSaleCreditByClient(sale) {
  let sale_credit$ = await ExecuteQuery(
    'SELECT * FROM sale_credit WHERE id = ?',
    [sale.id_app],
  );

  if (sale_credit$.rows.length == 0) {
    let query = await ExecuteQuery(
      'INSERT INTO sale_credit (date, hour, quantity, id_product, id_client, id_user) VALUES( ?, ?, ?, ?, ?, ?)',
      [
        sale.date,
        sale.hour,
        sale.quantity,
        sale.id_product,
        sale.id_client,
        sale.id_user,
      ],
    );

    return query;
  } else {
    let query = await ExecuteQuery(
      'UPDATE sale_credit SET date = ?, hour = ?, quantity = ?, id_product = ?, id_client = ? WHERE id = ?',
      [
        sale.date,
        sale.hour,
        sale.quantity,
        sale.id_product,
        sale.id_client,
        sale.id_app,
      ],
    );

    return query;
  }
}

export async function selectTotalSaleCredit(date) {
  let query = await ExecuteQuery(
    'SELECT SUM(sale_credit.quantity * product.price) AS total FROM sale_credit INNER JOIN product ON product.id == sale_credit.id_product WHERE date=?',
    [date],
  );
  let total = query.rows;

  return total;
}

export async function selectSaleCredit(date) {
  let query = await ExecuteQuery('SELECT * FROM sale_credit  WHERE date=?', [
    date,
  ]);
  let sale_credit = query.rows;

  return sale_credit;
}

export async function selectHistorySaleCredit(id_client) {
  let query = await ExecuteQuery(
    'SELECT sale.date, sale.quantity, product.description FROM sale_credit AS sale INNER JOIN product ON product.id = sale.id_product  WHERE sale.id_client = ?',
    [id_client],
  );
  let sale_credit = query.rows;

  return sale_credit;
}

export async function selectSaleCreditByClient(clientId, dateFirst, dateEnd) {
  let query = await ExecuteQuery(
    'SELECT * FROM sale_credit  WHERE id_client= ? and date BETWEEN ? and ?',
    [clientId, dateFirst, dateEnd],
  );
  let sale_credit = query.rows;

  return sale_credit;
}
