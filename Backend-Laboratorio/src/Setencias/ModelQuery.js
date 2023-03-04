import sql from 'mssql'


//Creamos una clase que nos permita instanciar una conexión con el motor de bases de datos de SQL Server
export class Sql {
    constructor(stringConnection){
        this.stringConnection = stringConnection
    }

    //Metodo que retorna el pool de conexión
    connectiontPoolDatabase(){
        try {
            const connection = new sql.ConnectionPool(this.stringConnection)
            return connection
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async testConnection(pool){
        try {
            const resultConnection = await pool.connect()
            return resultConnection
        } catch (error) {
            return error.originalError.code
        }
    }

    //Crea la conexión con la base de datos, recuperamos la conexión y enviamos la consulta sql enviada desde los servicios
    async connectionDatabase(pool, query){
        try {
            const resultConnection = await pool.connect()
            let data = await new sql.Request(resultConnection).query(`${query}`)
            return data
        } catch (err) {
            const { message } = err
            return message
        }
    }

}