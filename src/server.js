import dotenv from 'dotenv'
import { app } from './app.js'
import fs from 'fs'
import path from 'path'


dotenv.config()

const PORT = process.env.PORT || 8080
const date = new Date()
let pathLog = await path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_state_server/runserver.txt`)
app.listen(PORT, ()=> {
    fs.appendFileSync(
        pathLog,
        `Messages: Server runing on ${PORT } ${date}`
    )
})