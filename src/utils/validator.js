import {TCtoSec} from "./calculator";

export const tcValidator = (r, c, v, td, instance, cellData, guideline, sep) => {
    const errors = new Set()
    if (!v || !new RegExp(`^(\\d{2}:\\d{2}:\\d{2}\\${sep}\\d{3})`).test(v) || (c === 0 && instance.getDataAtCell(r - 1, c + 1) > v) || (c === 1 && instance.getDataAtCell(r, c - 1) > v)) {
        td.style.backgroundColor = 'red'
    }
    if (guideline.name === 'kcp') {
        const gap = TCtoSec(cellData[r]['end']) - TCtoSec(cellData[r]['start'])
        if (gap < 1 || gap > 7){
            td.style.backgroundColor = 'red'
            errors.add('TC Interval Invalid (1 ~ 7 seconds)')
        }
    }
    cellData[r]['tcError'] = errors
}


export const textValidator = (r, c, v, td, instance, cellData, guideline) => {
    const errors = new Set()
    if (!v) { // null cell
        cellData[r]['text'] = ''
        td.style.backgroundColor = 'red'
        errors.add('Empty Cell')
    } else {
        v = v.replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '').replaceAll(/{(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+}/g, '')
        if (v.match(/[.?!][^a-zA-Z]*[a-z]/g)) {
            td.style.backgroundColor = 'yellow'
            errors.add('Possible Uppercase')
        }
        if (cellData[r - 1]?.text?.match(/[.?!][^a-zA-Z]*$/g)) {
            const char = v.match(/[a-zA-Z]/g)
            if (char && char[0] !== char[0].toUpperCase()) {
                td.style.backgroundColor = 'yellow'
                errors.add('Possible Uppercase')
            }
        }
        if (cellData[r + 1]?.text?.match(/^[A-Z]/g)) {
            if (!v[v.length - 1].match(/[.?!)]/g)) {
                td.style.backgroundColor = 'yellow'
                errors.add('Possible Endswith Punctuation')
            }
        }
        if (v.split('\n').length > guideline['inputMaxLine']) {
            td.style.backgroundColor = 'red'
            errors.add('MaxLine Exceeded')
        }
        v.split('\n').forEach((value) => {
            if (value.length > guideline['inputMaxCharacter']) {
                td.style.backgroundColor = 'red'
                errors.add('MaxCharacter Exceeded')
            }
        })
        if (v.includes('  ')) { // multiple spaces
            td.style.backgroundColor = 'red'
            errors.add('Multiple Spaces')
        }
        if (/(^|[^.])\.{2}(?!\.)/.test(v) || /(^|[^.])\.{4,}(?!\.)/.test(v)) { // 2 or 4+ dots
            td.style.backgroundColor = 'red'
            errors.add('2 or 4+ dots')
        }
    }
    cellData[r]['textError'] = errors
}

export const cpsValidator = (r, td, cellData, guideline) => {
    const curRowData = cellData[r]
    try {
        let textCount
        const text = curRowData['text'].replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '').replaceAll(/{(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+}/g, '') // remove tag
        if (guideline.name === 'paramount') textCount = 0.5 * (text.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g).length + text.length) // 1 * koKR + 0.5 (eng & punc)
        else textCount = text.match(/[^\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g).length // remove punc
        td.innerText = Math.ceil(textCount / (TCtoSec(curRowData['end']) - TCtoSec(curRowData['start']))) || 0
    } catch (error) {
        td.innerText = 0
    }
    if (td.innerText >= guideline['inputCPS']) td.style.backgroundColor = 'yellow'
}
