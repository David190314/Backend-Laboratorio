// Importamos passport para crear las estrategias
import passport from 'passport'

import dotenv from 'dotenv'
dotenv.config()

//Creando la estrategia de autenticacion Local
import LocalStrategy from 'passport-local'

const myStrategy = LocalStrategy.Strategy
passport.use(new myStrategy({
    usernameField: 'ID'
}, async (ID, password, done) => {

    try{
        if(ID === process.env.USERLOGIN && process.env.PASSWORDLOGIN === password){
            passport.serializeUser(function (Cedula, done) {
                done(null, Cedula);
            });
            passport.deserializeUser(function (Cedula, done) {
                done(null, Cedula);
            });
            return done(null, ID)
        }else{
            return done(null, false,{
                message: 'Password Incorrecto'
            });
        }
    }catch(error){
        return 'Currently the session can not be attended'
    }
}))