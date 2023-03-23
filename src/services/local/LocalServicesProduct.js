import {ExecuteQuery} from './LocalConfig';

export async function insertProduct(product) {
  let product$ = await ExecuteQuery('SELECT * FROM product WHERE id = ?', [
    product.id,
  ]);

  if (product$.rows.length == 0) {
    let query = await ExecuteQuery(
      'INSERT INTO product (id, description, price) VALUES( ?, ?, ?)',
      [product.id, product.description, product.price],
    );

    return query;
  } else {
    let query = await ExecuteQuery(
      'UPDATE product SET description = ?, price = ? WHERE id = ?',
      [product.description, product.price, product.id],
    );

    return query;
  }
}

export async function selectProducts() {
  let query = await ExecuteQuery('SELECT * FROM product', []);
  let products = query.rows;

  return products;
}
