import FileUpload from "../component/FileUpload";
import {useState} from "react";

const QualityControl = () => {
    const [file, setFile] = useState('')
    return <div>
        <FileUpload file={file} setFile={(value) => {
            setFile(value)
        }}/>
    </div>
};

export default QualityControl
