import {Fragment, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";
import Collapsible from 'react-collapsible';
import Guideline from "../component/Guideline";
import UrlReader from "../component/UrlReader";

const QualityControl = () => {
    const [file, setFile] = useState({})
    const [termBase, setTermBase] = useState({})
    const [videoUrl, setVideoUrl] = useState(null)
    const [guideline, setGuideline] = useState({name: null, inputMaxLine: 0, inputMaxCharacter: 0, inputCPS: 0})
    window.Buffer = window.Buffer || require("buffer").Buffer
    return <Fragment>
        <Collapsible open={true} trigger={<div id={'trigger'}/>}>
            <div style={{flexDirection: "row", display: "flex"}}>
                <div style={{flex: 1}}>
                    <FileUpload fileType={'subtitle'} setFile={(value) => {
                        setFile(value)
                    }}/>
                    <UrlReader disabled={true} fileType={'subtitle'}/>
                </div>
                <div style={{flex: 1}}>
                    <FileUpload fileType={'video'} setVideoUrl={(value) => {
                        setVideoUrl(value)
                    }}/>
                    <UrlReader disabled={true} fileType={'video'}/>
                </div>
                <div style={{flex: 1}}>
                    <FileUpload fileType={'termBase'} setTermBase={(value) => {
                        setTermBase(value)
                    }}/>
                    <UrlReader disabled={false} fileType={'termBase'} setTermBase={(value) => {
                        setTermBase(value)
                    }}/>
                </div>
            </div>
            <Guideline guideline={guideline} setGuideline={setGuideline}/>
        </Collapsible>
        <div style={{display: file.data ? '' : 'none'}}>
            <SpreadSheet file={file} termBase={termBase} videoUrl={videoUrl} guideline={guideline}/>
        </div>
    </Fragment>
};

export default QualityControl
