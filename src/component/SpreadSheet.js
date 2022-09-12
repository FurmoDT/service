import React, {Component} from 'react';
import styles from "../css/SpreadSheet.module.css"


class SpreadSheet extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.file !== this.props.file) {
            const luckysheet = window.luckysheet;
            luckysheet.create({
                container: "luckysheet",
                title: this.props.file.filename,
                showtoolbar: false,
                showsheetbar: false,
                sheetFormulaBar: false,
                showstatisticBarConfig: {
                    count: false, // Count bar
                    view: false, // Print view
                    zoom: true // Zoom
                },
                cellRightClickConfig: {
                    copyAs: false, // copy as
                    deleteRow: false, // delete the selected row
                    deleteColumn: false, // delete the selected column
                    deleteCell: false, // delete cell
                    clear: false, // clear content
                    matrix: false, // matrix operation selection
                    sort: false, // sort selection
                    filter: false, // filter selection
                    chart: false, // chart generation
                    image: false, // insert picture
                    link: false, // insert link
                    data: false, // data verification
                    cellFormat: false // Set cell format
                },
                enableAddRow: false,
                data: [{
                    index: 0,
                    defaultRowHeight: 30,
                    config: {
                        columnlen: {
                            '0': 20
                        }
                    },
                    celldata: [{'r': 0, 'c': 0, v: {v: 'sample1', bg: '#61dafb'}}, {'r': 0, 'c': 1, v: {v: 'sample2'}}]
                }],
                row: 10,
                column: 10,
                // functionButton: '<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">download</button> <button id="" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">email</button>',
            });
            document.getElementById('luckysheet_info_detail_title').remove()
            document.getElementById('luckysheet_info_detail_update').remove()
            document.getElementById('luckysheet_info_detail_save').remove()
            const logo = document.getElementById('luckysheet_info_detail').getElementsByClassName('luckysheet-share-logo')
            for (let i = 0; logo.length; i++) {
                logo[i].remove()
            }
            document.getElementById('luckysheet_info_detail_input').style.textAlign = 'center'
        }
    }


    render() {
        return <div id="luckysheet" className={styles.sheet}></div>
    }

}

export default SpreadSheet
