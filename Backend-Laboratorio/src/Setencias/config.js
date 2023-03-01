import dotenv from 'dotenv'
dotenv.config()


//Creando en el objeto de conexión con las variables de entorno del sistema
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.PORTDB, 10),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt: false,
        trustServerCertificate: false,
    }
}

export { config }