import {Fragment, useRef, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";
import Collapsible from 'react-collapsible';
import Guideline from "../component/Guideline";
import {MDBBtn} from 'mdb-react-ui-kit';


const QualityControl = () => {
    const [file, setFile] = useState([])
    const buttonDownload = useRef(null)
    return <Fragment>
        <Collapsible open={true} trigger={<div id={'trigger'}/>}>
            <FileUpload file={file} setFile={(value) => {
                setFile(value)
            }}/>
            <Guideline/>
            <MDBBtn id={'btn-download'} size='sm' ref={buttonDownload} rounded={true} style={{margin: 10}}>DOWNLOAD</MDBBtn>
        </Collapsible>
        <SpreadSheet buttonDownload={buttonDownload} file={file}/>
    </Fragment>
};

export default QualityControl
