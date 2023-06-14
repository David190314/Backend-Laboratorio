export const romoveQuotes = (data) => {
  try {
    //iterando cada uno de los registros para remplazar comillas dobles y espacios
    const str = data.map((element) => {
      const reg = /"([^"]*)"|'([^']*)'/g
      let elementIte = element.replace(reg, '')
      return elementIte.length>1 ? elementIte : 'N/A'
    })
 

    //Antes de retornar el arreglo, cortamos la ultima posicion que es undefined.
    return str.slice(0, str.length-1)
  } catch (error) {
      return `this array present error ${error.message}`
  }
}
