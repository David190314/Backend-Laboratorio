import { Patient } from "./patient.lab.services.js";
import { fullDate } from "../utils/formatDate.js";
import fs from 'fs';
import path from "path";

const uploadChemistry = async (file, executionTime, fileUpload) =>{
    class Person {
        constructor({ OBJ, mgDl }){
            this.OBJ=[
                mgDl
            ]
        }
    }
    file.map(async(element)=>{
        try{

            const [ LAB, ID ] = element
            const searchUserdId = await Patient.getPatientById(element[1], executionTime)
            if(searchUserdId!= undefined && searchUserdId[0].NU_DOCU_PAC === element[1]){
                element.splice(0,2)
                const person = new Person({
                    mgDl: {
                    LAB,
                    ID,
                    ...element
                }
                })
                let claves = (Object.keys(person.OBJ[0]))
                let values = (Object.values(person.OBJ[0]))
                let idPatiente = values[values.length-1]
                let TypeLabo = values[values.length-2]
                for(let f=claves.length-3; f>=0; f--){
                    let labo = person.OBJ[0][f]
                    let valueLabo = person.OBJ[0][f+1]
                    let objLabo = {
                                type: TypeLabo,
                                id: idPatiente,
                                labo,
                                valueLabo,
                                flag: (f+1)%2 !=0  ? true : false
                            }
                    if(objLabo.flag){
                        const data = `insert into dbo.RESULT_INTERFA(TIPO_LABO, DOCUMENTO, MATCH, RESULTADO, FECHA, ESTADO) values('${objLabo.type}','${objLabo.id}' , '${objLabo.labo}', '${objLabo.valueLabo}','${fullDate}',0)`
                        await Patient.insterChemistry(data, executionTime)
                    }
                }
            }else{
                const query = `insert into DBO.LOGREAD (NU_HIST_PAC, DOCUMENTREAD) VALUES(${element[1]},'${fileUpload}' )`
                await Patient.insertLogUplod(query, executionTime)
            }
        }catch(error){
            const pathLogConnect  = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/${executionTime.toDateString()}.log`)
            fs.appendFileSync(
                pathLogConnect,
                `\n messages:${error}, Cannot connect to database server`,
                'utf-8',
            )
        }
    })
}
export { uploadChemistry }
