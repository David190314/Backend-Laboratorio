import { romoveQuotes } from './deleteCommans.js'
import { readRows } from './readRows.js'

export const dataJson = async ( dataFileHeader, dataFile, counter, executionTime ) => {
  //Creamos un array con los datos de lectura, la clave "ID muestra" que almacenara el número de cedula del paciente
  const newDataFileHeader =  ["ID muestr", ...dataFileHeader]
  const newDataFile = [...dataFile]
  try {
    //Creando una constante que recibira los datos de la ejecución de deleteCommans
    const strDataHeader = await romoveQuotes(newDataFileHeader)
    const strDataFile = await romoveQuotes(newDataFile)

    //Enviamos el array a la funcion leer filas que divira el array para separarlo de las cabezeras del cvs y los datos de cada paciente
    await readRows( strDataHeader, strDataFile, counter, executionTime )
  } catch (error) {
    throw `Problem read file ${error.message}`
  }
}
