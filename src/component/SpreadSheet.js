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
                fixedColumnsStart: 3,
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
            let text = ''
            let plugin = null
            let grammarlyColPos = 0

            hot.addHook('afterCreateRow', () => {
                hot.updateSettings(merge())
            })
            hot.addHook('afterBeginEditing', (row, column) => {
                grammarly.then(r => {
                    plugin = r.addPlugin(
                        document.querySelector("textarea"),
                        {
                            documentDialect: "american",
                        },
                    )
                    const textarea = document.querySelector('grammarly-editor-plugin').querySelector('textarea')
                    textarea.onmouseup = textarea.onkeyup = () => {
                        grammarlyColPos = textarea.selectionStart
                    }
                    textarea.setSelectionRange(grammarlyColPos, grammarlyColPos)
                    textarea.focus()
                });
            })
            hot.addHook('afterChange', () => {
                if (plugin) {
                    plugin.disconnect()
                }
            })
            hot.addHook('afterSelection', (row, column, row2, column2, preventScrolling, selectionLayerLevel) => {
                if (column === 3) {
                    preventScrolling.value = true
                }
            })

            cellData.map((v) => text += v.text + '\n\n')
            hot.setDataAtCell(0, 3, text)
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
