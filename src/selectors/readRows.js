import { integrationObject } from './processedData.js'

export const readRows = (data, counter, executionTime) => {
  //Constante que define la longitud de la cabezara del csv
  const maxLentgUser = 66
  let arrayPatient = []

  try {
    //Iteramos cada una de las posiciónes en el array, para eliminar * y espacios
    const header = data.splice(0, maxLentgUser)
    .map((element)=>{
      if(element){
        let elementIte = element.replace('*', '').toUpperCase()
        return elementIte.replace(/ /g, '')
      }
    })

    
    //Creando un array por cada muestra realizada y escrita en el archivo
    for (let i = 0; i < data.length; i++) {
      arrayPatient.push(data.splice(0, header.length))
    }

    //Enviamos el array que contiene los array de cada una de las muestras tomadas, y las cabezeras del csv
    integrationObject(header, arrayPatient, counter, executionTime)
  } catch (error) {
    return `this array present error ${error.message}`
  }
}
