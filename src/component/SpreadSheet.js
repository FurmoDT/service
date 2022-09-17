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
        if (container.current) {
            //rendering twice
            const child = document.getElementById('SpreadSheet').children
            for (let i = 0; i < child.length; i++) {
                child[i].remove()
            }
            const cellData = props.file.data ? parse(props.file.data) : []
            const hot = new Handsontable(container.current, {
                rowHeaders: true,
                colHeaders: ['TC_IN', 'TC_OUT', 'TEXT', 'ERROR'],
                data: cellData,
                colWidths: [100, 100, 600, 300],
                rowHeights: 30,
                width: 'auto',
                height: 600,
                className: 'htLeft',
                columns: [
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
            hot.addHook('beforeChange', (changes) => {
                // add event if needed
            })
            // fileDownload(props.file)
        }
    }, [props]);

    return <div id={"SpreadSheet"} ref={container}></div>;
}

export default SpreadSheet
