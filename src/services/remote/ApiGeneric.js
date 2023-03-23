import {Api, cancelToken} from './ApiConfig';

export function apiGet(enpoint) {
  const source = cancelToken;
  return {
    call: Api.get(enpoint, {cancelToken: source.token}),
    source,
  };
}

export function apiPost(enpoint, body = '') {
  const source = cancelToken;
  return {
    call: Api.post(enpoint, body, {cancelToken: source.token}),
    source,
  };
}

export function apiPut(enpoint, body = '') {
  const source = cancelToken;
  return {
    call: Api.put(enpoint, body, {cancelToken: source.token}),
    source,
  };
}
