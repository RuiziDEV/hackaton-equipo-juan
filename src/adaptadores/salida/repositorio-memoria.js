function clonar(item) {
  return item ? { ...item } : undefined;
}

export function crearRepositorioMemoria() {
  let evaluaciones = [];

  function siguienteId() {
    const mayorId = evaluaciones.reduce(
      (max, e) => (typeof e.id === 'number' && e.id > max ? e.id : max),
      0
    );
    return mayorId + 1;
  }

  return {
    listar() {
      return evaluaciones.map((e) => ({ ...e }));
    },

    obtener(id) {
      const encontrada = evaluaciones.find((e) => e.id === id);
      return clonar(encontrada);
    },

    guardar(evaluacion) {
      const copia = { ...evaluacion };

      if (copia.id === undefined || copia.id === null) {
        copia.id = siguienteId();
        evaluaciones.push({ ...copia });
        return { ...copia };
      }

      const indice = evaluaciones.findIndex((e) => e.id === copia.id);
      if (indice >= 0) {
        evaluaciones[indice] = { ...copia };
      } else {
        evaluaciones.push({ ...copia });
      }

      return { ...copia };
    },

    eliminar(id) {
      const indice = evaluaciones.findIndex((e) => e.id === id);
      if (indice === -1) {
        return false;
      }
      evaluaciones.splice(indice, 1);
      return true;
    },
  };
}