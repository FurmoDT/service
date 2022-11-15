import {Fragment, useEffect, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";
import Collapsible from 'react-collapsible';
import Guideline from "../component/Guideline";
import {MDBBtn, MDBIcon} from 'mdb-react-ui-kit';
import Finder from "../component/Finder";


const QualityControl = (props) => {
    const [file, setFile] = useState({})
    const [videoUrl, setVideoUrl] = useState('blob')
    const [guideline, setGuideline] = useState({name: null, inputMaxLine: 0, inputMaxCharacter: 0, inputCPS: 0})
    window.Buffer = window.Buffer || require("buffer").Buffer;
    useEffect(() => {
        props.buttonDownload.current.style.display = file.data && guideline.name ? '' : 'none'
    }, [props.buttonDownload, file, guideline])
    return <Fragment>
        <Collapsible open={true} trigger={<div id={'trigger'}/>}>
            <div style={{flexDirection: "row", display: "flex"}}>
                <FileUpload fileType={'subtitle'} setFile={(value) => {
                    setFile(value)
                }}/>
                <FileUpload fileType={'video'} setVideoUrl={(value) => {
                    setVideoUrl(value)
                }}/>
                <FileUpload fileType={'termBase'}/>
            </div>
            <Guideline guideline={guideline} setGuideline={setGuideline}/>
        </Collapsible>
        <div style={{display: file.data ? '' : 'none'}}>
            <SpreadSheet buttonDownload={props.buttonDownload} file={file} videoUrl={videoUrl} guideline={guideline}/>
            <MDBBtn id={'btn-resize'} color={'none'} floating tag='a'>
                <MDBIcon fas icon="chevron-down" size={'2x'} color={'dark'}/>
                <MDBIcon fas icon="chevron-up" size={'2x'} color={'dark'} style={{display: 'none'}}/>
            </MDBBtn>
            <Finder/>
        </div>
    </Fragment>
};

export default QualityControl
