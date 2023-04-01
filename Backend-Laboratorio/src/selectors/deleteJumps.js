import { pool, sql } from "../Setencias/initConnection.js"
import { fullDate } from "../utils/formatDate.js"
export const deleteJumps =  async ( file, pathDoc, searchTypeDoc, number, executionTime)=>{
    const homeChane = file[0]
    const data = file.replace(/\r\n/g,'|')
    let array = []
    let counter = 0
    for(let i=0; i<data.length; i++){
        if(data[i] === '|'){
            let labo = data.slice(counter+1,i).replace(/[N]|\s+/g,'').split(';')
            array.push(labo.slice(0,3).concat(labo.slice(10,labo.length)).join(',').replace(/([mg/dl])\w+/g,'').split(','))
            counter = i
        }
    }
    array[0][0] = homeChane.concat(array[0][0])
    const newArray =array.map((e)=>{
        let iterado = e.filter((i) => i != '' && i)
        return iterado
    })
    class Person {
        constructor({ OBJ, mgDl }){
            this.OBJ=[
                mgDl
            ]

        }
    }

    const resultObjLab = newArray.map((element, i)=>{
        const [ LAB, ID ] = element
        element.splice(0,2)
        const person = new Person({
            mgDl: {
                LAB,
                ID,
                ...element
            }
        })
        return person
    })

    let resultPatiente = []
    for(let i=0; i<resultObjLab.length; i++){
        let claves = Object.keys(resultObjLab[i].OBJ[0])
        let values = Object.values(resultObjLab[i].OBJ[0])
        let idPatiente = values[values.length-1]
        let TypeLabo = values[values.length-2]

        for(let f=claves.length-3; f>=0; f--){
            let labo = resultObjLab[i].OBJ[0][f]
            let valueLabo = resultObjLab[i].OBJ[0][f+1]
            let objLabo = {
                type: TypeLabo,
                id: idPatiente,
                labo,
                valueLabo,
                flag: (f+1)%2 !=0  ? true : false
            }

            if(objLabo.flag){
                
                const data = await sql.connectionDatabase(pool, `insert into dbo.RESULT_INTERFA(TOPO_LABO, DOCUMENTO, MATCH, RESULTADO, FECHA, ESTADO) values('${objLabo.type}','${objLabo.id}' , '${objLabo.labo}', '${objLabo.valueLabo}','${fullDate}',0)`)
                console.log(data)
            }
        }
        
    }

}
