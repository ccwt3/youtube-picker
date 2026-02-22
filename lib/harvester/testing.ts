import { genaiWorker } from "./genaiWorker";

async function asd() {
  const combination = {
    topic: "hitler",
  };

  const prompt = `
  Actúa como un experto en operadores de búsqueda avanzada de YouTube (YouTube Data API v3).
  
  Tengo los siguientes datos de entrada:
  - Categoría principal: "${combination.topic}"

  TU TAREA:
  Genera un objeto JSON con los parámetros óptimos para la API 'search.list'.
  
  REGLAS PARA EL PARAMETRO 'q':
  1. Usa el operador '|' para conceptos alternativos (ej: hombre|mujer).
  2. Usa comillas "" para frases que deben ir juntas.
  3. Usa el operador '-' (menos) para EXCLUIR ruido basado en la intención (ej: si es educativo, quizás quieras excluir '-vlog -reaccion -challenge').
  4. Combina todo en un solo string de búsqueda potente.

  REGLAS PARA OTROS PARAMETROS:
  - 'videoDuration':'medium' o 'long' dependiendo tu consideracion del tema a tratar (podcast seria long, y videjouegos entre medium y long, si son gameplays).
  - 'relevanceLanguage': 'en'.
  - 'type': 'video'.

  CONSIDERACIONES:
  - IMPORTANTE!: Enfocate en la variabilidad y dinamismo (los videos buscan entrenener al comer o ser de fondo al momento de realizar actividades) relativos de acuerdo a la categoria.
  - Como referencia de tipos de videos toma el formato 'vlog'/'lifestyle' similar al del creador de contenido 'sam sulek', 'documental animado' similar al creador de contenido 'fern', podcasts interesantes como los del creador de contenido 'Andrew Hubberman', videos con dinamismo y no serios al 100% .
  
  Salida esperada (solo JSON):
  {
    "q": "string",
    "videoDuration": "string",
    "type": "string"
  }
`;

  const respuesta = await genaiWorker(prompt);
  console.log(typeof respuesta, respuesta, respuesta.q);
  return;
}

asd();
