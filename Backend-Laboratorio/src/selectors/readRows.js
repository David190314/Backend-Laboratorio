import fs from 'fs-extra'
import path from 'path'
import { integrationObject } from './processedData.js'
import { generateNumberRandom } from '../utils/random.js'


export const readRows = ( headerArray, data, counter, executionTime) => {
  const number = generateNumberRandom()
  const [,,,,,,,WBC,NEU$,LYM$,MON$,EOS$,BAS$,NEU,LYM,MON,EOS,BAS,RBC,HGB,HCT,MCV,MCH,MCHC,RDWCV,RDWSD,PLT,MOV,PDW,PCT,,,,,,,,,,,,,,,,IDPAC,,,,,,,,,,,,,,,COMENTARIOS,MENSAJEWBC,MENSAJERBC,MENSAJEPLT] = headerArray
  //Constante que define la longitud de la cabezara del csv
  const maxLentgUser = 66
  let arrayPatient = []
  const headerInsert = [WBC,NEU$,LYM$,MON$,EOS$,BAS$,NEU,LYM,MON,EOS,BAS,RBC,HGB,HCT,MCV,MCH,MCHC,RDWCV,RDWSD,PLT,MOV,PDW,PCT,IDPAC,COMENTARIOS,MENSAJEWBC,MENSAJERBC,MENSAJEPLT]
  try {
    //Iteramos cada una de las posiciónes en el array, para eliminar * y espacios
    const header = headerInsert.map((element, i)=>{
      if(element){
        let elementIte = element.replace('*', '').toUpperCase()
        return elementIte.replace(/ /g, '')
      }
    })
    
    //Creando un array por cada muestra realizada y escrita en el archivo
    for (let i = 0; i < data.length; i++) {
      arrayPatient.push(data.splice(0, maxLentgUser))
    }
    //Enviamos el array que contiene los array de cada una de las muestras tomadas, y las cabezeras del csv
    integrationObject(header, arrayPatient, counter, executionTime)

    //Mover el documento
    const src = `../../../../../../Laboratorio_Clinico/Laboratorio/${fs.readdirSync(`../../../../../../Laboratorio_Clinico/Laboratorio/`).filter(element => element.endsWith('csv'))}`
    const fileMove = fs.readdirSync(`../../../../../../Laboratorio_Clinico/Laboratorio/`).filter(element => element.endsWith('csv'))
    const dest = path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/file_process/${number }${fileMove[0]}`)
    fs.moveSync(src,dest, {overwrite: true})

  } catch (error) {
    return `this array present error ${error.message}`
  }
}
