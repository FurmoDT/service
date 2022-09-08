import Spreadsheet from "react-spreadsheet";

const SpreadSheet = (props) => {
    return <Spreadsheet columnLabels={[]} data={props.data} onChange={props.setData}/>;
};

export default SpreadSheet
