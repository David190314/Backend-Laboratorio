export  const generateNumberRandom = (min=1, max=200) =>{
    let number = Math.round(Math.random() * ( max - min ) + min )
    return number 
}