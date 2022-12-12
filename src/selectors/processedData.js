import { operationDataBase } from "../controllers/patient.lab.controllers.js"
import { Patient } from "../services/patient.lab.services.js"
import fs from 'fs'
import path from 'path'


export const integrationObject = async (str, arrayPatient, counter, executionTime) => {

  let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs/logsthereisnopatient/${executionTime.toDateString()}.log`)
  const [ IDMUESTR, NOMBRE, APELLIDO, MODO, FECHA, HORA, ESTDEMUESTRA, WBCL, NEUL,
    LYML, MONL, EOSL, BASL, NEU, MON, LYM, EOS, BAS, RBCL, HGBGDL, HCT, MCVFL, MCHPG, MCHCGDL,
    RDWCV, RDWSD, PLTL, MPVFL , PDW, PCTMLL, ALYL, ALY, LICL, LIC, BLASTL, BLAST, NRBCL,NRBC,
    PLTCLUMPL, PLTCLUMP, LIPL, LIP, NLR, PLR, IDPAC,SEXO,TIPOPAC,GRUPODEREF,FECHANAC, EDAD, DPTO,
    NCAMA, FECHADETRAZADO, HORADETRAZADO, FECHAENTREGA, HORENTR, MEDICOCLINICO, OPERADOR, VALIDADOPOR,
    COMENTARIOS, MENSAJEWBC, MENSAJERBC, MENSAJEPLT, GRUPOSANGUINEO, ESR, PARMMICROSCOPICOS
  ] = str

  class Person {
    constructor({
      IDmuest, NOMBRE, APELLIDO, MODO, FECHA, HORA, ESTDEMUESTRA, WBCL, NEUL,
      LYML, MONL, EOSL, BASL, NEU, MON, LYM, EOS, BAS, RBCL, HGBGDL, HCT, MCVFL, MCHPG, MCHCGDL,
      RDWCV, RDWSD, PLTL, MPVFL , PDW, PCTMLL, ALYL, ALY, LICL, LIC, BLASTL, BLAST, NRBCL,NRBC,
      PLTCLUMPL, PLTCLUMP, LIPL, LIP, NLR, PLR, IDPAC,SEXO,TIPOPAC,GRUPODEREF,FECHANAC, EDAD, DPTO,
      NCAMA, FECHADETRAZADO, HORADETRAZADO, FECHAENTREGA, HORENTR, MEDICOCLINICO, OPERADOR, VALIDADOPOR,
      COMENTARIOS, MENSAJEWBC, MENSAJERBC, MENSAJEPLT, GRUPOSANGUINEO, ESR, PARMMICROSCOPICOS, OBJ
    }){
      this.IDmuest = IDmuest
      this.NOMBRE = NOMBRE
      this.APELLIDO = APELLIDO
      this.MODO = MODO
      this.FECHA = FECHA
      this.HORA = HORA
      this.ESTDEMUESTRA = ESTDEMUESTRA
      this.EOS = EOS
      this.PLTL = PLTL
      this.MPVFL = MPVFL
      this.PDW = PDW
      this.ALYL = ALYL
      this.ALY = ALY
      this.LICL = LICL
      this.LIC = LIC
      this.BLASTL = BLASTL
      this.BLAST = BLAST
      this.NRBCL = NRBCL
      this.NRBC = NRBC
      this.PLTCLUMPL = PLTCLUMPL
      this.PLTCLUMP = PLTCLUMP
      this.LIPL = LIPL
      this.LIP = LIP
      this.NLR = NLR
      this.PLR = PLR
      this.IDPAC = IDPAC
      this.SEXO = SEXO
      this.TIPOPAC = TIPOPAC
      this.GRUPODEREF = GRUPODEREF
      this.FECHANAC = FECHANAC
      this.EDAD = EDAD
      this.DPTO = DPTO
      this.NCAMA = NCAMA
      this.FECHADETRAZADO = FECHADETRAZADO
      this.HORADETRAZADO = HORADETRAZADO
      this.FECHAENTREGA = FECHAENTREGA
      this.HORENTR = HORENTR
      this.MEDICOCLINICO = MEDICOCLINICO
      this.OPERADOR = OPERADOR
      this.VALIDADOPOR = VALIDADOPOR
      this.COMENTARIOS = COMENTARIOS
      this.MENSAJEWBC = MENSAJEWBC
      this.MENSAJERBC = MENSAJERBC
      this.MENSAJEPLT = MENSAJEPLT
      this.GRUPOSANGUINEO = GRUPOSANGUINEO
      this.ESR = ESR
      this.PARMMICROSCOPICOS = PARMMICROSCOPICOS
      this.OBJ = [
        WBCL,
        NEUL,
        LYML,
        MONL,
        EOSL,
        BASL,
        NEU,
        LYM,
        MON,
        BAS,
        RBCL,
        HGBGDL,
        HCT,
        MCVFL,
        MCHPG,
        MCHCGDL,
        RDWCV,
        RDWSD,
        PCTMLL
      ]
    }
  }
  const resultShows = arrayPatient.map((ele, i)=> {
    const person = new Person({
      IDmuest: ele[0],
      NOMBRE: ele[1],
      APELLIDO: ele[2],
      MODO: ele[3],
      FECHA: ele[4],
      HORA: ele[5],
      ESTDEMUESTRA: ele[6],
      WBCL: {'HOMO': ele[7], 'COD': 199},
      NEUL: {'HOMO': ele[8], 'COD': 200},
      LYML: {'HOMO': ele[9], 'COD': 201},
      MONL: {'HOMO': ele[10], 'COD': 202},
      EOSL: {'HOMO': ele[11], 'COD': 203},
      BASL: {'HOMO': ele[12], 'COD': 204},
      NEU: {'HOMO': ele[13], 'COD': 205},
      LYM: {'HOMO': ele[14], 'COD': 206},
      MON: {'HOMO': ele[15], 'COD': 207},
      EOS: ele[16],
      BAS: {'HOMO': ele[17], 'COD': 208},
      RBCL: {'HOMO': ele[18], 'COD': 209},
      HGBGDL: {'HOMO': ele[19], 'COD': 210},
      HCT: {'HOMO': ele[20], 'COD': 211},
      MCVFL: {'HOMO': ele[21], 'COD': 212},
      MCHPG: {'HOMO': ele[22], 'COD': 213},
      MCHCGDL: {'HOMO': ele[23], 'COD': 214},
      RDWCV: {'HOMO': ele[24], 'COD': 216},
      RDWSD: {'HOMO': ele[25], 'COD': 217},
      PLTL: ele[26],
      MPVFL: ele[27],
      PDW: ele[28],
      PCTMLL: {'HOMO': ele[29], 'COD': 215},
      ALYL: ele[30],
      ALY: ele[31],
      LICL: ele[32],
      LIC: ele[33],
      BLASTL: ele[34],
      BLAST: ele[35],
      NRBCL: ele[36],
      NRBC: ele[37],
      PLTCLUMPL: ele[38],
      PLTCLUMP: ele[39],
      LIPL: ele[40],
      LIP: ele[41],
      NLR: ele[42],
      PLR: ele[43],
      IDPAC: ele[44],
      SEXO: ele[45],
      TIPOPAC: ele[46],
      GRUPODEREF: ele[47],
      FECHANAC: ele[48],
      EDAD: ele[49],
      DPTO: ele[50],
      NCAMA: ele[51],
      FECHADETRAZADO: ele[52],
      HORADETRAZADO: ele[53],
      FECHAENTREGA: ele[54],
      HORENTR: ele[55],
      MEDICOCLINICO: ele[56],
      OPERADOR: ele[57],
      VALIDADOPOR: ele[58],
      COMENTARIOS: ele[59],
      MENSAJEWBC: ele[60],
      MENSAJERBC: ele[61],
      MENSAJEPLT: ele[62],
      GRUPOSANGUINEO: ele[63],
      ESR: ele[64],
      PARMMICROSCOPICOS: ele[65],
      OBJ: {}
    })
    return person
  })
  resultShows.filter(async element => {
    const nuAutoLadexLadr = await Patient.getLabAutoLadex(executionTime)
    const searchUserdId = await Patient.getPatientById(element.IDmuest, executionTime)
    const nuLabFact = await Patient.getLaboFact(element.IDmuest, executionTime)
    if(searchUserdId != undefined){
      if(searchUserdId[0].NU_DOCU_PAC === element.IDmuest){
        const newResultShows = {...element,
          'NU_AUTO_LADEX': nuAutoLadexLadr+counter,
          'NU_NUME_LABO_FACT': nuLabFact.LaboFact
        }
        operationDataBase(newResultShows, executionTime)
      }
      counter++
    }else{
      fs.appendFileSync(
        pathLog,
        `\n messages: El número de identificación ${element.IDmuest}, no se encuentra creado en el sistema. Fecha de intento de cargue al sistema ${executionTime.toLocaleString()}`,
        'utf-8',
        )
    }
  })

}
