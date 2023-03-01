import express from 'express'
import path from 'path'
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

Routes.home(app)
Routes.login(app)

// app.get("/",(req, res) =>{
//     res.render('pages/home')
// })

// app.get("/login",(req, res) =>{
//     res.render('pages/login')
// })


let counter = 1

readDate(counter)
setInterval(()=>{
    readDate(counter)
}, 5000000)

export { app }
