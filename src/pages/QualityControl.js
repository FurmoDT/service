import {useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";

const QualityControl = () => {
    const [file, setFile] = useState([])
    const [data, setData] = useState([[{value: "sample"}, {value: "sample2"}]])
    return <div>
        <FileUpload file={file} setFile={(value) => {
            setFile(value)
        }}/>
        <SpreadSheet data={data} setData={(value) => {
            setData(value)
        }}/>
    </div>
};

export default QualityControl
