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
            o.index = line;
        } else if (line.indexOf(' --> ') > -1) { // timestamp
            times = line.split(' --> ');
            items.push({'r': o.index, 'c': 0, v: {v: times[0], ff: 1}})
            items.push({'r': o.index, 'c': 1, v: {v: times[1], ff: 1}})
        } else if (line === '') { // reset
            o = {text: ''};
        } else { // text
            if (lines[i + 1] === '') {
                lineBreak = '';
            }
            o.text += line + lineBreak;
            items.push({'r': o.index, 'c': 2, v: {v: line + lineBreak, ff: 1}})
        }
    }
    return items;
}

export const toArray = (srtText) => {
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

        if (typeof parseInt(line, 10) === 'number' && (i === 0 || lines[i - 1] === '')) {
            // we found an index
            o.index = line;
        } else if (line.indexOf(' --> ') > -1) {
            // we found a timestamp
            times = line.split(' --> ');
            o.start = times[0];
            o.end = times[1];
        } else if (line === '') {
            // we found an empty string, so push o and reset everything
            items.push(o);
            o = {text: ''};
        } else {
            // we must have text to enter since it's not an index, timestamp or empty string.
            // don't add `\n` to the end of the last line of text
            if (lines[i + 1] === '') {
                lineBreak = '';
            }
            o.text += line + lineBreak;
        }
    }
    return items;
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
