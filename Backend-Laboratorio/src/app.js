import express from 'express';
import path from 'path';
import { pool, sql } from './Setencias/initConnection.js';
import authRouter from './routes/viewsRoutes.js';
import passport from 'passport';
import sessionConfig from './Auth/session.config.js';
import flahs from 'connect-flash'
import './Auth/passports.js'

//Guardando en la ruta relativa de la estrutura del proyecto
const __dirname = path.resolve(`./src/`);

//Guardamos en una constante una instancia de express
const app = express();

//Asignamos el metodo estatico que se debe de cargar de forma automatica en el navegador
app.use(express.static(`./src/` + 'Css'));

//Configuración de ejs como motor de plantillas para el renderizado de vistas y templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Parsear las respuestas enviadas desde el navegador
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());
app.use(flahs())
const test = sql.testConnection(pool);
test
.then((resp)=>{
    if(resp != 'ETIMEOUT'){
        app.use(authRouter)
    }else{
        Routes.failed();
    }
})
.catch((error)=>{
    console.log('error');
})




// setInterval(()=>{
//     readDate()
// }, 5000000)

export { app }
