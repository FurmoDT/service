import {Fragment, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";
import Collapsible from 'react-collapsible';
import Guideline from "../component/Guideline";
import {MDBBtn, MDBIcon} from 'mdb-react-ui-kit';
import VideoPlayer from "../component/VideoPlayer";


const QualityControl = (props) => {
    const [file, setFile] = useState([])
    const [guideline, setGuideline] = useState({})
    return <Fragment>
        <Collapsible open={true} trigger={<div id={'trigger'}/>}>
            <FileUpload file={file} setFile={(value) => {
                setFile(value)
            }}/>
            <Guideline guideline={guideline} setGuideline={setGuideline}/>
            <MDBBtn>Video</MDBBtn>
            <MDBBtn>Grammar Check</MDBBtn>
        </Collapsible>
        <div style={{flexDirection: 'row', display: 'flex'}}>
            <VideoPlayer/>
            <SpreadSheet buttonDownload={props.buttonDownload} file={file} guideline={guideline}/>
        </div>
        <MDBBtn id={'btn-resize'} color={'none'} floating tag='a'>
            <MDBIcon fas icon="chevron-down" size={'2x'} color={'dark'}/>
            <MDBIcon fas icon="chevron-up" size={'2x'} color={'dark'} style={{display: 'none'}}/>
        </MDBBtn>
    </Fragment>
};

export default QualityControl
