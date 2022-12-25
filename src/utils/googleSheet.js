import axios from "axios";

const regex = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)\//


export const googleSheetReader = (url) => {
    const sheetId = regex.exec(url)
    if (sheetId) {
        axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId[1]}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then((value) => {
                console.log(value)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }
}
