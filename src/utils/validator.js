export const tcValidator = (r, c, v, td, instance, cellData) => {
    if (!v || !/^(\d{2}:\d{2}:\d{2},\d{3})$/.test(v) || (c === 0 && instance.getDataAtCell(r - 1, c + 1) > v) || (c === 1 && instance.getDataAtCell(r, c - 1) > v)) {
        td.style.backgroundColor = 'red'
    }
}


export const textValidator = (r, c, v, td, instance, cellData) => {
    if (!v) { // null cell
        cellData[r]['text'] = ''
        td.style.backgroundColor = 'red';
    } else if (v.includes('  ')) { // multiple spaces
        td.style.backgroundColor = 'red';
    } else if (/(^|[^.])\.{2}(?!\.)/.test(v) || /(^|[^.])\.{4,}(?!\.)/.test(v)) { // 2 or 4+ dots
        td.style.backgroundColor = 'red'
    } //
}
