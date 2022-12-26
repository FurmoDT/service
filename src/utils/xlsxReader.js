import axios from "axios";
import * as XLSX from "xlsx";

const regex = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)\//


const sheetReader = (sheetData) => {
    const termBaseDictionary = {}
    let key, values
    sheetData.forEach((row) => {
        row.slice(1).forEach((r) => {
            if (new RegExp(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g).test(r)) {
                if (values?.length) termBaseDictionary[key] = values
                key = r
                values = []
            } else values?.push(r)
        })
    })
    if (key && values) termBaseDictionary[key] = values
    return termBaseDictionary
}

export const googleSheetReader = (url) => {
    const sheetId = regex.exec(url)
    const termBase = {}
    if (sheetId) {
        axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId[1]}/values/Sheet1?key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then((value) => {
                termBase[0] = sheetReader(value.data.values)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }
    return termBase
}

export const xlsxReader = (data) => {
    const termBase = {}
    const wb = XLSX.read(data, {type: 'binary'})
    wb.SheetNames.forEach((value, index) => {
        const ws = wb.Sheets[value]
        const sheetData = XLSX.utils.sheet_to_json(ws, {header: 1})
        if (index === 0) {
            termBase[0] = sheetReader(sheetData)
        }
    })
    return termBase
}
