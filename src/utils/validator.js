import {TCtoSec} from "./calculator";

const setTDColor = (td, backgroundColor) => {
    td.style.backgroundColor = backgroundColor
    if (backgroundColor === 'red') td.style.color = 'white'
}

export const tcValidator = (r, c, v, td, instance, cellData, guideline, sep) => {
    const errors = new Set()
    if (!v || !new RegExp(`^(\\d{2}:\\d{2}:\\d{2}\\${sep}\\d{3})`).test(v)) {
        setTDColor(td, 'red')
        errors.add(`TC${c === 0 ? '_IN' : '_OUT'} Invalid`)
    } else {
        if (c === 0) {
            if (instance.getDataAtCell(r - 1, c + 1) > v) {
                setTDColor(td, 'red')
                errors.add('TC_IN Invalid')
            }
        } else if (c === 1) {
            if (instance.getDataAtCell(r, c - 1) > v) {
                setTDColor(td, 'red')
                errors.add('TC_OUT Invalid')
            }
            if (guideline.name === 'kcp') {
                const gap = TCtoSec(cellData[r]['end']) - TCtoSec(cellData[r]['start'])
                if (gap < 1) {
                    setTDColor(td, 'red')
                    errors.add('TC Interval Under 1 Second')
                } else if (gap > 7) {
                    setTDColor(td, 'red')
                    errors.add('TC Interval Over 7 Seconds')
                }
            }
        }
    }
    if (c === 0) cellData[r]['tcInError'] = errors
    if (c === 1) cellData[r]['tcOutError'] = errors
}


export const textValidator = (r, c, v, td, instance, cellData, guideline) => {
    const errors = new Set()
    if (!v) { // null cell
        cellData[r]['text'] = ''
        setTDColor(td, 'red')
        errors.add('Empty Cell')
    } else {
        v = v.replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '').replaceAll(/{(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+}/g, '')
        if (v.match(/[.?!][^a-zA-Z]*[a-z]/g)) {
            setTDColor(td, 'yellow')
            errors.add('First Word Capitalization')
        }
        if (cellData[r - 1]?.text?.match(/[.?!][^a-zA-Z]*$/g)) {
            const char = v.match(/[a-zA-Z]/g)
            if (char && char[0] !== char[0].toUpperCase()) {
                setTDColor(td, 'yellow')
                errors.add('First Word Capitalization')
            }
        }
        if (cellData[r + 1]?.text?.match(/^[A-Z]/g)) {
            if (!v.match(/[.?!)][^a-zA-Z]*$/g)) {
                setTDColor(td, 'yellow')
                errors.add('End Punctuation')
            }
        }
        if (v.split('\n').length > guideline['inputMaxLine']) {
            setTDColor(td, 'red')
            errors.add('Max Lines Exceeded')
        }
        v.split('\n').forEach((value) => {
            if (value.length > guideline['inputMaxCharacter']) {
                setTDColor(td, 'red')
                errors.add('Max Characters Exceeded')
            }
        })
        if (v.includes('  ')) { // multiple spaces
            setTDColor(td, 'red')
            errors.add('Multiple Spaces')
        }
        if (/(^|[^.])\.{2}(?!\.)/.test(v) || /(^|[^.])\.{4,}(?!\.)/.test(v)) { // 2 or 4+ dots
            setTDColor(td, 'red')
            errors.add('2 Or 4+ Dots')
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
    if (td.innerText >= guideline['inputCPS']) setTDColor(td, 'yellow')
}
