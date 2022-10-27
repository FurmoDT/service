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

export const parseFsp = (fspJson, language) => {
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const items = []
    const subtitle = fspJson.elements[0].elements[5].elements
    for (let i = 0; i < subtitle.length; i++) {
        const line = {}
        line.start = subtitle[i].attributes.i ? `0${subtitle[i].attributes.i}` : ''
        line.end = subtitle[i].attributes.o ? `0${subtitle[i].attributes.o}` : ''
        subtitle[i].elements.forEach((v, i) => {
            if (v.elements) {
                if (v.attributes.g === 'enUS' || v.attributes.g === 'enGB') line.text = v.elements[0].text.replace('|', '\n')
                else line[`language_${language[i]}`] = v.elements[0].text.replace('|', '\n')
            }
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
