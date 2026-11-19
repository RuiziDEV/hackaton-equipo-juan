import {
  CODIGOS,
  ErrorDeDominio,
  crear as crearEvaluacion,
  calificar as calificarEvaluacion,
  resumen as calcularResumen,
} from '../dominio/evaluacion.js';

export function crearCasosDeUso({ repositorio }) {
  function buscar(id) {
    const encontrada = repositorio.obtener(id);
    if (!encontrada) {
      throw new ErrorDeDominio(CODIGOS.NO_EXISTE, `No existe una evaluación con id ${id}.`);
    }
    return encontrada;
  }

  return {
    listar() {
      return repositorio.listar();
    },

    ver(id) {
      return buscar(id);
    },

    crear(datos) {
      const existentes = repositorio.listar();
      const nueva = crearEvaluacion(datos, existentes);
      return repositorio.guardar(nueva);
    },

    calificar(id, nota) {
      const actual = buscar(id);
      const actualizada = calificarEvaluacion(actual, nota);
      return repositorio.guardar(actualizada);
    },

    eliminar(id) {
      buscar(id);
      return repositorio.eliminar(id);
    },

    resumen() {
      return calcularResumen(repositorio.listar());
    },
  };
}