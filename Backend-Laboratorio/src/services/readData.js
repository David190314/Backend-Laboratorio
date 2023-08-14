//Importando modulos de de fs y path para leer directorios y archivos del sistema operativo
import fs from 'fs-extra'
import path from 'path'
//import { uploadChemistry } from './readChemistry.js'
import { deleteJumps } from '../selectors/deleteJumps.js'

//Llamado a la funcion que realizara llamados a otras funciones para la creación del json
import { dataJson } from '../selectors/dataJson.js'

//Funcion que lee el archivo y crea log con la descripcción de la dia fecha y hora de la lectura del documento
const readDate = async (type, document, fileUpload) => {
  const file = fs.readFileSync(`../../../../../../Laboratorio_Clinico/Laboratorio/file_process/${fileUpload}`, 'utf-8')
  let executionTime = await new Date()
  //Varible de lectura de fecha y hora del sistema operativo de forma asincrona

  //Creando el archivo con el nombre {DiaMesDianumeroAño.log}
  let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs/${executionTime.toDateString()}.log`)
  try {
    //validar el tipo de archivo en lectura
    if(type === '.csv'){
      //Separar por coma cada una de las posiciones leidas
      let dataFile = file.split(',')
      //Enviar los datos a la función que procesara los datos para convertirlos en formato Json
      dataJson(dataFile.slice(1, 66), dataFile.slice(66, dataFile.length), executionTime, document)
    }else{
      await deleteJumps(file, executionTime, document)
    }
    // Escribe en archivo generado en la linea 14 si se pudo leer el archivo
    fs.appendFileSync(
      pathLog,
      `\n messages: The document read succesfully, nameDocument: ${document} ExecuteDate: ${executionTime.toLocaleString()}`,
      'utf-8',
    )
  } catch (error) {
    fs.appendFileSync(
      pathLog,
      `\n messages: The document could not read, Path: ${
        error.path
      }, ExecuteDate: ${executionTime.toLocaleString()}`,
      'utf-8',
    )
  }
}
export { readDate }