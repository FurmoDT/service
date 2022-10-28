import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import {useEffect, useRef} from "react";
import {parse, parseFsp} from "../utils/srtParser";
import {tcValidator, textValidator} from "../utils/validator";
import {fileDownload} from "../utils/fileDownload";
import * as Grammarly from "@grammarly/editor-sdk";
import {TCtoSec} from "../utils/calculator";

let cellData = []
let fileData = null


function errorRenderer(instance, td) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.innerText = [...cellData[arguments[2]]['error']].join('\n')
}


const SpreadSheet = (props) => {
    const containerMain = useRef(null);
    const containerGrammarly = useRef(null);
    useEffect(() => {
        function clearChild(element) {
            while (element.firstChild) {
                clearChild(element.firstChild)
            }
            if (!element.id || !element.id.startsWith('hot-')) {
                element.remove()
            }
        }

        function tcRenderer(instance, td) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            tcValidator(arguments[2], arguments[3], arguments[5], td, instance, cellData, (() => {
                // eslint-disable-next-line
                if (props.file.filename.endsWith('.fsp')) return '\.'
                else if (props.file.filename.endsWith('.srt')) return ','
            })())
        }

        function textRenderer(instance, td) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            textValidator(arguments[2], arguments[3], arguments[5], td, instance, cellData, props.guideline)
        }

        function cpsRenderer(instance, td) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            const curRowData = cellData[arguments[2]]
            try {
                const textCount = curRowData['text'].replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '').match(/[^\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g).length // remove tag and puncs
                td.innerText = Math.ceil(textCount / (TCtoSec(curRowData['end']) - TCtoSec(curRowData['start'])))
            } catch (error) {
                td.innerText = 0
            }
            if (td.innerText >= props.guideline['inputCPS']) {
                td.style.backgroundColor = 'yellow'
            }
        }

        const hot = {main: null, grammarly: null}
        const setGrammarly = async () => {
            return await Grammarly.init("client_3a8upV1a1GuH7TqFpd98Sn");
        }
        const grammarly = setGrammarly()
        if (props.file.data && props.file.data !== fileData) {
            if (props.file.filename.endsWith('.fsp')) {
                cellData = props.file.data ? parseFsp(props.file.data, props.file.language) : []
            } else if (props.file.filename.endsWith('.srt')) {
                cellData = props.file.data ? parse(props.file.data) : []
            }
            cellData.forEach((value) => {
                value['error'] = new Set()
                value['checked'] = false
            })
            fileData = props.file.data
        }
        const resizeBtn = document.getElementById('btn-resize')
        resizeBtn.style.display = props.file.data ? '' : 'none'
        resizeBtn.onclick = (e) => {
            [resizeBtn.children[0].style.display, resizeBtn.children[1].style.display] = [resizeBtn.children[1].style.display, resizeBtn.children[0].style.display];
            document.getElementById('spreadSheets').style.height = document.getElementById('spreadSheets').style.height === '500px' ? '800px' : '500px'
            hot.main.render()
            hot.grammarly.render()
        }
        document.getElementById('spreadSheets').style.display = props.file.data ? 'flex' : 'none'
        props.buttonDownload.current.onclick = async () => {
            const Unchecked = []
            cellData.forEach((value, index) => {
                cellData[index]['index'] = index + 1
                if (value['checked'] === false) {
                    Unchecked.push(index + 1)
                }
            })
            if (Unchecked.length) {
                alert('Line Unchecked\n' + Unchecked.join('\n'))
            } else {
                const ipData = await fetch('https://geolocation-db.com/json/');
                const locationIp = await ipData.json();
                const curr = new Date()
                console.log(new Date(curr.getTime() + curr.getTimezoneOffset() * 60 * 1000 + 9 * 60 * 60 * 1000), locationIp.IPv4, props.file.filename);
                fileDownload(cellData, props.file)
            }
        }
        props.buttonDownload.current.onmouseover = () => {
            let text = ''
            cellData.map((v, index) => text += v.text)
            if (text.match(/"/g) && text.match(/"/g).length % 2 !== 0) {
                props.buttonDownload.current.classList.replace('btn-primary', 'btn-danger')
                document.getElementById('txt-downloadError').style.display = ''
                document.getElementById('txt-downloadError').innerHTML = 'DOUBLE QUOTATION MARKS DO NOT PAIR'
            }
        }
        props.buttonDownload.current.onmouseleave = () => {
            props.buttonDownload.current.classList.replace('btn-danger', 'btn-primary')
            document.getElementById('txt-downloadError').style.display = 'none'
            document.getElementById('txt-downloadError').innerHTML = ''
        }

        if (containerMain.current && Object.keys(props.file).length !== 0) {
            clearChild(containerMain.current)
            hot.main = new Handsontable(containerMain.current, {
                colHeaders: ['TC_IN', 'TC_OUT', ...props.file.language.map((v) => ['enUS', 'enGB', 'TEXT'].includes(v) ? `&#128274;${v}` : v), 'CPS', 'ERROR'],
                manualColumnResize: true,
                data: cellData,
                rowHeaders: true,
                rowHeights: 30,
                width: '70%',
                height: '100%',
                className: 'htLeft',
                hiddenColumns: {indicators: true},
                stretchH: 'last',
                columns: [
                    {data: 'start', className: 'htCenter', renderer: tcRenderer},
                    {data: 'end', className: 'htCenter', renderer: tcRenderer},
                    ...props.file.language.map((value) => {
                        if (['enUS', 'enGB', 'TEXT'].includes(value)) return {data: 'text', renderer: textRenderer}
                        else return {data: `language_${value}`, editor: null}
                    }),
                    {
                        data: 'cps',
                        className: 'htCenter',
                        renderer: cpsRenderer,
                        disableVisualSelection: true,
                        editor: null
                    },
                    {
                        data: 'error',
                        className: 'htCenter',
                        renderer: errorRenderer,
                        disableVisualSelection: true,
                        editor: null
                    },
                ],
                contextMenu: {
                    items: {
                        'row_above': {},
                        'row_below': {},
                        'remove_row': {},
                        'hidden_columns_hide': {},
                        'hidden_columns_show': {}
                    }
                },
                licenseKey: 'non-commercial-and-evaluation'
            })
            let grammarlyPlugin = null

            hot.main.addHook('afterBeginEditing', (row, column) => {
                grammarly.then(r => {
                    grammarlyPlugin = r.addPlugin(
                        document.getElementById('hot-main').querySelector("textarea"),
                        {
                            documentDialect: "american",
                        },
                    )
                    const textarea = document.getElementById('hot-main').querySelector('grammarly-editor-plugin').querySelector('textarea')
                    textarea.focus()
                });
                props.player.current.seekTo(TCtoSec(cellData[row]['start']))
            })
            hot.main.addHook('afterChange', (changes) => {
                if (grammarlyPlugin) {
                    grammarlyPlugin.disconnect()
                }
            })
            hot.main.addHook('afterGetRowHeader', (row) => {
                if (cellData[row]['checked'] === false) {
                    cellData[row]['checked'] = true
                }
            })
            for (let i = 0; i < hot.main.countRenderedRows() - 2; i++) { // default rendered rows
                cellData[i]['checked'] = true
            }
        }
        if (containerGrammarly.current && Object.keys(props.file).length !== 0) {
            clearChild(containerGrammarly.current)
            hot.grammarly = new Handsontable(containerGrammarly.current, {
                colHeaders: ['Grammar Check'],
                colWidths: 500,
                rowHeights: 30,
                width: '30%',
                height: '100%',
                stretchH: 'all',
                className: 'htLeft',
                columns: [
                    {data: 'grammarly'},
                ],
                maxRows: 1,
                licenseKey: 'non-commercial-and-evaluation'
            })
            let grammarlyPlugin = null
            let grammarlyColPos = 0
            let curIndex = 1
            const updateMainText = (text, forceUpdate = false) => {
                let lastLineBreak = text.lastIndexOf('\n', grammarlyColPos - 1)
                let curLine = text.slice(lastLineBreak + 1, text.indexOf('\n', grammarlyColPos))
                if (!curLine.startsWith('Index:')) {
                    while (!curLine.startsWith('Index:')) {
                        curLine = text.slice(text.lastIndexOf('\n', lastLineBreak - 1) + 1, lastLineBreak)
                        lastLineBreak = text.lastIndexOf('\n', lastLineBreak - 1)
                    }
                    const idx = Number(curLine.split('Index:')[1])
                    if (forceUpdate || curIndex !== idx) {
                        const targetText = text.slice(text.indexOf('\n', text.indexOf(`Index:${curIndex}`)) + 1, text.indexOf(`Index:${curIndex + 1}`) - 1)
                        if (cellData[curIndex - 1]['text'] !== targetText) {
                            hot.main.setDataAtCell(curIndex - 1, 2 + Math.max(...[props.file.language.indexOf('enUS'), props.file.language.indexOf('enGB'), props.file.language.indexOf('TEXT')]), text.slice(text.indexOf('\n', text.indexOf(`Index:${curIndex}`)) + 1, text.indexOf(`Index:${curIndex + 1}`) - 1))
                            hot.main.scrollViewportTo(curIndex - 1)
                        }
                        curIndex = idx
                    }
                }
            }
            hot.grammarly.addHook('afterBeginEditing', (row, column) => {
                grammarly.then(r => {
                    grammarlyPlugin = r.addPlugin(
                        document.getElementById('hot-grammarly').querySelector("textarea"),
                        {
                            documentDialect: "american",
                        },
                    )
                    const textarea = document.getElementById('hot-grammarly').querySelector('grammarly-editor-plugin').querySelector('textarea')
                    let curText = ''
                    cellData.map((v, index) => curText += 'Index:' + (index + 1) + '\n' + v.text + '\n')
                    if (textarea.value !== curText) {
                        textarea.value = curText
                    }
                    const updateGrammarlyData = () => {
                        grammarlyColPos = textarea.selectionStart
                        updateMainText(textarea.value)
                    }
                    document.getElementById('hot-grammarly').querySelector('grammarly-editor-plugin').addEventListener('click', updateGrammarlyData)
                    document.getElementById('hot-grammarly').querySelector('grammarly-editor-plugin').addEventListener('keyup', updateGrammarlyData)
                    textarea.setSelectionRange(grammarlyColPos, grammarlyColPos)
                    textarea.focus()
                });
                document.getElementById('hot-grammarly').getElementsByClassName('ht_master')[0].getElementsByClassName('wtHolder')[0].style.overflowY = 'hidden'
            })
            hot.grammarly.addHook('afterChange', (changes) => {
                if (grammarlyPlugin) {
                    grammarlyPlugin.disconnect()
                }
                updateMainText(changes[0][3], true)
            })
            hot.grammarly.addHook('afterSelection', (row, column, row2, column2, preventScrolling, selectionLayerLevel) => {
                preventScrolling.value = true
            })
            hot.grammarly.setDataAtCell(0, 0, (() => {
                let grammarlyText = ''
                cellData.map((v, index) => grammarlyText += 'Index:' + (index + 1) + '\n' + v.text + '\n')
                return grammarlyText
            })())
        }
    }, [props]);

    return <div id={'spreadSheets'} style={{
        flexDirection: "row",
        display: "none",
        width: '100%',
        height: 500,
        borderStyle: 'solid',
        borderWidth: 'thin'
    }}>
        <div id={"hot-grammarly"} ref={containerGrammarly}
             onFocus={() => {
                 if (document.getElementById('trigger').parentElement.classList[1] === 'is-open') {
                     document.getElementById('trigger').click()
                 }
             }}/>
        <div id={"hot-main"} ref={containerMain}
             onFocus={() => {
                 if (document.getElementById('trigger').parentElement.classList[1] === 'is-open') {
                     document.getElementById('trigger').click()
                 }
             }}/>
    </div>
}

export default SpreadSheet
