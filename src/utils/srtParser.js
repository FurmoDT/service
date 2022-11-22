import {json2xml} from "xml-js";

export const parse = (srtText) => {
    const normalizedSrtData = srtText.replace(/\r\n/g, '\n');
    const lines = normalizedSrtData.split('\n');
    const items = [];

    let o = {
        text: ''
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        let times;
        let lineBreak = '\n';

        if (typeof parseInt(line, 10) === 'number' && (i === 0 || lines[i - 1] === '')) { // index
        } else if (line.indexOf(' --> ') > -1) { // timestamp
            times = line.split(' --> ');
            o.start = times[0];
            o.end = times[1];
        } else if (line === '') { // reset
            items.push(o);
            o = {text: ''};
        } else { // text
            if (lines[i + 1] === '') {
                lineBreak = '';
            }
            o.text += line + lineBreak;
        }
    }
    return items;
}

export const parseFsp = (fspJson, language, targetLanguage) => {
    const items = []
    const subtitle = fspJson.elements[0].elements[5].elements
    for (let i = 0; i < subtitle.length; i++) {
        const line = {}
        line.start = subtitle[i].attributes.i ? `0${subtitle[i].attributes.i}` : ''
        line.end = subtitle[i].attributes.o ? `0${subtitle[i].attributes.o}` : ''
        subtitle[i].elements.forEach((v, i) => {
            if (v.elements) {
                const text = v.elements[0].text.replaceAll('|', '\n').split('\n').map(v => v.trim()).join('\n')
                if (targetLanguage.includes(v.attributes.g)) line.text = text
                else line[`language_${language[i]}`] = text
            } else line[`language_${language[i]}`] = ''
        })
        items.push(line)
    }
    return items
}

export function toSrt(array) {
    let res = "";
    for (let i = 0; i < array.length; i++) {
        let s = array[i];
        res += s.index + "\r\n";
        res += s.start + " --> " + s.end + "\r\n";
        res += s.text.replace("\n", "\r\n") + "\r\n\r\n";
    }
    return res;
}

export function toFsp(array, file) {
    array.forEach((v, i) => {
        const newLine = {
            type: 'element',
            name: 'N',
            attributes: {i: v.start ? v.start.slice(1) : '', o: v.end ? v.end.slice(1) : ''}
        }
        newLine.elements = []
        file.language.forEach((l) => {
            newLine.elements.push({
                type: 'element',
                name: 'T',
                attributes: {g: l.split('_')[0]},
                elements: [{
                    type: 'text', text: (() => {
                        if (v.hasOwnProperty(`language_${l}`)) return v[`language_${l}`].replace('\n', '|')
                        else return v['text'].replace('\n', '|')
                    })()
                }]
            })

        })
        file.data.elements[0].elements[5].elements[i] = newLine
    })
    return '\ufeff' + json2xml(file.data, {spaces: 2})
}
