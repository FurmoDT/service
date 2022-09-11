import React, {Component} from 'react';
import styles from "../css/SpreadSheet.module.css"

class SpreadSheet extends Component {
    componentDidMount() {
        const luckysheet = window.luckysheet;
        luckysheet.create({
            container: "luckysheet",
            title: 'sheet sample',
            showtoolbar: false,
            showsheetbar: false,
            showstatisticBarConfig: {
                count: false, // Count bar
                view: false, // Print view
                zoom: true // Zoom
            },
            enableAddRow: false,
            // data: [{celldata: [{'r': 0, 'c': 0, v: {v: 'qwe', bg: '#61dafb'}}]}],
            row: 5,
            column: 10
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

    render() {
        return <div id="luckysheet" className={styles.sheet}></div>
    }

}

export default SpreadSheet
