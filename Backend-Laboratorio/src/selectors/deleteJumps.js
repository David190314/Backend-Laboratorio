import { uploadChemistry } from "../services/readChemistry.js"

async function deleteJumps(file, executionTime, fileUpload) {
    const homeChane = file[0]
    const data = await file.replace(/\r\n/g, '|')
    let array = []
    let counter = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i] === '|') {
            let labo = data.slice(counter + 1, i).replace(/[N]|\s+/g, '').split(';')
            array.push(labo.slice(0, 3).concat(labo.slice(10, labo.length)).join(',').replace(/([mg/dl])\w+/g, '').split(','))
            counter = i
        }
    }

    array[0][0] = homeChane.concat(array[0][0])
    const newArray = array.map((e) => {
        let iterado = e.filter((i) => i != '' && i)
        return iterado
    })
    uploadChemistry(newArray, executionTime, fileUpload)
}

export { deleteJumps }
