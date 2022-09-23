//Importando modulos de de fs y path para leer directorios y archivos del sistema operativo
import fs from 'fs'
import path from 'path'

//Llamado a la funcion que realizara llamados a otras funciones para la creación del json
import { dataJson } from '../selectors/dataJson.js'

//Funcion que lee el archivo y crea log con la descripcción de la dia fecha y hora de la lectura del documento .cvs
const readDate = async () => {
  //Varible de lectura de fecha y hora del sistema operativo de forma asincrona
  const executionTime = await new Date()

  //Creando el archivo con el nombre {DiaMesDianumeroAño.log}
  const pathLog = await path.resolve(`../../../../../../temp/data/logs/${executionTime.toDateString()}.log`)

  //Variable que retorna los archivos que se encuentran dentro del directorio
  const pathData = fs.readdirSync('../../../../../../temp/data', 'utf-8')

  try {
    //Lectura del primer archivo que se encuentra en el directorio
    const file = fs.readFileSync(`../../../../../../temp/Data/${pathData[0]}`, 'utf-8')

    //Separar por coma cada una de las posiciones leidas
    let dataFile = file.split(',')

    //Enviar los datos a la función que procesara los datos para convertirlos en formato Json
    dataJson(dataFile.slice(1, dataFile.length))

    // Escriber en archivo generado en la linea 14 si se pudo leer el archivo
    fs.appendFileSync(
      pathLog,
      `\n messages: The document read succesfully, ${executionTime.toLocaleString()}`,
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
