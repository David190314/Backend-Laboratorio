export class Routes {

    static home (app) {
        app.get("/",(req, res) =>{
            res.render('pages/home')
        })

    }

    static login (app) {
        app.get("/login",(req, res) =>{
            res.render('pages/login')
        })
    }
}


