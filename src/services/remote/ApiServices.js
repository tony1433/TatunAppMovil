import {apiGet, apiPost, apiPut} from './ApiGeneric';

//user
export function getAuth(username, password) {
  const enpoint = '/login';
  const body = {username, password};
  return apiPost(enpoint, body);
}

export function getUserById(id) {
  const enpoint = '/user';
  const body = {id};
  return apiPost(enpoint, body);
}

//products
export function getProducts() {
  const enpoint = '/products';
  return apiGet(enpoint);
}

//sectors
export function getSectors(id_user) {
  const enpoint = `/sectors/${id_user}`;
  return apiGet(enpoint);
}

//clients
export function getClients(id_user) {
  const enpoint = '/clients/user';
  const body = {id_user};
  return apiPost(enpoint, body);
}

export function getClient(id) {
  const enpoint = `/client/${id}`;
  return apiGet(enpoint);
}

export function updateClient(client) {
  const enpoint = '/edit/client/app';
  const body = {client};
  return apiPut(enpoint, body);
}

export function updateBalanceClientService(id, balance) {
  const enpoint = '/edit/client/balance';
  const body = {id, balance};
  return apiPut(enpoint, body);
}

export function getPaymentsByClient(id_client, date_start, date_end) {
  const enpoint = '/payments/client';
  const body = {id_client, date_start, date_end};
  return apiPost(enpoint, body);
}

export function getSaleCreditByClient(id_client, date_start, date_end) {
  const enpoint = '/sale_credits/client';
  const body = {id_client, date_start, date_end};
  return apiPost(enpoint, body);
}

//inventory
export function getInventory(date, id_user) {
  const enpoint = '/inventory/date';
  const body = {date, id_user};
  return apiPost(enpoint, body);
}

export function updateInventory(inventory) {
  const enpoint = '/edit/inventory/app';
  const body = {inventory};
  return apiPut(enpoint, body);
}

//payment
export function insertPayment(payment) {
  const enpoint = '/add/payment';
  const body = {payment};
  return apiPost(enpoint, body);
}

//sale_cash
export function insertSaleCash(sale) {
  const enpoint = '/add/sale_cash';
  const body = {sale};
  return apiPost(enpoint, body);
}

//sale_credit
export function insertSaleCredit(sale) {
  const enpoint = '/add/sale_credit';
  const body = {sale};
  return apiPost(enpoint, body);
}

//spent
export function insertSpent(spent) {
  const enpoint = '/add/spent';
  const body = {spent};
  return apiPost(enpoint, body);
}
