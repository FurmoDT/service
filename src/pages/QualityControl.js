import {Fragment, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";

const QualityControl = () => {
    const [file, setFile] = useState([])
    return <Fragment>
        <FileUpload file={file} setFile={(value) => {
            setFile(value)
        }}/>
        <SpreadSheet file={file}/>
    </Fragment>
};

export default QualityControl
