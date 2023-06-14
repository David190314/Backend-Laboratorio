import fs from 'fs/promises'

const dirDocuments = `../../../../../../Laboratorio_Clinico/Laboratorio/file_process/`
const dateOfSystem = Math.abs(new Date())
export const lastAnalyte = async(type = 'csv') =>{
            const pathDocuments = await fs.readdir(dirDocuments)
            const result = await pathDocuments.map((e)=>{
                if(e.toLowerCase().endsWith(type)){
                    const nameDocumentRead = e.slice(0,e.indexOf('-'))
                    async function date(document){
                        try {
                            const stats = await fs.stat(document)
                            //console.log(stats.atime.toLocaleString(), e)
                            console.log(dateOfSystem)
                            return await stats.atime.toLocaleString()
                        } catch (error) {
                            return error
                        }
                    }
                    return date(dirDocuments.concat(e))
                }
            })
            return result[0]
}




