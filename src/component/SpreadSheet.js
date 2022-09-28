import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import {useEffect, useRef} from "react";
import {parse} from "../utils/srtParser";
import {tcValidator, textValidator} from "../utils/validator";
import {fileDownload} from "../utils/fileDownload";
import * as Grammarly from "@grammarly/editor-sdk";

let cellData = []

function tcRenderer(instance, td) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    tcValidator(arguments[2], arguments[3], arguments[5], td, instance, cellData)
}

function textRenderer(instance, td) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    textValidator(arguments[2], arguments[3], arguments[5], td, instance, cellData)
}

const SpreadSheet = (props) => {
    const containerMain = useRef(null);
    const containerGrammarly = useRef(null);
    useEffect(() => {
        const hot = {main: null, grammarly: null}
        const setGrammarly = async () => {
            return await Grammarly.init("client_3a8upV1a1GuH7TqFpd98Sn");
        }
        const grammarly = setGrammarly()
        cellData = props.file.data ? parse(props.file.data) : []
        props.buttonDownload.current.style.display = props.file.data ? '' : 'none'
        props.buttonDownload.current.onclick = () => {
            const Unchecked = []
            const Violated = []
            cellData.forEach((value, index) => {
                cellData[index]['index'] = index + 1
                if (value['validated'] === undefined) {
                    Unchecked.push(index + 1)
                } else if (value['validated'].size) {
                    Violated.push(index + 1)
                }
            })
            if (Unchecked.length) {
                alert('Line Unchecked: ' + Unchecked.toString())
            } else if (Violated.length) {
                alert('QC Violation: ' + Violated.toString())
            } else {
                fileDownload(cellData, props.file.filename)
            }
        }
        if (containerMain.current && cellData.length) {
            //rendering twice
            const child = document.getElementById('SpreadSheet').children
            for (let i = 0; i < child.length; i++) {
                child[i].remove()
            }
            hot.main = new Handsontable(containerMain.current, {
                colHeaders: ['TC_IN', 'TC_OUT', 'TEXT', 'ERROR'],
                data: cellData,
                colWidths: [100, 100, 500, 200],
                rowHeaders: true,
                rowHeights: 30,
                width: '70%',
                height: 800,
                className: 'htLeft',
                columns: [
                    {data: 'start', className: 'htCenter', renderer: tcRenderer},
                    {data: 'end', className: 'htCenter', renderer: tcRenderer},
                    {data: 'text', renderer: textRenderer},
                    {data: 'error', className: 'htCenter'},
                ],
                contextMenu: {
                    items: {
                        'row_above': {},
                        'row_below': {},
                        'remove_row': {},
                    }
                },
                licenseKey: 'non-commercial-and-evaluation'
            })
            let grammarlyPlugin = null

            hot.main.addHook('afterBeginEditing', (row, column) => {
                grammarly.then(r => {
                    grammarlyPlugin = r.addPlugin(
                        document.getElementById('SpreadSheet').querySelector("textarea"),
                        {
                            documentDialect: "american",
                        },
                    )
                    const textarea = document.getElementById('SpreadSheet').querySelector('grammarly-editor-plugin').querySelector('textarea')
                    textarea.focus()
                });
            })
            hot.main.addHook('afterChange', (changes) => {
                if (grammarlyPlugin) {
                    grammarlyPlugin.disconnect()
                }
            })
            hot.main.addHook('afterGetRowHeader', (row) => {
                if (cellData[row]['validated'] === undefined) {
                    cellData[row]['validated'] = new Set()
                }
            })
            for (let i = 0; i < hot.main.countRenderedRows() - 2; i++) { // default rendered rows
                cellData[i]['validated'] = new Set()
            }
        }
        if (containerGrammarly.current && cellData.length) {
            //rendering twice
            const child = document.getElementById('GrammarlySheet').children
            for (let i = 0; i < child.length; i++) {
                child[i].remove()
            }
            hot.grammarly = new Handsontable(containerGrammarly.current, {
                colHeaders: ['Grammarly'],
                colWidths: 500,
                rowHeights: 30,
                width: '30%',
                height: 800,
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
                            hot.main.setDataAtCell(curIndex - 1, 2, text.slice(text.indexOf('\n', text.indexOf(`Index:${curIndex}`)) + 1, text.indexOf(`Index:${curIndex + 1}`) - 1))
                            hot.main.scrollViewportTo(curIndex - 1)
                        }
                        curIndex = idx
                    }
                }
            }
            hot.grammarly.addHook('afterBeginEditing', (row, column) => {
                grammarly.then(r => {
                    grammarlyPlugin = r.addPlugin(
                        document.getElementById('GrammarlySheet').querySelector("textarea"),
                        {
                            documentDialect: "american",
                        },
                    )
                    const textarea = document.getElementById('GrammarlySheet').querySelector('grammarly-editor-plugin').querySelector('textarea')
                    let curText = ''
                    cellData.map((v, index) => curText += 'Index:' + (index + 1) + '\n' + v.text + '\n')
                    if (textarea.value !== curText) {
                        textarea.value = curText
                    }
                    const updateGrammarlyData = () => {
                        grammarlyColPos = textarea.selectionStart
                        updateMainText(textarea.value)
                    }
                    document.getElementById('GrammarlySheet').querySelector('grammarly-editor-plugin').addEventListener('click', updateGrammarlyData)
                    document.getElementById('GrammarlySheet').querySelector('grammarly-editor-plugin').addEventListener('keyup', updateGrammarlyData)
                    textarea.setSelectionRange(grammarlyColPos, grammarlyColPos)
                    textarea.focus()
                });
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

    return <div style={{flexDirection: "row", display: "flex"}}>
        <div id={"GrammarlySheet"} ref={containerGrammarly} style={{borderStyle: 'solid', borderWidth: 'thin'}}
             onFocus={() => {
                 if (document.getElementById('trigger').parentElement.classList[1] === 'is-open') {
                     document.getElementById('trigger').click()
                 }
             }}/>
        <div id={"SpreadSheet"} ref={containerMain} style={{borderStyle: 'solid', borderWidth: 'thin'}}
             onFocus={() => {
                 if (document.getElementById('trigger').parentElement.classList[1] === 'is-open') {
                     document.getElementById('trigger').click()
                 }
             }}/>
    </div>
}

export default SpreadSheet
