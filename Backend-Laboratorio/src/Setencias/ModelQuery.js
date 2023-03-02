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
            throw err
        }
    }

    //Crea la conexión con la base de datos, recuperamos la conexión y enviamos la consulta sql enviada desde los servicios
    async connectionDatabase(pool, query){
        try {
            const resultConnection = await pool.connect()
            let data = await new sql.Request(resultConnection).query(`${query}`)
            return data
        } catch (err) {
            return `Actualmente el servidor de Base de datos no esta disponible`
            //throw new Error(`Actualmente el servidor de Base de datos no esta disponible`)
        }
    }

}