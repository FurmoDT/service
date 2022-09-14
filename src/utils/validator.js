export const validator = (r, c, v, luckysheet) => {
    luckysheet.setCellFormat(r, c, 'ff', 1)
    // give notice
    luckysheet.setCellFormat(r, c, 'bg', '#fff000')
    luckysheet.setCellFormat(r, c, 'bd', {borderType: "border-all"})
    // reset
    luckysheet.setCellFormat(r, c, 'bg', null)
    luckysheet.setCellFormat(r, c, 'bd', {borderType: "border-none"})
}
