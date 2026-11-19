import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function clonar(item) {
  return item ? { ...item } : undefined;
}

export function crearRepositorioArchivo(rutaArchivo = 'datos/evaluaciones.json') {
  const ruta = resolve(rutaArchivo);

  function leerLista() {
    if (!existsSync(ruta)) {
      return [];
    }
    const contenido = readFileSync(ruta, 'utf8').trim();
    if (!contenido) {
      return [];
    }
    const datos = JSON.parse(contenido);
    return Array.isArray(datos) ? datos : [];
  }

  function escribirLista(lista) {
    mkdirSync(dirname(ruta), { recursive: true });
    writeFileSync(ruta, JSON.stringify(lista, null, 2), 'utf8');
  }

  function siguienteId(lista) {
    const mayorId = lista.reduce((max, e) => (typeof e.id === 'number' && e.id > max ? e.id : max), 0);
    return mayorId + 1;
  }

  return {
    listar() {
      return leerLista().map((e) => ({ ...e }));
    },

    obtener(id) {
      const lista = leerLista();
      const encontrada = lista.find((e) => e.id === id);
      return clonar(encontrada);
    },

    guardar(evaluacion) {
      const lista = leerLista();
      const copia = { ...evaluacion };

      if (copia.id === undefined || copia.id === null) {
        copia.id = siguienteId(lista);
        lista.push({ ...copia });
      } else {
        const indice = lista.findIndex((e) => e.id === copia.id);
        if (indice >= 0) {
          lista[indice] = { ...copia };
        } else {
          lista.push({ ...copia });
        }
      }

      escribirLista(lista);
      return { ...copia };
    },

    eliminar(id) {
      const lista = leerLista();
      const indice = lista.findIndex((e) => e.id === id);
      if (indice === -1) {
        return false;
      }
      lista.splice(indice, 1);
      escribirLista(lista);
      return true;
    },
  };
}