import {Fragment, useEffect, useRef, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";
import Collapsible from 'react-collapsible';
import Guideline from "../component/Guideline";
import {MDBBtn, MDBIcon} from 'mdb-react-ui-kit';
import VideoPlayer from "../component/VideoPlayer";


const QualityControl = (props) => {
    const [file, setFile] = useState({})
    const [videoUrl, setVideoUrl] = useState(null)
    const [guideline, setGuideline] = useState({name: null, inputMaxLine: 0, inputMaxCharacter: 0, inputCPS: 0})
    const player = useRef(null)
    window.Buffer = window.Buffer || require("buffer").Buffer;
    useEffect(() => {
        props.buttonDownload.current.style.display = file.data && guideline.name ? '' : 'none'
    }, [props.buttonDownload, file, guideline])
    return <Fragment>
        <Collapsible open={true} trigger={<div id={'trigger'}/>}>
            <div style={{flexDirection: "row", display: "flex"}}>
                <FileUpload fileType={'subtitle'} file={file} setFile={(value) => {
                    setFile(value)
                }}/>
                <FileUpload fileType={'video'} file={file} setFile={(value) => {
                    setFile(value)
                }}/>
                <FileUpload fileType={'termBase'} file={file} setFile={(value) => {
                    setFile(value)
                }}/>
            </div>
            <Guideline guideline={guideline} setGuideline={setGuideline}/>
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
