import {useEffect, useState} from "react";
import FileUpload from "../component/FileUpload";
import SpreadSheet from "../component/SpreadSheet";
import languageEncoding from "detect-file-encoding-and-language";

const QualityControl = () => {
    const [file, setFile] = useState([])
    const [data, setData] = useState([])
    useEffect(() => {
        file.forEach((value) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                let binaryStr = new ArrayBuffer(0)
                binaryStr = reader.result
                languageEncoding(value).then((fileInfo) => {
                    const enc = new TextDecoder(fileInfo.encoding);
                    console.log(enc.decode(binaryStr))
                });
            }
            reader.readAsArrayBuffer(value)
        })
    }, [file])
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
