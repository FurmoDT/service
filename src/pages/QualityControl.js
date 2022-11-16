import {Fragment, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";
import Collapsible from 'react-collapsible';
import Guideline from "../component/Guideline";


const QualityControl = () => {
    const [file, setFile] = useState({})
    const [videoUrl, setVideoUrl] = useState('blob')
    const [guideline, setGuideline] = useState({name: null, inputMaxLine: 0, inputMaxCharacter: 0, inputCPS: 0})
    window.Buffer = window.Buffer || require("buffer").Buffer;
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
            <SpreadSheet file={file} videoUrl={videoUrl} guideline={guideline}/>
        </div>
    </Fragment>
};

export default QualityControl
