import { pool, sql } from '../Setencias/initConnection.js'


//Creando un objeto con metodos estaticos, para las diferentes consultas sql
export class Patient {

    //Metodo que nos permite los pacientes que estan creados en el sistema
    static async getPatientById( id ){
        try {
            const data = await sql.connectionDatabase(pool, `select * from pacientes where NU_HIST_PAC='${id}'`)
            if(data.recordset.length === 1) {
                return data.recordset
            }
        } catch (error) {
            throw 'Error in request services'
        }
    }

    //Obtenemos el número de registro facturado para la toma de la muestra
    static async getLaboFact( id ){
        try {
            const laboFact = await sql.connectionDatabase(pool, `select	MAX(LABORATORIO.NU_NUME_LABO) AS LaboFact from MOVI_CARGOS INNER JOIN LABORATORIO ON MOVI_CARGOS.NU_NUME_MOVI = LABORATORIO.NU_NUME_MOVI_LABO INNER JOIN LABO_ADMINEXAMEN ON LABORATORIO.NU_NUME_LABO = LABO_ADMINEXAMEN.NU_NUME_LABO_LADEX WHERE (MOVI_CARGOS.NU_HIST_PAC_MOVI = '${id}') AND CD_CODI_SER_LADEX=201`)
            return laboFact.recordset[0]
        } catch (error) {
            throw 'Error in request services'
        }
    }


    //Metodo que inserta los datos en la tabla LABO_ADMINEXAMEN 
    static async insertLaboExamen( query ){
        try {
            await sql.connectionDatabase( pool, query )

        } catch (error) {
            throw 'Error in request services'
        }
    }

    //Metodo que obtiene el auntoincrement de la tabla LABO_ADMINEXAMEN, para proceder con la relación muchos a muchos LABO_DATOS_RESU
    static async getLabAutoLadex(){
        try {
            const nuAutoLadex = await sql.connectionDatabase(pool, `select IDENT_CURRENT('LABO_ADMINEXAMEN') AS IDACTUAL`)
            return nuAutoLadex.recordset[0].IDACTUAL
        } catch (error) {
            throw 'Error in request services'
        }
    }

    //Metodo que nos permite insertar los datos de la muestra tomada
    static async insertLaboDatosResu(query){
        try {
            await sql.connectionDatabase( pool, query )
        } catch (error) {
            throw 'Error in request services'
        }
    }

    
}
