import {Fragment, useEffect, useRef, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";
import Collapsible from 'react-collapsible';
import Guideline from "../component/Guideline";
import {MDBBtn, MDBBtnGroup, MDBIcon, MDBRadio} from 'mdb-react-ui-kit';
import VideoPlayer from "../component/VideoPlayer";


const QualityControl = (props) => {
    const [file, setFile] = useState({})
    const [videoUrl, setVideoUrl] = useState(null)
    const [guideline, setGuideline] = useState({})
    const videoMode = useRef(null)
    const player = useRef(null)
    useEffect(() => {
        if (file) {
            props.buttonDownload.current.style.display = file.data ? '' : 'none'
            videoMode.current.style.display = file.data ? '' : 'none'
        }
    }, [props.buttonDownload, file])
    return <Fragment>
        <Collapsible open={true} trigger={<div id={'trigger'}/>}>
            <FileUpload file={file} setFile={(value) => {
                setFile(value)
            }}/>
            <Guideline guideline={guideline} setGuideline={setGuideline}/>
            <MDBBtnGroup ref={videoMode} style={{marginBottom: 10}}>
                <MDBRadio btn btnColor='secondary' id='btn-radio' name='options' wrapperTag='span' label='Grammar Check'
                          onClick={() => {
                              document.getElementById('content-videoPlayer').style.display = 'none'
                              document.getElementById('hot-grammarly').style.display = ''
                              document.getElementById('spreadSheets').style.width = '100%'
                              document.getElementById('hot-main').style.width = '70%'
                          }} defaultChecked/>
                <MDBRadio btn btnColor='secondary' id='btn-radio2' name='options' wrapperTag='span' label='Video'
                          onClick={() => {
                              document.getElementById('content-videoPlayer').style.display = ''
                              document.getElementById('hot-grammarly').style.display = 'none'
                              document.getElementById('spreadSheets').style.width = '70%'
                              document.getElementById('hot-main').style.width = '100%'
                          }}/>
            </MDBBtnGroup>
        </Collapsible>
        <div style={{flexDirection: 'row', display: 'flex'}}>
            <VideoPlayer videoUrl={videoUrl} player={player}/>
            <SpreadSheet player={player} buttonDownload={props.buttonDownload} file={file} guideline={guideline}/>
        </div>
        <MDBBtn id={'btn-resize'} color={'none'} floating tag='a'>
            <MDBIcon fas icon="chevron-down" size={'2x'} color={'dark'}/>
            <MDBIcon fas icon="chevron-up" size={'2x'} color={'dark'} style={{display: 'none'}}/>
        </MDBBtn>
    </Fragment>
};

export default QualityControl
