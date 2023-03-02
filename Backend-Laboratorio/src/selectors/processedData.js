import { operationDataBase } from "../controllers/patient.lab.controllers.js"
import { Patient } from "../services/patient.lab.services.js"
import fs from 'fs'
import path from 'path'
import { Console } from "console"


export const integrationObject = async (str, arrayPatient, executionTime) => {
  
  let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs/logsthereisnopatient/${executionTime.toDateString()}.log`)
  const [WBC, NEU$,LYM$, MON$, EOS$, BAS$, NEU, MON, LYM, EOS, BAS, RBC, HGB, HCT, MCV, MCH, MCHC,
        RDWCV, RDWSD, PLT, MPV , PDW, PCT, IDPAC, COMENTARIOS, MENSAJEWBC, MENSAJERBC, MENSAJEPLT
      ] = str
  

  class Person {
    constructor({
      WBC, NEU$,
      LYM$, MON$, EOS$, BAS$, NEU, MON, LYM, EOS, BAS, RBC, HGB, HCT, MCV, MCH, MCHC, RDWCV, RDWSD, PLT, MPV , PDW, PCT, IDPAC,
      COMENTARIOS, MENSAJEWBC, MENSAJERBC, MENSAJEPLT, OBJ
    }){
      this.OBJ = [
        WBC,
        NEU$,
        LYM$,
        MON$,
        EOS$,
        BAS$,
        NEU,
        LYM,
        MON,
        EOS,
        BAS,
        RBC,
        HGB,
        HCT,
        MCV,
        MCH,
        MCHC,
        RDWCV,
        RDWSD,
        PLT,
        MPV,
        PDW,
        PCT,
        IDPAC,
        COMENTARIOS,
        MENSAJEWBC,
        MENSAJERBC,
        MENSAJEPLT
      ]
    }
  }
  
  const resultShows = arrayPatient.map((ele, i)=> {
    const person = new Person({
      WBC: {
        'HOMO': ele[7],
        'COD': 56,
        'MIN': '0.12',
        'MAX': '1.20'
      },
      NEU$: {
        'HOMO': ele[8],
        'COD': 319,
        'MIN': '0.12',
        'MAX': '1.20'
      },
      LYM$: {
        'HOMO': ele[9],
        'COD': 320,
        'MIN': '0.12',
        'MAX': '1.20'
      },
      MON$: {
        'HOMO': ele[10],
        'COD': 321,
        'MIN': '0.12',
        'MAX': '1.20'
      },
      EOS$: {
        'HOMO': ele[11],
        'COD': 322,
        'MIN': '0.12',
        'MAX': '1.20'
      },
      BAS$: {
        'HOMO': ele[12],
        'COD': 323,
        'MIN': '0.12',
        'MAX': '1.20'
      },
      NEU: {
        'HOMO': ele[13],
        'COD': 57,
        'MIN': '0.12',
        'MAX': '1.20'
      },
      LYM: {
        'HOMO': ele[14],
        'COD': 58,
        'MIN': '0.12',
        'MAX': '1.20'
      },
      MON: {
        'HOMO': ele[15],
        'COD': 61,
        'MIN': '0.12',
        'MAX': '1.20'
      },
      EOS: {
        'HOMO': ele[16],
        'COD': 59,
        'MIN': '0.02',
        'MAX': '0.50'
      },
      BAS: {
        'HOMO': ele[17],
        'COD': 60,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      RBC: {
        'HOMO': ele[18],
        'COD': 65,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      HGB: {
        'HOMO': ele[19],
        'COD': 54,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      HCT: {
        'HOMO': ele[20],
        'COD': 55,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      MCV: {
        'HOMO': ele[21],
        'COD': 66,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      MCH: {
        'HOMO': ele[22],
        'COD': 67,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      MCHC: {
        'HOMO': ele[23],
        'COD': 68,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      RDWCV: {
        'HOMO': ele[24],
        'COD': 69,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      RDWSD: {
        'HOMO': ele[25],
        'COD': 70,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      PLT: {
        'HOMO': ele[26],
        'COD': 71,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      MPV: {
        'HOMO':ele[27],
        'COD': 72,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      PDW: {
        'HOMO': ele[28],
        'COD': 73,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      PCT: {
        'HOMO': ele[29],
        'COD': 74,
        'MIN': '0.00',
        'MAX': '0.40'
      },
      IDPAC: {
        IDPAC: ele[44],
      },
      COMENTARIOS: {
        COMENTARIOS: ele[59]
      },
      MENSAJEWBC: {
        MENSAJEWBC: ele[60]
      },
      MENSAJERBC: {
        MENSAJERBC: ele[61]
      },
      MENSAJEPLT: {
        MENSAJEPLT: ele[62]
      },
    })
    return person
  })
  resultShows.filter(async element => {
    const searchUserdId = await Patient.getPatientById(element.OBJ[23].IDPAC, executionTime)
    //const nuAutoLadexLadr = await Patient.getLabAutoLadex(executionTime)
    //const nuLabFact = await Patient.getLaboFact(element.OBJ[23].IDPAC, executionTime)
    if(searchUserdId != undefined){
      if(searchUserdId[0].NU_DOCU_PAC === element.OBJ[23].IDPAC){
        const newResultShows = {...element,
          'NU_AUTO_LADEX': 0,
          'NU_NUME_LABO_FACT': nuLabFact.LaboFact || 0
        }
        
        //operationDataBase(newResultShows, executionTime)
        
      }
    }else{
      fs.appendFileSync(
        pathLog,
        `\n messages: El número de identificación ${element.OBJ[23].IDPAC}, no se encuentra creado en el sistema. Fecha de intento de cargue al sistema ${executionTime.toLocaleString()}`,
        'utf-8',
        )
    }
  })

}
