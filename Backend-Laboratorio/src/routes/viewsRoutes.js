import { loginLocalAut } from "../Auth/lacalAuth.js"
import { Router } from "express";
import { lastAnalyte } from "../utils/lastAnalyte.js";
import protectRoute from "../middlewares/protect-routes.js";
import { storage } from "../utils/uploadDocuments.js";
import { Patient } from "../services/patient.lab.services.js";
let executionTime = new Date()

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
        let getLastAnalyte = lastAnalyte()
        getLastAnalyte
        .then(result=>{
            res.render('pages/home', { people: fullname, title: 'Bienvenido', dateLaboDocument:result.Document, dateRead:result.FE_LAB_EXECUTION } )
        })
    }

    static read (req, res){
        let getLastAnalyte = lastAnalyte()
        getLastAnalyte
        .then(result=>{
            res.render('pages/interfaceRead', { people: fullname, title: 'Cargar', dateLaboDocument:result.Document, dateRead:result.FE_LAB_EXECUTION } )
        })
    }

    static event (req, res){
        if(req.route.methods.post){
            const { Tipo, greaterEqual, fecha } = req.body
            let getlogread = Patient.getLogRead( Tipo, greaterEqual, fecha,executionTime )
            getlogread
            .then(data=>{
                let getLastAnalyte = lastAnalyte()
                getLastAnalyte
                .then(result=>{
                    res.render('pages/interfaceEvent', {people: fullname, title: 'Eventos', dateLaboDocument:result.Document, dateRead:result.FE_LAB_EXECUTION, dataLogRead: data } )
                })
            })
        }else{
            let getLastAnalyte = lastAnalyte()
            const data = [

            ]
            getLastAnalyte
            .then(result=>{
                res.render('pages/interfaceEvent', {people: fullname, title: 'Eventos', dateLaboDocument:result.Document, dateRead:result.FE_LAB_EXECUTION, dataLogRead: [] } )
            })
        }
    }
}


const authRouter =  Router()
authRouter.get( '/', Routes.login )
authRouter.get( '/login', Routes.login )
authRouter.post( '/login', loginLocalAut )
authRouter.get( '/home',protectRoute ,Routes.getHome )
authRouter.get( '/logout',protectRoute, Routes.logout )
authRouter.get( '/read',protectRoute, Routes.read )
authRouter.post( '/read',protectRoute, storage )
authRouter.get( '/event', protectRoute, Routes.event )
authRouter.post( '/event', protectRoute, Routes.event)

export default authRouter

