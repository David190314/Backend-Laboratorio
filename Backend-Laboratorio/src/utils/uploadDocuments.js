import multer from 'multer'
const fullname = 'Administrador'
import { readDate } from '../services/readData.js';

export const storage = (request, response, next) =>{
    const storage = multer.diskStorage({
        destination:function(request, file, callback)
      {
        callback(null, '../../../../../../Laboratorio_Clinico/Laboratorio/file_process/');
      },
        filename : function(request, file, callback)
      {
        const temp_file_arr = file.originalname.split(".");

        const temp_file_name = temp_file_arr[0];

        const temp_file_extension = temp_file_arr[1];

        callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
      }
    });
    const upload = multer({storage:storage}).single('documento')

    upload(request, response, function(error){

    if(error)
    {
      return response.end('Error Uploading File');
    }
    else
    {
      const point = '.'
      const typeDocument =  point.concat(request.file.originalname.split('.')[1])
      readDate(typeDocument, request.file.originalname, request.file.filename)
      const date = new Date();
      const isoDateString = date
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('es-ES', options);
      return response.render('pages/interfaceRead', { people: fullname, title: 'Cargar', dateLaboDocument: request.file.originalname, dateRead:formattedDate } )
    }

  })
}
