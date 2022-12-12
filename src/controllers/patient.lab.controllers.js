import fs from 'fs-extra'
import path from 'path'
import { Patient } from '../services/patient.lab.services.js'

export const operationDataBase = async ( lab, executionTime) =>{
    let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/${executionTime.toDateString()}.log`)
    const date = new Date()
    const min = 5.00
    const max = 10.00
    const lenObj = lab.OBJ.length
    const objDate = {
        'year': date.getFullYear(),
        'month': date.getMonth()+1,
        'day':  date.getDate(),
        'hour': date.getHours(),
        'minutes': date.getMinutes()
    }
    const fullDate = objDate.year+'-'+objDate.month+'-'+objDate.day+' '+objDate.hour+':'+objDate.minutes
    try {
        const query = `insert into LABO_ADMINEXAMEN (NU_NUME_HPRO_LADEX,TX_CONSE_LADEX,FE_FECHA_LADEX,NU_NUME_LABO_LADEX,TX_ESTA_LADEX,NU_INDVID_LADEX,NU_HIST_PAC_LADEX,CD_CODI_SER_LADEX,NU_ORIORD_LADEX) values (11,'Pruebas2024','${fullDate}',${lab.NU_NUME_LABO_FACT},'Validado',1,'${lab.IDmuest}',201, 1)`
        //await Patient.insertLaboExamen( query, executionTime )
        for(let i = 0; i <= lab.OBJ.length-1; i++){
            //const queryLaboResu = `insert into LABO_DATOS_RESU (NU_NUME_RESU_LADR, NU_AUTO_LADEX_LADR, NU_AUTO_LAAN_LADR, TX_VALO_LADR, TX_INRE_LADR, TX_SURE_LADR) values (0,${lab.NU_AUTO_LADEX}, ${lab.OBJ[i].COD}, ${parseFloat(lab.OBJ[i].HOMO)}, ${min}, ${max})`
            //await Patient.insertLaboDatosResu( queryLaboResu,  executionTime )
        }
        const src = `../../../../../../Laboratorio_Clinico/Laboratorio/${fs.readdirSync(`../../../../../../Laboratorio_Clinico/Laboratorio/`).filter(element => element.endsWith('csv'))}`
        const file = fs.readdirSync(`../../../../../../Laboratorio_Clinico/Laboratorio/`).filter(element => element.endsWith('csv'))
        const dest = path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/file_process/${objDate.year+'-'+objDate.month+'-'+objDate.day+' '+objDate.hour+''+objDate.minutes+' '}${file[0]}`)
        fs.moveSync(src,dest, {overwrite: true})
   } catch (error) {
    fs.appendFileSync(
        pathLog,
        `\n messages: OperationDataBase + ${error} `,
        'utf-8',
        )
   }
}

