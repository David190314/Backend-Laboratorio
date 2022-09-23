import { Sql } from "./ModelQuery.js";
import { config } from "./config.js";


//Creamos una instacia del objeto Sql y enviamos la configuración de conexión
const sql = new Sql(config)

//Recuperamos el resultado de invocar el metodo de conexión
const pool = sql.connectiontPoolDatabase()

export { sql, pool }
