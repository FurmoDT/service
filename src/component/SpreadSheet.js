import React, {Component} from 'react';
import styles from "../css/SpreadSheet.module.css"


class SpreadSheet extends Component {
    createSheet = () => {
        const luckysheet = window.luckysheet;
        const column = [
            {'r': 0, 'c': 0, v: {v: 'TC_IN', ht: 0}}, {'r': 0, 'c': 1, v: {v: 'TC_OUT', ht: 0}},
            {'r': 0, 'c': 2, v: {v: 'SOURCE', ht: 0}}, {'r': 0, 'c': 3, v: {v: 'TARGET', ht: 0}},
            {'r': 0, 'c': 4, v: {v: 'ERROR', ht: 0}}
        ]
        luckysheet.create({
            hook: {
                cellEditBefore: function (range) {
                    if (range[0].row_focus === 0) {
                        throw new Error('header')
                    }
                }
            },
            container: "luckysheet",
            title: this.props.file.filename ? this.props.file.filename : '',
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
                celldata: [...column, ...[{'r': 1, 'c': 0, v: {v: 'sample1', bg: '#61dafb'}}, {
                    'r': 1,
                    'c': 1,
                    v: {v: 'sample2'}
                }]],
                config: {
                    columnlen: {
                        '0': 150,
                        '1': 150,
                        '2': 600,
                        '3': 600,
                        '4': 200,
                    }
                },
                frozen: {
                    type: 'row'
                },
            }],
            column: 5,
            functionButton: '<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">download</button>',
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

    componentDidMount() {
        this.createSheet()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.file !== this.props.file) {
            this.createSheet()
        }
    }


    render() {
        return <div id="luckysheet" className={styles.sheet}></div>
    }

}

export default SpreadSheet
