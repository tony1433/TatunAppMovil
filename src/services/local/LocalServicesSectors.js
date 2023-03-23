import {ExecuteQuery} from './LocalConfig';

//sectors
export async function insertSector(sector) {
  let sector$ = await ExecuteQuery('SELECT * FROM sector WHERE id = ?', [
    sector.id,
  ]);

  if (sector$.rows.length == 0) {
    let query = await ExecuteQuery(
      'INSERT INTO sector (id, description, id_user) VALUES( ?, ?, ?)',
      [sector.id, sector.description, sector.id_user],
    );

    return query;
  } else {
    let query = await ExecuteQuery(
      'UPDATE sector SET description = ? WHERE id = ?',
      [sector.description, sector.id],
    );

    return query;
  }
}

export async function selectSectors(id_user) {
  let query = await ExecuteQuery(`SELECT * FROM sector WHERE id_user = ?`, [
    id_user,
  ]);
  let sectors$ = query.rows;

  return sectors$;
}
