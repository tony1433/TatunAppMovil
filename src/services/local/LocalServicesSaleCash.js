import {ExecuteQuery} from './LocalConfig';

//sale_cash
export async function insertSale_cash(sale) {
  let query = await ExecuteQuery(
    'INSERT INTO sale_cash (date, hour, quantity, id_product, id_user) VALUES( ?, ?, ?, ?, ?)',
    [sale.date, sale.hour, sale.quantity, sale.id_product, sale.id_user],
  );

  return query;
}

export async function selectTotalSaleCash(date) {
  let query = await ExecuteQuery(
    'SELECT SUM(sale_cash.quantity * product.price) AS total FROM sale_cash INNER JOIN product ON product.id == sale_cash.id_product WHERE date=?',
    [date],
  );
  let total = query.rows;

  return total;
}

export async function selectSaleCash(date) {
  let query = await ExecuteQuery('SELECT * FROM sale_cash WHERE date=?', [
    date,
  ]);
  let sale_cash = query.rows;

  return sale_cash;
}
