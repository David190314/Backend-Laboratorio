import { loginLocalAut } from "../Auth/lacalAuth.js"
import { Router } from "express";
import protectRoute from "../middlewares/protect-routes.js";

class Routes {
    static home (req, res) {
        res.render('pages/login', { title: 'Iniciar Sesíon' })
    }
    static login (req, res) {
        res.render('pages/login', { title: 'Iniciar Sesíon' })
    }
    static logout(req, resp) {
        req.logout();
        return resp.redirect('/login')
    }
    static getHome (req, res){
        res.render('pages/home')
    }
}

const authRouter =  Router()
authRouter.get( '/', Routes.login )
authRouter.get( '/login', Routes.login )
authRouter.post('/login',loginLocalAut)
authRouter.get('/home',protectRoute ,Routes.getHome)
authRouter.get('/logout', Routes.logout)

export default authRouter

