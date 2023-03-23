export function ErrorManager(status) {
  let message = '';
  switch (status) {
    case 500:
      message = 'Error interno de servidor';
      break;
    case 401:
      message = 'No estas autorizado';
      break;
    case -1:
      message = 'Sin conexion a internet';
  }
  return message;
}
