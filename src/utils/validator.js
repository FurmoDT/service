export const tcValidator = (r, c, v, td, instance, cellData) => {
    if (!v || (c === 0 && instance.getDataAtCell(r - 1, c + 1) > v) || (c === 1 && instance.getDataAtCell(r, c - 1) > v)) {
        td.style.backgroundColor = 'red'
    }
}


export const textValidator = (r, c, v, td, instance, cellData) => {
    if (!v) {
        cellData[r]['text'] = ''
        td.style.backgroundColor = 'red';
    } else if (v.includes('  ')) {
        td.style.backgroundColor = 'red';
    }
}
