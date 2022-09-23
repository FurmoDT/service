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
    const container = useRef(null);
    useEffect(() => {
        const setGrammarly = async () => {
            return await Grammarly.init("client_3a8upV1a1GuH7TqFpd98Sn");
        }
        const grammarly = setGrammarly()
        const cellData = props.file.data ? parse(props.file.data) : []
        if (container.current && cellData.length) {
            //rendering twice
            const child = document.getElementById('SpreadSheet').children
            for (let i = 0; i < child.length; i++) {
                child[i].remove()
            }
            const hot = new Handsontable(container.current, {
                colHeaders: ['No.', 'TC_IN', 'TC_OUT', 'GRAMMARLY', 'TEXT', 'ERROR'],
                data: cellData,
                colWidths: [50, 100, 100, 500, 500, 200],
                rowHeights: 30,
                width: 'auto',
                height: 800,
                className: 'htLeft',
                hiddenColumns: {indicators: true},
                columns: [
                    {data: 'index', className: 'htCenter'},
                    {data: 'start', className: 'htCenter'},
                    {data: 'end', className: 'htCenter'},
                    {data: 'grammarly'},
                    {data: 'text', renderer: customRenderer},
                    {data: 'error', className: 'htCenter'},
                ],
                contextMenu: {
                    items: {
                        'row_above': {},
                        'row_below': {},
                        'remove_row': {},
                        'hidden_columns_show': {},
                        'hidden_columns_hide': {},
                    }
                },
                licenseKey: 'non-commercial-and-evaluation'
            })
            const merge = () => {
                return {mergeCells: [{row: 0, col: 3, rowspan: hot.countRows(), colspan: 1}]}
            }
            let grammarlyText = ''
            let grammarlyPlugin = null
            let grammarlyColPos = 0
            const updateIndex = new Set()

            hot.addHook('afterCreateRow', () => {
                hot.updateSettings(merge())
            })
            hot.addHook('afterBeginEditing', (row, column) => {
                grammarly.then(r => {
                    grammarlyPlugin = r.addPlugin(
                        document.querySelector("textarea"),
                        {
                            documentDialect: "american",
                        },
                    )
                    const textarea = document.querySelector('grammarly-editor-plugin').querySelector('textarea')
                    const updateGrammarlyData = () => {
                        if (column === 3) {
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
                    }
                    document.querySelector('grammarly-editor-plugin').addEventListener('click', updateGrammarlyData)
                    document.querySelector('grammarly-editor-plugin').addEventListener('keyup', updateGrammarlyData)
                    if (column === 3) {
                        textarea.setSelectionRange(grammarlyColPos, grammarlyColPos)
                    }
                    textarea.focus()
                });
            })
            hot.addHook('afterChange', (changes) => {
                if (grammarlyPlugin) {
                    grammarlyPlugin.disconnect()
                }
                if (changes[0][1] === 'grammarly' && updateIndex.size) {
                    const text = changes[0][3]
                    hot.batchRender(() => {
                        updateIndex.forEach((value) => {
                            hot.setDataAtCell(Number(value) - 1, 4, text.slice(text.indexOf('\n', text.indexOf(`Index:${value}`)) + 1, text.indexOf(`Index:${Number(value) + 1}`) - 1))
                        })
                    })
                    updateIndex.clear()
                }
            })
            hot.addHook('afterSelection', (row, column, row2, column2, preventScrolling, selectionLayerLevel) => {
                if (column === 3) {
                    preventScrolling.value = true
                }
            })

            cellData.map((v, index) => grammarlyText += 'Index:' + (index + 1) + '\n' + v.text + '\n')
            hot.setDataAtCell(0, 3, grammarlyText)
            hot.updateSettings(merge())
            // fileDownload(props.file)
        }
    }, [props]);

    return <div id={"SpreadSheet"} ref={container}
                style={{borderStyle: 'solid', borderWidth: 'thin', overflow: "hidden"}} onFocus={() => {
        if (document.getElementById('trigger').parentElement.classList[1] === 'is-open') {
            document.getElementById('trigger').click()
        }
    }}/>
}

export default SpreadSheet
