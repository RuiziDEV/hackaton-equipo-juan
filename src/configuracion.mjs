import { crearCasosDeUso } from './aplicacion/casos-de-uso.js';
import { crearRepositorioMemoria } from './adaptadores/salida/repositorio-memoria.js';
import { crearRepositorioArchivo } from './adaptadores/salida/repositorio-archivo.js';
import { crearApi } from './adaptadores/entrada/http.js';

export function componer(entorno = process.env) {
  const almacenRaw = entorno?.ALMACEN;
  const almacen = almacenRaw === undefined || almacenRaw === '' ? 'memoria' : almacenRaw;

  let repositorio;
  if (almacen === 'memoria') {
    repositorio = crearRepositorioMemoria();
  } else if (almacen === 'archivo') {
    const rutaDatos = entorno?.DATOS || 'datos/evaluaciones.json';
    repositorio = crearRepositorioArchivo(rutaDatos);
  } else {
    throw new Error(`Valor no válido para ALMACEN: "${almacen}". Debe ser "memoria" o "archivo".`);
  }

  const puertoRaw = entorno?.PORT;
  const puerto = puertoRaw !== undefined && puertoRaw !== '' ? Number(puertoRaw) : 3000;

  const casos = crearCasosDeUso({ repositorio });
  const servidor = crearApi(casos);

  return { servidor, puerto, almacen };
}