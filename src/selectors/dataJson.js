import { romoveQuotes } from './deleteCommans.js'
import { readRows } from './readRows.js'

export const dataJson = async (dataFile) => {

  //Creamos un array con los datos de lectura, la clave "ID muestra" que almacenara el número de cedula del paciente
  const newDataFile = ["ID muestr", ...dataFile]
  try {
    //Creando una constante que recibira los datos de la ejecución de deleteCommans
    const str = await romoveQuotes(newDataFile)

    //Enviamos el array a la funcion leer filas que divira el array para separarlo de las cabezeras del cvs y los datos de cada paciente
    await readRows(str)
  } catch (error) {
    throw `Problem read file ${error.message}`
  }
}
