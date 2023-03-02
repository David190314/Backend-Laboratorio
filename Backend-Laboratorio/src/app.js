import express from 'express'
import path from 'path'
import { pool, sql } from './Setencias/initConnection.js'
import { readDate } from './services/readData.js'
import { Routes } from './routes/viewsRoutes.js'

//Guardando en la ruta relativa de la estrutura del proyecto
const __dirname = path.resolve(`./src/`)

//Guardamos en una constante una instancia de express
const app = express()

//Asignamos el metodo estatico que se debe de cargar de forma automatica en el navegador
app.use(express.static(`./src/` + 'Css'))

//Configuración de ejs como motor de plantillas para el renderizado de vistas y templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//Parsear las respuestas enviadas desde el navegador
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const test = sql.connectionDatabase(pool, 'select * from dbo.airports')
test
.then((resp)=>{
    if(resp != 'Actualmente el servidor de Base de datos no esta disponible'){
        Routes.home(app)
        Routes.login(app)
    }else{
        Routes.failed(app)
    }
})
.catch((error)=>{
    console.log(error)
})



readDate()
setInterval(()=>{
    readDate()
}, 5000000)

export { app }
