export  const generateNumberRandom = (min=300, max=500) =>{
    let number = Math.round(Math.random() * ( max - min ) + min )
    return number 
}