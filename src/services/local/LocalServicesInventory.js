import {ExecuteQuery} from './LocalConfig';

//inventory
export async function insertInventory(inventory) {
  let inventory$ = await ExecuteQuery(`SELECT * FROM inventory WHERE id = ?`, [
    inventory.id,
  ]);

  if (inventory$.rows.length == 0) {
    let query = await ExecuteQuery(
      'INSERT INTO inventory (id, date, quantity_input, quantity_output, id_product, id_user) VALUES( ?, ?, ?, ?, ?, ?)',
      [
        inventory.id,
        inventory.date,
        inventory.quantity_input,
        inventory.quantity_output,
        inventory.id_product,
        inventory.id_user,
      ],
    );

    return query;
  } else {
    let query = await ExecuteQuery(
      'UPDATE inventory SET quantity_input = ? WHERE id = ?',
      [inventory.quantity_input, inventory.id],
    );

    return query;
  }
}

export async function selectInventory(date) {
  let query = await ExecuteQuery(
    `SELECT (inventory.quantity_input - inventory.quantity_output ) AS quantity, product.description  FROM inventory INNER JOIN product ON product.id == inventory.id_product WHERE inventory.date = ?`,
    [date],
  );
  let inventory = query.rows;

  return inventory;
}

export async function selectAllInventory(date) {
  let query = await ExecuteQuery(`SELECT * FROM inventory WHERE date = ?`, [
    date,
  ]);
  let inventory = query.rows;

  return inventory;
}

export async function updateOutputInventory(quantity, date, id_product) {
  let query = await ExecuteQuery(
    'UPDATE inventory SET quantity_output = quantity_output + ? WHERE date = ? AND id_product = ?',
    [quantity, date, id_product],
  );

  return query;
}

export async function deleteInventory() {
  let query = await ExecuteQuery(`DELETE FROM inventory`, []);
}
