import path from 'path'
import fs from 'fs'
import { Patient } from '../services/patient.lab.services.js'
import { generateNumberRandom } from '../utils/random.js'

export const operationDataBase = async ( lab, executionTime) =>{

    let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/${executionTime.toDateString()}.log`)
    const date = new Date()
    const lenObj = lab.OBJ.length
    let numberRandom = generateNumberRandom()
    const nuNumeHproLadex = 11
    const txEstaLadex = 'Leido'
    const nuIndvidLadex = 1
    const cdCodiSerLadex = '19304'
    const nuOriordLadex= 0
    const txConeValiLadex = 'MFIGUEROA'

    const objDate = {
        'year': date.getFullYear(),
        'month': date.getMonth()+1,
        'day':  date.getDate(),
        'hour': date.getHours(),
        'minutes': date.getMinutes()
    }
    const fullDate = objDate.year+'-'+objDate.month+'-'+objDate.day+' '+objDate.hour+':'+objDate.minutes

    async function laboAdminExamen( query, id ){
        await Patient.insertLaboExamen( query, executionTime )
        let nu_nume_ladex = await Patient.getLabAutoLadex(id, executionTime)
        return nu_nume_ladex
    }

    async function resultExaResult(nu_ladex, lab){
            for(let i = 0; i <= lab.OBJ.length-6; i++){
                const queryLaboResu = `insert into LABO_DATOS_RESU (NU_NUME_RESU_LADR, NU_AUTO_LADEX_LADR, NU_AUTO_LAAN_LADR, TX_VALO_LADR, TX_INRE_LADR, TX_SURE_LADR) values (0,${nu_ladex.NU_AUTO_LADEX}, ${lab.OBJ[i].COD}, ${parseFloat(lab.OBJ[i].HOMO)}, ${lab.OBJ[i].MIN}, ${lab.OBJ[i].MAX})`
                await Patient.insertLaboDatosResu( queryLaboResu,  executionTime )
            }
    }

    try {
        if(lab.OBJ[25].MENSAJEWBC != 'N/A' & lab.OBJ[26].MENSAJERBC != 'N/A'){
            const query = `insert into LABO_ADMINEXAMEN (NU_NUME_HPRO_LADEX,TX_CONSE_LADEX,FE_FECHA_LADEX,ME_OBSERV_LADEX,NU_NUME_LABO_LADEX,TX_ESTA_LADEX,NU_INDVID_LADEX,NU_HIST_PAC_LADEX,CD_CODI_SER_LADEX,TX_CONE_VALI_LADEX,FE_VALI_LADEX,NU_ORIORD_LADEX) values (11,'${numberRandom}','${fullDate}','${lab.OBJ[25].MENSAJEWBC+' '+lab.OBJ[26].MENSAJERBC}',${lab.NU_NUME_LABO_FACT},'${txEstaLadex}',${nuIndvidLadex},'${lab.OBJ[23].IDPAC}','${cdCodiSerLadex}','${txConeValiLadex}','${fullDate}',${nuOriordLadex})`
            let ladex = await laboAdminExamen(query, lab.OBJ[23].IDPAC, executionTime)
            await resultExaResult(ladex, lab)
        }else if(lab.OBJ[25].MENSAJEWBC != 'N/A'){
            const query = `insert into LABO_ADMINEXAMEN (NU_NUME_HPRO_LADEX,TX_CONSE_LADEX,FE_FECHA_LADEX,ME_OBSERV_LADEX,NU_NUME_LABO_LADEX,TX_ESTA_LADEX,NU_INDVID_LADEX,NU_HIST_PAC_LADEX,CD_CODI_SER_LADEX,TX_CONE_VALI_LADEX,FE_VALI_LADEX,NU_ORIORD_LADEX) values (${nuNumeHproLadex},'${numberRandom}','${fullDate}','${lab.OBJ[25].MENSAJEWBC}',${lab.NU_NUME_LABO_FACT},'${txEstaLadex}',${nuIndvidLadex},'${lab.OBJ[23].IDPAC}','${cdCodiSerLadex}','${txConeValiLadex}','${fullDate}',${nuOriordLadex})`
            let ladex = await laboAdminExamen(query, lab.OBJ[23].IDPAC)
            await resultExaResult(ladex, lab)
        }else if(lab.OBJ[26].MENSAJERBC != 'N/A'){
            const query = `insert into LABO_ADMINEXAMEN (NU_NUME_HPRO_LADEX,TX_CONSE_LADEX,FE_FECHA_LADEX,ME_OBSERV_LADEX,NU_NUME_LABO_LADEX,TX_ESTA_LADEX,NU_INDVID_LADEX,NU_HIST_PAC_LADEX,CD_CODI_SER_LADEX,TX_CONE_VALI_LADEX,FE_VALI_LADEX,NU_ORIORD_LADEX) values (${nuNumeHproLadex},'${numberRandom}','${fullDate}','${lab.OBJ[26].MENSAJERBC}',${lab.NU_NUME_LABO_FACT},'${txEstaLadex}',${nuIndvidLadex},'${lab.OBJ[23].IDPAC}','${cdCodiSerLadex}','${txConeValiLadex}','${fullDate}',${nuOriordLadex})`
            let ladex = await laboAdminExamen(query, lab.OBJ[23].IDPAC)
            await resultExaResult(ladex, lab)
        }else{
            const query = `insert into LABO_ADMINEXAMEN (NU_NUME_HPRO_LADEX,TX_CONSE_LADEX,FE_FECHA_LADEX,NU_NUME_LABO_LADEX,TX_ESTA_LADEX,NU_INDVID_LADEX,NU_HIST_PAC_LADEX,CD_CODI_SER_LADEX,TX_CONE_VALI_LADEX,FE_VALI_LADEX,NU_ORIORD_LADEX) values (${nuNumeHproLadex},'${numberRandom}','${fullDate}',${lab.NU_NUME_LABO_FACT},'${txEstaLadex}',${nuIndvidLadex},'${lab.OBJ[23].IDPAC}','${cdCodiSerLadex}','${txConeValiLadex}','${fullDate}',${nuOriordLadex})`
            let ladex = await laboAdminExamen(query, lab.OBJ[23].IDPAC)
            await resultExaResult(ladex, lab)
        }
    } catch (error) {
        fs.appendFileSync(
            pathLog,
            `\n messages:${error}, insert to failend in ${lab.OBJ[23].IDPAC}`,
            'utf-8',
        )
    }
}

