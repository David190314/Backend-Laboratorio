import { loginLocalAut } from "../Auth/lacalAuth.js"
import { Router } from "express";
import { lastAnalyte } from "../utils/lastAnalyte.js";
import protectRoute from "../middlewares/protect-routes.js";
import { readDate } from "../services/readData.js";
const result = await lastAnalyte()
class Routes {
    static login (req, res) {
        res.render('pages/login', { title: 'Iniciar Sesíon' })
    }
    static logout(req, resp) {
        req.logout();
        return resp.redirect('/login')
    }
    static getHome (req, res){
        const fullname = 'Administrador'
        readDate('.csv')
        res.render('pages/home', {people: result, title: 'Bienvenido'})
    }
}

const authRouter =  Router()
authRouter.get( '/', Routes.login )
authRouter.get( '/login', Routes.login,  )
authRouter.post('/login',loginLocalAut)
authRouter.get('/home',protectRoute ,Routes.getHome)
authRouter.get('/logout', Routes.logout)

export default authRouter

