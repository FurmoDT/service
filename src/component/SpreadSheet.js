import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import {useEffect, useRef, useState} from "react";
import {parse, parseFsp} from "../utils/srtParser";
import {tcValidator, textValidator} from "../utils/validator";
import {fileDownload} from "../utils/fileDownload";
import * as Grammarly from "@grammarly/editor-sdk";
import {TCtoSec} from "../utils/calculator";
import {uploadS3} from "../utils/uploadS3";
import VideoPlayer from "./VideoPlayer";
import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import AddOn from "./AddOn";

let cellData = []
const hot = {main: null, grammarly: null}


const SpreadSheet = (props) => {
    const player = useRef(null)
    const resizeBtn = useRef(null)
    const downloadBtn = useRef(null)
    const doubleQuotationMarksPositionLabel = useRef(null)
    const doubleQuotationMarksPrevNextBtn = useRef(null)
    const termBaseKeysPositionLabel = useRef(null)
    const termBasePrevNext = useRef(null)
    const spreadSheets = useRef(null)
    const containerMain = useRef(null);
    const containerGrammarly = useRef(null);
    const [warningMsg, setWarningMsg] = useState(null)
    useEffect(() => {
        const targetLanguage = (() => {
            if (props.file.filename && props.file.filename.endsWith('.srt')) return ['TEXT']
            if (!props.guideline.name) return []
            else return ['paramount'].includes(props.guideline.name) ? ['koKR'] : ['enUS', 'enGB']
        })()

        function errorRenderer(instance, td) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.innerText = [...cellData[arguments[2]]['error']].join('\n')
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
                let textCount
                const text = curRowData['text'].replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '').replaceAll(/{(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+}/g, '') // remove tag
                if (props.guideline.name === 'paramount') textCount = 0.5 * (text.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g).length + text.length) // 1 * koKR + 0.5 (eng & punc)
                else textCount = text.match(/[^\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g).length // remove punc
                td.innerText = Math.ceil(textCount / (TCtoSec(curRowData['end']) - TCtoSec(curRowData['start']))) || 0
            } catch (error) {
                td.innerText = 0
            }
            if (td.innerText >= props.guideline['inputCPS']) {
                td.style.backgroundColor = 'yellow'
            }
        }

        const setGrammarly = async () => {
            return await Grammarly.init("client_3a8upV1a1GuH7TqFpd98Sn");
        }
        const grammarly = setGrammarly()

        if (props.file.data) {
            if (props.file.filename.endsWith('.fsp')) {
                cellData = props.file.data ? parseFsp(props.file.data, props.file.language, targetLanguage) : []
            } else if (props.file.filename.endsWith('.srt')) {
                cellData = props.file.data ? parse(props.file.data) : []
            }
            cellData.forEach((value) => {
                value['error'] = new Set()
                value['checked'] = false
            })
        }
        resizeBtn.current.onclick = (e) => {
            [resizeBtn.current.children[0].style.display, resizeBtn.current.children[1].style.display] = [resizeBtn.current.children[1].style.display, resizeBtn.current.children[0].style.display];
            spreadSheets.current.style.height = spreadSheets.current.style.height === '500px' ? '800px' : '500px'
            hot.main.render()
            hot.grammarly.render()
        }
        downloadBtn.current.onclick = async () => {
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
                await uploadS3(props.file.filename, props.guideline.name)
                fileDownload(cellData, props.file)
            }
        }
        const findDoubleQuotationMarks = () => {
            const indexes = []
            cellData.map((value, index) => value.text.includes('"') ? indexes.push(index) : null)
            return indexes
        }
        const findTermBaseKeys = () => {
            const termBaseError = []
            if (props.termBase[0]) {
                const termBaseKeys = Object.values(props.termBase[0])
                const [koKR] = props.file.language.filter(v => v.startsWith('koKR')).map(v => `language_${v}`).slice(-1)
                // eslint-disable-next-line
                cellData.map((v, index) => {
                    termBaseKeys.forEach((k) => {
                        if (v[koKR].match(k) && !v['text'].match(Object.keys(props.termBase[0]).find(key => props.termBase[0][key] === k))) termBaseError.push(index)
                    })
                })
            }
            return termBaseError
        }
        downloadBtn.current.onmouseover = () => {
            const msg = []
            let text = ''
            cellData.map((v, index) => text += v.text)
            if (text.match(/"/g) && text.match(/"/g).length % 2 !== 0) msg.push('DOUBLE QUOTATION MARKS')
            if (findTermBaseKeys().length) msg.push('TERMBASE')
            if (msg.length) {
                downloadBtn.current.classList.replace('btn-primary', 'btn-danger')
                setWarningMsg(`${msg.join(' & ')} CHECK REQUIRED`)
            } else setWarningMsg('')
        }
        downloadBtn.current.onmouseleave = () => {
            downloadBtn.current.classList.replace('btn-danger', 'btn-primary')
        }
        let doubleQuotationMarksCurPos = 0
        let termBaseCurPos = 0
        doubleQuotationMarksPrevNextBtn.current.children[0].onclick = () => {
            const dqm = findDoubleQuotationMarks()
            if (doubleQuotationMarksCurPos <= 1 || doubleQuotationMarksCurPos > dqm.length) doubleQuotationMarksCurPos = dqm.length
            else doubleQuotationMarksCurPos -= 1
            hot.main.scrollViewportTo(dqm[doubleQuotationMarksCurPos - 1])
            doubleQuotationMarksPositionLabel.current.innerText = `${doubleQuotationMarksCurPos}/${dqm.length}`
        }
        doubleQuotationMarksPrevNextBtn.current.children[1].onclick = () => {
            const dqm = findDoubleQuotationMarks()
            if (doubleQuotationMarksCurPos >= dqm.length) doubleQuotationMarksCurPos = dqm.length ? 1 : 0
            else doubleQuotationMarksCurPos += 1
            hot.main.scrollViewportTo(dqm[doubleQuotationMarksCurPos - 1])
            doubleQuotationMarksPositionLabel.current.innerText = `${doubleQuotationMarksCurPos}/${dqm.length}`
        }
        termBasePrevNext.current.children[0].onclick = () => {
            const tb = findTermBaseKeys()
            if (termBaseCurPos <= 1 || termBaseCurPos > tb.length) termBaseCurPos = tb.length
            else termBaseCurPos -= 1
            hot.main.scrollViewportTo(tb[termBaseCurPos - 1])
            termBaseKeysPositionLabel.current.innerText = `${termBaseCurPos}/${tb.length}`
        }
        termBasePrevNext.current.children[1].onclick = () => {
            const tb = findTermBaseKeys()
            if (termBaseCurPos >= tb.length) termBaseCurPos = tb.length ? 1 : 0
            else termBaseCurPos += 1
            hot.main.scrollViewportTo(tb[termBaseCurPos - 1])
            termBaseKeysPositionLabel.current.innerText = `${termBaseCurPos}/${tb.length}`
        }
        if (containerMain.current && Object.keys(props.file).length) {
            if (hot.main && !hot.main.isDestroyed) hot.main.destroy()
            hot.main = new Handsontable(containerMain.current, {
                colHeaders: ['TC_IN', 'TC_OUT', ...props.file.language.map((v) => {
                    if (props.guideline.name) return (targetLanguage.includes(v)) ? v : `&#128274;${v}`
                    else return `&#128274;${v}`
                }), 'CPS', 'ERROR'],
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
                        if (targetLanguage.includes(value)) return props.guideline.name ? {
                            data: 'text',
                            renderer: textRenderer
                        } : {data: 'text', editor: null, disableVisualSelection: true}
                        else return {data: `language_${value}`, editor: null, disableVisualSelection: true}
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
                player.current.seekTo(TCtoSec(cellData[row]['start']))
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
        if (containerGrammarly.current && Object.keys(props.file).length) {
            if (hot.grammarly && !hot.grammarly.isDestroyed) hot.grammarly.destroy()
            hot.grammarly = new Handsontable(containerGrammarly.current, {
                colHeaders: ['Grammar Check'],
                colWidths: 500,
                rowHeights: 30,
                width: '100%',
                height: '100%',
                stretchH: 'all',
                className: 'htLeft',
                readOnly: !props.guideline.name || props.guideline.name === 'paramount',
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
                        const targetText = text.slice(text.indexOf('\n', text.indexOf(`Index:${curIndex}`)) + 1, cellData.length === curIndex ? text.length : text.indexOf(`Index:${curIndex + 1}`) - 1)
                        if (cellData[curIndex - 1]['text'] !== targetText) {
                            hot.main.setDataAtCell(curIndex - 1, 2 + Math.max(...[props.file.language.indexOf('enUS'), props.file.language.indexOf('enGB'), props.file.language.indexOf('TEXT')]), targetText)
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
                        textarea.value = curText.slice(0, -1)
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
                return grammarlyText.slice(0, -1)
            })())
        }
    }, [props.file, props.guideline, props.termBase, props.videoUrl, props.player]);

    return <div>
        <AddOn display={!!(props.file.data && props.guideline.name)}
               doubleQuotationMarksPositionLabel={doubleQuotationMarksPositionLabel}
               doubleQuotationMarksPrevNextBtn={doubleQuotationMarksPrevNextBtn}
               termBaseKeysPositionLabel={termBaseKeysPositionLabel}
               termBasePrevNext={termBasePrevNext}
               warningMsg={warningMsg} downloadBtn={downloadBtn}/>
        <div ref={spreadSheets} style={{
            flexDirection: "row",
            display: 'flex',
            width: '100%',
            height: 500,
            borderStyle: 'solid',
            borderWidth: 'thin'
        }} onClick={() => {
            if (document.getElementById('trigger').parentElement.classList[1] === 'is-open') {
                document.getElementById('trigger').click()
            }
        }}>
            <div style={{flexDirection: 'column', display: 'flex', width: '30%'}}>
                <VideoPlayer play={!!props.file.data} videoUrl={props.videoUrl} player={player}/>
                <div id={"hot-grammarly"} ref={containerGrammarly}/>
            </div>
            <div id={"hot-main"} ref={containerMain}/>
        </div>
        <MDBBtn ref={resizeBtn} color={'none'} floating tag='a'>
            <MDBIcon fas icon="chevron-down" size={'2x'} color={'dark'}/>
            <MDBIcon fas icon="chevron-up" size={'2x'} color={'dark'} style={{display: 'none'}}/>
        </MDBBtn>
    </div>
}

export default SpreadSheet
