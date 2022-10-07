export const tcValidator = (r, c, v, td, instance, cellData) => {
    if (!v || !/^(\d{2}:\d{2}:\d{2},\d{3})$/.test(v) || (c === 0 && instance.getDataAtCell(r - 1, c + 1) > v) || (c === 1 && instance.getDataAtCell(r, c - 1) > v)) {
        td.style.backgroundColor = 'red'
    }
}


export const textValidator = (r, c, v, td, instance, cellData, guideline) => {
    const errors = new Set()
    if (!v) { // null cell
        cellData[r]['text'] = ''
        td.style.backgroundColor = 'red'
        errors.add('Empty Cell')
    } else {
        if (v.match(/[.?!][^a-zA-z]*[a-z]/g)) {
            td.style.backgroundColor = 'yellow'
            errors.add('Possible Uppercase')
        }
        if (cellData[r - 1] && cellData[r - 1]['text'].match(/[.?!]$/g)){
            const char = v.match(/[a-zA-Z]/g)
            if (char && char[0] !== char[0].toUpperCase()){
                td.style.backgroundColor = 'yellow'
                errors.add('Possible Uppercase')
            }
        }
        if (v.split('\n').length > guideline['inputMaxLine']) {
            td.style.backgroundColor = 'red'
            errors.add('MaxLine Exceeded')
        }
        if (v.length > guideline['inputMaxCharacter']) {
            td.style.backgroundColor = 'red'
            errors.add('MaxCharacter Exceeded')
        }
        if (v.includes('  ')) { // multiple spaces
            td.style.backgroundColor = 'red'
            errors.add('Multiple Spaces')
        }
        if (/(^|[^.])\.{2}(?!\.)/.test(v) || /(^|[^.])\.{4,}(?!\.)/.test(v)) { // 2 or 4+ dots
            td.style.backgroundColor = 'red'
            errors.add('2 or 4+ dots')
        }
    }
    cellData[r]['error'] = errors
}
