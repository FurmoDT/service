import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import {useEffect, useRef} from "react";
import {parse} from "../utils/srtParser";
import {validator} from "../utils/validator";
import {fileDownload} from "../utils/fileDownload";

function customRenderer(instance, td) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    validator(arguments[2], arguments[3], arguments[5], td)
}

const SpreadSheet = (props) => {
    const container = useRef(null);
    useEffect(() => {
        const cellData = props.file.data ? parse(props.file.data) : []
        if (container.current && cellData.length) {
            //rendering twice
            const child = document.getElementById('SpreadSheet').children
            for (let i = 0; i < child.length; i++) {
                child[i].remove()
            }
            const hot = new Handsontable(container.current, {
                colHeaders: ['No.', 'TC_IN', 'TC_OUT', 'TEXT', 'GRAMMARLY'],
                data: cellData,
                colWidths: [50, 100, 100, 500, 500],
                rowHeights: 30,
                width: 'auto',
                height: 600,
                className: 'htLeft',
                columns: [
                    {data: 'index', className: 'htCenter'},
                    {data: 'start', className: 'htCenter'},
                    {data: 'end', className: 'htCenter'},
                    {data: 'text', renderer: customRenderer},
                    {data: 'error'},
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
            const merge = () => {
                return {mergeCells: [{row: 0, col: 4, rowspan: hot.countRows(), colspan: 1}]}
            }
            let text = ''

            hot.addHook('afterCreateRow', () => {
                hot.updateSettings(merge())
            })
            hot.addHook('afterBeginEditing', (row, column) => {
                // add grammarly
            })
            hot.addHook('afterChange', () => {
                // add grammarly
            })
            hot.addHook('afterSelection', (row, column, row2, column2, preventScrolling, selectionLayerLevel) => {
                preventScrolling.value = true
            })

            cellData.map((v) => text += v.text + '\n\n')
            hot.setDataAtCell(0, 4, text)
            hot.updateSettings(merge())
            // fileDownload(props.file)
        }
    }, [props]);

    return <div id={"SpreadSheet"} ref={container}></div>;
}

export default SpreadSheet
