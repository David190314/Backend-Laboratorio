import fs from 'fs-extra'
import path from 'path'



export const moveDocument = (src, file, executionTime) =>{
    let pathLog = path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/logs_errors/${executionTime.toDateString()}.log`)
    try {
        const dest = path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/file_process/${file[0]}`)
        fs.moveSync(src,dest, {overwrite: true})
    } catch (error) {
        fs.appendFileSync(
            pathLog,
            `\n messages:${error} `,
            'utf-8',
        )
    }
}