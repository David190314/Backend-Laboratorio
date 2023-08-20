import { pool, sql } from '../Setencias/initConnection.js'
import fs from 'fs'
import path from 'path'

//Creando un objeto con metodos estaticos, para las diferentes consultas sql
export class Patient {
    //Metodo que nos permite buscar los pacientes que estan creados en el sistema
       static async getPatientById( id, executionTime ){
        
        let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/${executionTime.toDateString()}.log`)
        try {
            const data = await sql.connectionDatabase(pool, `select * from pacientes where NU_HIST_PAC='${id}'`)
            if(data.recordset.length === 1) {
                return data.recordset
            }
        } catch (error) {
            const { message, Warnnig } = error
            fs.appendFileSync (
                pathLog,
                `\n Messages: ${ message }; Warnnig: ${Warnnig} getPatientById: ${id} ${executionTime}`,
                'utf-8',
            )
            return message + Warnnig

        }
    }

    //Obtenemos el número de registro facturado para la toma de la muestra
    static async getLaboFact( id, executionTime){
        let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/${executionTime.toDateString()}.log`)
        try {
            //const laboFact = await sql.connectionDatabase(pool, `select	MAX(LABORATORIO.NU_NUME_LABO) AS LaboFact from MOVI_CARGOS INNER JOIN LABORATORIO ON MOVI_CARGOS.NU_NUME_MOVI = LABORATORIO.NU_NUME_MOVI_LABO INNER JOIN LABO_ADMINEXAMEN ON LABORATORIO.NU_NUME_LABO = LABO_ADMINEXAMEN.NU_NUME_LABO_LADEX WHERE (MOVI_CARGOS.NU_HIST_PAC_MOVI = '${id}') AND CD_CODI_SER_LADEX='19304'`)
            const laboFact = await sql.connectionDatabase(pool, `select MAX(LABORATORIO.NU_NUME_LABO) AS LaboFact from MOVI_CARGOS INNER JOIN LABORATORIO ON MOVI_CARGOS.NU_NUME_MOVI = LABORATORIO.NU_NUME_MOVI_LABO WHERE (MOVI_CARGOS.NU_HIST_PAC_MOVI ='${id}') AND LABORATORIO.CD_CODI_SER_LABO IN (Select CD_CODI_SER_LRSEX From LABO_R_SER_EXAMEN Where NU_AUTO_LAEX_LRSEX=14)`)
            return laboFact.recordset[0]
        } catch (error) {
            const { message, Warnnig } = error
            fs.appendFileSync (
                pathLog,
                `\n Messages: ${ message }; Warnnig: ${Warnnig} getLaboFact from id: ${id} ${executionTime}`,
                'utf-8',
            )
            return message + Warnnig
        }
    }


    //Metodo que inserta los datos en la tabla LABO_ADMINEXAMEN 
    static async insertLaboExamen( query, executionTime ){
        let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/${executionTime.toDateString()}.log`)
        try {
            await sql.connectionDatabase( pool, query )
        } catch (error) {
            const { message, Warnnig } = error
            fs.appendFileSync (
                pathLog,
                `\n Messages: ${ message }; Warnnig: ${Warnnig} insertLaboExamen `,
                'utf-8',
            )
            return message + Warnnig
        }
    }

    //Metodo que obtiene el auntoincrement de la tabla LABO_ADMINEXAMEN, para proceder con la relación muchos a muchos LABO_DATOS_RESU
    static async getLabAutoLadex( id, executionTime ){
        let query = `select top(1) NU_AUTO_LADEX from LABO_ADMINEXAMEN where (NU_HIST_PAC_LADEX = '${id}') and CD_CODI_SER_LADEX = '19304' and NU_NUME_HPRO_LADEX = 11 order by NU_AUTO_LADEX desc`
        let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/${executionTime.toDateString()}.log`)
        try {
            const nuAutoLadex = await sql.connectionDatabase(pool, query)
            return nuAutoLadex.recordset[0]
        } catch (error) {
            const { Message, Warnnig } = error
            fs.appendFileSync (
                pathLog,
                `\n Messages: ${ Message }; Warnnig: ${Warnnig} getLabAutoLadex from id: ${id} ${executionTime}`,
                'utf-8',
            )
            return Message + Warnnig
        }
    }

    //Metodo que nos permite insertar los datos de la muestra tomada
    static async insertLaboDatosResu( query, executionTime ){
        let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/${executionTime.toDateString()}.log`)
        try {
            await sql.connectionDatabase( pool, query, executionTime )
        } catch (error) {
            const { message, Warnnig } = error
            fs.appendFileSync (
                pathLog,
                `\n Messages: ${ message }; Warnnig: ${Warnnig} insertLaboDatosResu, ${executionTime} `,
                'utf-8',
            )
            return message + Warnnig
        }
    }

    //Metodo que crea en la tabla BACKENDLAB los usuarios con laboratorio registrado exitosamente
    static async insterConfirmResult (query, executionTime, id){
        let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/${executionTime.toDateString()}.log`)
        try {
            await sql.connectionDatabase( pool, query )
        } catch (error) {
            const { message, Warnnig } = error
            fs.appendFileSync (
                pathLog,
                `\n Messages: ${ message }; Warnnig: ${Warnnig} insterConfirmResult from id: ${id} ${executionTime} `,
                'utf-8',
            )
            return  message + Warnnig
        }
    }

    //Metodo que retorna los ultimos documentos de Hematologia y Qumica leidos.

    static async lastDocumentRead(query){
        try{
            const lastDocument = await sql.connectionDatabase(pool, query)
            const isoDateString = lastDocument.recordset[0].FE_LAB_EXECUTION
            const date = new Date(isoDateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('es-ES', options);
            const dataUploadDocument = {
                Document : lastDocument.recordset[0].DOCUMENT,
                FE_LAB_EXECUTION : formattedDate
            }
            return dataUploadDocument
        }catch(error){
            return 'There are currently no documents uploaded'
        }
    }

    //metodo que carga los laboratorios de quimica a la base de datos

    static async insterChemistry(query, executionTime){
        let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/chemistry/${executionTime.toDateString()}.log`)
        try {
            await sql.connectionDatabase(pool, query)
        } catch (error) {
            const { message, Warnnig } = error
            fs.appendFileSync (
                pathLog,
                `\n Messages: ${ message }; failed conect to databases${executionTime} `,
                'utf-8',
            )
        }

    }

    static async insertLogUplod (query, executionTime){
        let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/chemistry/${executionTime.toDateString()}.log`)
        try {
            await sql.connectionDatabase(pool, query)
        } catch (error) {
            const { message, Warnnig } = error
            fs.appendFileSync (
                pathLog,
                `\n Messages: ${ message }; failed conect to databases${executionTime} `,
                'utf-8',
            )
        }
    }

    static async getLogRead(Tipo, fecha){
        try {
            let query = `SELECT TOP (1) * FROM dbo.LOGREAD WHERE DBO.LOGREAD.DOCUMENTREAD LIKE '${Tipo}' and dbo.LOGREAD.DATEUPLOAD >= '${fecha}'`
            console.log(query)
            let r = await sql.connectionDatabase(pool, query)
            console.log(r)
        } catch (error) {
            
        }
    }
}
