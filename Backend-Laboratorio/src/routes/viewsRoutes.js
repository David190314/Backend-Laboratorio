import { loginLocalAut } from "../Auth/lacalAuth.js"
import { Router } from "express";
import { lastAnalyte } from "../utils/lastAnalyte.js";
import protectRoute from "../middlewares/protect-routes.js";
import { storage } from "../utils/uploadDocuments.js";
const result = await lastAnalyte()

const fullname = 'Administrador'
class Routes {
    static login (req, res) {
        res.render('pages/login', { title: 'Iniciar Sesíon' } )
    }
    static logout(req, resp) {
        req.logout(function(error){
            try {
                resp.redirect('/login')
            } catch (error) {
                resp.clearCookie('connect.sid');
                return resp.redirect('/login');
            }
        });
    }
    static getHome (req, res){
        res.render('pages/home', { people: fullname, title: 'Bienvenido', dateLaboDocument:result.Document, dateRead:result.FE_LAB_EXECUTION } )
    }

    static read (req, res){
        res.render('pages/interfaceRead', { people: fullname, title: 'Cargar', dateLabo:result, dateLaboDocument:result.Document, dateRead:result.FE_LAB_EXECUTION } )
    }

}


const authRouter =  Router()
authRouter.get( '/', Routes.login )
authRouter.get( '/login', Routes.login )
authRouter.post( '/login', loginLocalAut )
authRouter.get( '/home',protectRoute ,Routes.getHome )
authRouter.get( '/logout', Routes.logout )
authRouter.get( '/read',protectRoute, Routes.read )
authRouter.post( '/read',protectRoute, storage )

export default authRouter

