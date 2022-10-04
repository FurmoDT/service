import {Fragment, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";
import Collapsible from 'react-collapsible';
import Guideline from "../component/Guideline";
import {MDBBtn, MDBIcon} from 'mdb-react-ui-kit';


const QualityControl = (props) => {
    const [file, setFile] = useState([])
    const [guideline, setGuideline] = useState({})
    return <Fragment>
        <Collapsible open={true} trigger={<div id={'trigger'}/>}>
            <FileUpload file={file} setFile={(value) => {
                setFile(value)
            }}/>
            <Guideline guideline={guideline} setGuideline={setGuideline}/>
        </Collapsible>
        <SpreadSheet buttonDownload={props.buttonDownload} file={file} guideline={guideline}/>
        <MDBBtn id={'btn-resize'} color={'none'} floating tag='a'>
            <MDBIcon fas icon="chevron-down" size={'2x'} color={'dark'}/>
            <MDBIcon fas icon="chevron-up" size={'2x'} color={'dark'} style={{display: 'none'}}/>
        </MDBBtn>
    </Fragment>
};

export default QualityControl
