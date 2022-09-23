import express from 'express'
import path from 'path'
import { readDate } from './services/readData.js'

//Guardando en la ruta relativa de la estrutura del proyecto
const __dirname = path.resolve(`../backend_laboratorio/src/`)

//Guardamos en una constante una instancia de express
const app = express()

//Asignamos el metodo estatico que se debe de cargar de forma automatica en el navegador
app.use(express.static(`../backend_laboratorio/src/` + 'Css'))

//Configuración de ejs como motor de plantillas para el renderizado de vistas y templates 
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs')

//Parsear las respuestas enviadas desde el navegador
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/",(req, res) =>{
    res.render('pages/home')
})

app.get("/login",(req, res) =>{
    res.render('pages/login')
})

readDate()
setInterval(()=>{
    console.log('HOLA')
}, 10000)

export { app }
