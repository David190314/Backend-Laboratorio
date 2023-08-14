import fs from 'fs/promises'
import { Patient } from '../services/patient.lab.services.js'

const dirDocuments = `../../../../../../Laboratorio_Clinico/Laboratorio/file_process/`
const dateOfSystem = Math.abs(new Date())
export const lastAnalyte = async() =>{
            const queryLastDocument = 'SELECT * FROM DBO.BACKENDLAB ORDER BY DBO.BACKENDLAB.FE_LAB_EXECUTION DESC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;'
            const result = await Patient.lastDocumentRead(queryLastDocument)
            return result
}




