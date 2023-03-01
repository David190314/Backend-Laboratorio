import path from 'path'
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
    
   
    try {
        if(lab.OBJ[25].MENSAJEWBC != 'N/A' & lab.OBJ[26].MENSAJERBC != 'N/A'){
            const query = `insert into LABO_ADMINEXAMEN (NU_NUME_HPRO_LADEX,TX_CONSE_LADEX,FE_FECHA_LADEX,ME_OBSERV_LADEX,NU_NUME_LABO_LADEX,TX_ESTA_LADEX,NU_INDVID_LADEX,NU_HIST_PAC_LADEX,CD_CODI_SER_LADEX,NU_ORIORD_LADEX) values (11,'${numberRandom}','${fullDate}','${lab.OBJ[25].MENSAJEWBC+' '+lab.OBJ[26].MENSAJERBC}',${lab.NU_NUME_LABO_FACT},'${txEstaLadex}',${nuIndvidLadex},'${lab.OBJ[23].IDPAC}','${cdCodiSerLadex}','${txConeValiLadex}','${fullDate}',${nuOriordLadex})`
            await Patient.insertLaboExamen( query, executionTime )
            const q = `select top(1) NU_AUTO_LADEX from LABO_ADMINEXAMEN where (NU_HIST_PAC_LADEX = '${lab.OBJ[23].IDPAC}') and CD_CODI_SER_LADEX = '19304' and NU_NUME_HPRO_LADEX = 11 order by NU_AUTO_LADEX desc`
            let prb = await Patient.getLabAutoLadex(q, executionTime)
            for(let i = 0; i <= lab.OBJ.length-6; i++){
                const queryLaboResu = `insert into LABO_DATOS_RESU (NU_NUME_RESU_LADR, NU_AUTO_LADEX_LADR, NU_AUTO_LAAN_LADR, TX_VALO_LADR, TX_INRE_LADR, TX_SURE_LADR) values (0,${prb.NU_AUTO_LADEX}, ${lab.OBJ[i].COD}, ${parseFloat(lab.OBJ[i].HOMO)}, ${lab.OBJ[i].MIN}, ${lab.OBJ[i].MAX})`
                await Patient.insertLaboDatosResu( queryLaboResu,  executionTime )
            }
        }else if(lab.OBJ[25].MENSAJEWBC != 'N/A'){
            const query = `insert into LABO_ADMINEXAMEN (NU_NUME_HPRO_LADEX,TX_CONSE_LADEX,FE_FECHA_LADEX,ME_OBSERV_LADEX,NU_NUME_LABO_LADEX,TX_ESTA_LADEX,NU_INDVID_LADEX,NU_HIST_PAC_LADEX,CD_CODI_SER_LADEX,TX_CONE_VALI_LADEX,FE_VALI_LADEX,NU_ORIORD_LADEX) values (${nuNumeHproLadex},'${numberRandom}','${fullDate}','${lab.OBJ[25].MENSAJEWBC}',${lab.NU_NUME_LABO_FACT},'${txEstaLadex}',${nuIndvidLadex},'${lab.OBJ[23].IDPAC}','${cdCodiSerLadex}','${txConeValiLadex}','${fullDate}',${nuOriordLadex})`
            await Patient.insertLaboExamen( query, executionTime )
            const q = `select top(1) NU_AUTO_LADEX from LABO_ADMINEXAMEN where (NU_HIST_PAC_LADEX = '${lab.OBJ[23].IDPAC}') and CD_CODI_SER_LADEX = '19304' order by NU_AUTO_LADEX desc`
            let prb = await Patient.getLabAutoLadex(q, executionTime)
            for(let i = 0; i <= lab.OBJ.length-6; i++){
                const queryLaboResu = `insert into LABO_DATOS_RESU (NU_NUME_RESU_LADR, NU_AUTO_LADEX_LADR, NU_AUTO_LAAN_LADR, TX_VALO_LADR, TX_INRE_LADR, TX_SURE_LADR) values (0,${prb.NU_AUTO_LADEX}, ${lab.OBJ[i].COD}, ${parseFloat(lab.OBJ[i].HOMO)}, ${lab.OBJ[i].MIN}, ${lab.OBJ[i].MAX})`
                await Patient.insertLaboDatosResu( queryLaboResu,  executionTime )
            }
        }else if(lab.OBJ[26].MENSAJERBC != 'N/A'){
            const query = `insert into LABO_ADMINEXAMEN (NU_NUME_HPRO_LADEX,TX_CONSE_LADEX,FE_FECHA_LADEX,ME_OBSERV_LADEX,NU_NUME_LABO_LADEX,TX_ESTA_LADEX,NU_INDVID_LADEX,NU_HIST_PAC_LADEX,CD_CODI_SER_LADEX,TX_CONE_VALI_LADEX,FE_VALI_LADEX,NU_ORIORD_LADEX) values (${nuNumeHproLadex},'${numberRandom}','${fullDate}','${lab.OBJ[26].MENSAJERBC}',${lab.NU_NUME_LABO_FACT},'${txEstaLadex}',${nuIndvidLadex},'${lab.OBJ[23].IDPAC}','${cdCodiSerLadex}','${txConeValiLadex}','${fullDate}',${nuOriordLadex})`
            await Patient.insertLaboExamen( query, executionTime )
            const q = `select top(1) NU_AUTO_LADEX from LABO_ADMINEXAMEN where (NU_HIST_PAC_LADEX = '${lab.OBJ[23].IDPAC}') and CD_CODI_SER_LADEX = '19304' order by NU_AUTO_LADEX desc`
            let prb = await Patient.getLabAutoLadex(q, executionTime)
            for(let i = 0; i <= lab.OBJ.length-6; i++){
                const queryLaboResu = `insert into LABO_DATOS_RESU (NU_NUME_RESU_LADR, NU_AUTO_LADEX_LADR, NU_AUTO_LAAN_LADR, TX_VALO_LADR, TX_INRE_LADR, TX_SURE_LADR) values (0,${prb.NU_AUTO_LADEX}, ${lab.OBJ[i].COD}, ${parseFloat(lab.OBJ[i].HOMO)}, ${lab.OBJ[i].MIN}, ${lab.OBJ[i].MAX})`
                await Patient.insertLaboDatosResu( queryLaboResu,  executionTime )
            }
        }else{
            const query = `insert into LABO_ADMINEXAMEN (NU_NUME_HPRO_LADEX,TX_CONSE_LADEX,FE_FECHA_LADEX,NU_NUME_LABO_LADEX,TX_ESTA_LADEX,NU_INDVID_LADEX,NU_HIST_PAC_LADEX,CD_CODI_SER_LADEX,TX_CONE_VALI_LADEX,FE_VALI_LADEX,NU_ORIORD_LADEX) values (${nuNumeHproLadex},'${numberRandom}','${fullDate}',${lab.NU_NUME_LABO_FACT},'${txEstaLadex}',${nuIndvidLadex},'${lab.OBJ[23].IDPAC}','${cdCodiSerLadex}','${txConeValiLadex}','${fullDate}',${nuOriordLadex})`
            await Patient.insertLaboExamen( query, executionTime )
            const q = `select top(1) NU_AUTO_LADEX from LABO_ADMINEXAMEN where (NU_HIST_PAC_LADEX = '${lab.OBJ[23].IDPAC}') and CD_CODI_SER_LADEX = '19304' order by NU_AUTO_LADEX desc`
            let prb = await Patient.getLabAutoLadex(q, executionTime)
            for(let i = 0; i <= lab.OBJ.length-6; i++){
                const queryLaboResu = `insert into LABO_DATOS_RESU (NU_NUME_RESU_LADR, NU_AUTO_LADEX_LADR, NU_AUTO_LAAN_LADR, TX_VALO_LADR, TX_INRE_LADR, TX_SURE_LADR) values (0,${prb.NU_AUTO_LADEX}, ${lab.OBJ[i].COD}, ${parseFloat(lab.OBJ[i].HOMO)}, ${lab.OBJ[i].MIN}, ${lab.OBJ[i].MAX})`
                await Patient.insertLaboDatosResu( queryLaboResu,  executionTime )
            }
        }
        
        

   } catch (error) {
        fs.appendFileSync(
            pathLog,
            `\n messages:${error} `,
            'utf-8',
        )
   }
}

