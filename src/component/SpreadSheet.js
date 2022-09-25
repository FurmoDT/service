import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import {useEffect, useRef} from "react";
import {parse} from "../utils/srtParser";
import {validator} from "../utils/validator";
import {fileDownload} from "../utils/fileDownload";
import * as Grammarly from "@grammarly/editor-sdk";

function customRenderer(instance, td) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    validator(arguments[2], arguments[3], arguments[5], td)
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
        const cellData = props.file.data ? parse(props.file.data) : []
        if (containerMain.current && cellData.length) {
            //rendering twice
            const child = document.getElementById('SpreadSheet').children
            for (let i = 0; i < child.length; i++) {
                child[i].remove()
            }
            hot.main = new Handsontable(containerMain.current, {
                colHeaders: ['No.', 'TC_IN', 'TC_OUT', 'TEXT', 'ERROR'],
                data: cellData,
                colWidths: [50, 100, 100, 500, 200],
                rowHeights: 30,
                width: '70%',
                height: 800,
                className: 'htLeft',
                columns: [
                    {data: 'index', className: 'htCenter'},
                    {data: 'start', className: 'htCenter'},
                    {data: 'end', className: 'htCenter'},
                    {data: 'text', renderer: customRenderer},
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
            let grammarlyText = ''
            let grammarlyColPos = 0
            let grammarlyPlugin = null
            const updateIndex = new Set()

            hot.grammarly.addHook('afterBeginEditing', (row, column) => {
                grammarly.then(r => {
                    grammarlyPlugin = r.addPlugin(
                        document.getElementById('GrammarlySheet').querySelector("textarea"),
                        {
                            documentDialect: "american",
                        },
                    )
                    const textarea = document.getElementById('GrammarlySheet').querySelector('grammarly-editor-plugin').querySelector('textarea')
                    const updateGrammarlyData = () => {
                        grammarlyColPos = textarea.selectionStart
                        const textareaValue = textarea.value
                        let lastLineBreak = textareaValue.lastIndexOf('\n', grammarlyColPos - 1)
                        let curLine = textareaValue.slice(lastLineBreak + 1, textareaValue.indexOf('\n', grammarlyColPos))
                        if (!curLine.startsWith('Index:')) {
                            while (!curLine.startsWith('Index:')) {
                                curLine = textareaValue.slice(textareaValue.lastIndexOf('\n', lastLineBreak - 1) + 1, lastLineBreak)
                                lastLineBreak = textareaValue.lastIndexOf('\n', lastLineBreak - 1)
                            }
                            updateIndex.add(curLine.split('Index:')[1])
                        }
                    }
                    document.querySelector('grammarly-editor-plugin').addEventListener('click', updateGrammarlyData)
                    document.querySelector('grammarly-editor-plugin').addEventListener('keyup', updateGrammarlyData)
                    textarea.setSelectionRange(grammarlyColPos, grammarlyColPos)
                    textarea.focus()
                });
            })
            hot.grammarly.addHook('afterChange', (changes) => {
                if (grammarlyPlugin) {
                    grammarlyPlugin.disconnect()
                }
                if (updateIndex.size) {
                    const text = changes[0][3]
                    hot.main.batchRender(() => {
                        updateIndex.forEach((value) => {
                            hot.main.setDataAtCell(Number(value) - 1, 3, text.slice(text.indexOf('\n', text.indexOf(`Index:${value}`)) + 1, text.indexOf(`Index:${Number(value) + 1}`) - 1))
                        })
                    })
                    updateIndex.clear()
                }
            })
            hot.grammarly.addHook('afterSelection', (row, column, row2, column2, preventScrolling, selectionLayerLevel) => {
                preventScrolling.value = true
            })

            cellData.map((v, index) => grammarlyText += 'Index:' + (index + 1) + '\n' + v.text + '\n')
            hot.grammarly.setDataAtCell(0, 0, grammarlyText)
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
