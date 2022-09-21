import {Fragment, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";
import Collapsible from 'react-collapsible';


const QualityControl = () => {
    const [file, setFile] = useState([])
    return <Fragment>
        <Collapsible open={true} trigger={<div id={'trigger'}/>}>
            <FileUpload file={file} setFile={(value) => {
                setFile(value)
            }}/>
        </Collapsible>
        <SpreadSheet file={file}/>
    </Fragment>
};

export default QualityControl
