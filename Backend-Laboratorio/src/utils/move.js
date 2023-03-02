import fs from 'fs-extra'
import path from 'path'


export const moveDocument = (src, file, number) =>{
    const dest = path.resolve(`../../../../../../Laboratorio_Clinico/Laboratorio/file_process/${number }${file[0]}`)
    fs.moveSync(src,dest, {overwrite: true})
}