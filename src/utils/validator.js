export const tcValidator = (r, c, v, td, instance) => {
    if (!v || (c === 1 && instance.getDataAtCell(r - 1, c + 1) > v) || (c === 2 && instance.getDataAtCell(r, c - 1) > v)) {
        td.style.backgroundColor = 'red'
    }
}


export const validator = (r, c, v, td) => {
    if (v && v.length > 0){
        td.style.backgroundColor = 'yellow';
    }
}
