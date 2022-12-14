import {Fragment, useCallback, useMemo, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import languageEncoding from "detect-file-encoding-and-language";
import {xml2json} from "xml-js";
import * as XLSX from 'xlsx';


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const activeStyle = {
    borderColor: '#00e676'
};

const FileUpload = (props) => {
    const subtitleFormat = useMemo(() => (['.fsp', '.srt']), [])
    const videoFormat = useMemo(() => (['.mp4']), [])
    const termBaseFormat = useMemo(() => (['.xls', '.xlsx']), [])
    const [uploadedFile, setUploadedFile] = useState(null)
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const fileFormat = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
            if (Array.prototype.concat(subtitleFormat, videoFormat, termBaseFormat).includes(fileFormat)) {
                const reader = new FileReader()
                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = () => {
                    setUploadedFile(file)
                    let binaryStr = new ArrayBuffer(0)
                    binaryStr = reader.result
                    if (subtitleFormat.includes(fileFormat)) {
                        props.setFile({...{}})
                        languageEncoding(file).then((fileInfo) => {
                            const decoder = new TextDecoder(fileInfo.encoding || 'UTF-8');
                            const str = decoder.decode(binaryStr)
                            if (file.name.endsWith('.fsp')) {
                                const data = JSON.parse(xml2json(str, {compact: false}))
                                props.setFile({
                                    'filename': file.name,
                                    'data': JSON.parse(xml2json(str, {compact: false})),
                                    'language': (() => {
                                        let lang
                                        let counter = {}
                                        lang = data.elements[0].elements[4].elements.map((v) => v.attributes.code)
                                        lang.forEach((value) => counter[value] = (counter[value] || 0) + 1)
                                        lang = lang.map((value, index, array) => {
                                            const reversedValue = array[array.length - 1 - index]
                                            if (counter[reversedValue] !== 1) {
                                                counter[reversedValue] -= 1
                                                return `${reversedValue}_${counter[value] + 1}`
                                            } else return reversedValue
                                        })
                                        return lang.reverse()
                                    })()
                                })
                            } else if (file.name.endsWith('.srt')) props.setFile({
                                'filename': file.name,
                                'data': str,
                                'language': ['TEXT']
                            })
                        });
                    } else if (videoFormat.includes(fileFormat)) {
                        props.setVideoUrl(URL.createObjectURL(file))
                    } else if (termBaseFormat.includes(fileFormat)) {
                        const termBase = {}
                        const wb = XLSX.read(binaryStr, {type: 'binary'})
                        wb.SheetNames.forEach((value, index) => {
                            const ws = wb.Sheets[value]
                            const sheetData = XLSX.utils.sheet_to_json(ws, {header: 1})
                            if (index === 0) {
                                const termBaseDictionary = {}
                                let key, values
                                sheetData.forEach((row) => {
                                    row.forEach((r) => {
                                        if (new RegExp(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g).test(r)) {
                                            if (values?.length) termBaseDictionary[key] = values
                                            key = r
                                            values = []
                                        } else values.push(r)
                                    })
                                })
                                termBase[index] = termBaseDictionary
                            } else if (index === 1) {
                                termBase[index] = sheetData
                            }
                        })
                        props.setTermBase(termBase)
                    }
                }
                reader.readAsArrayBuffer(file)
            }
        })
    }, [props, subtitleFormat, videoFormat, termBaseFormat])
    const {getRootProps, getInputProps, isFocused, isDragActive} = useDropzone({
        onDrop, accept: (() => {
            if (props.fileType === 'subtitle') return {'text/plain': subtitleFormat}
            else if (props.fileType === 'video') return {'video/mp4': videoFormat}
            else if (props.fileType === 'termBase') return {'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': termBaseFormat}
        })(), multiple: false
    })
    const style = useMemo(() => ({
        ...baseStyle, ...(isFocused ? focusedStyle : {}), ...(isDragActive ? activeStyle : {}),
    }), [isFocused, isDragActive]);
    return <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the file here ...</p> : <Fragment>
            <p>Drag & Drop here, or click to select file</p>
            <em>{(() => {
                if (props.fileType === 'subtitle') return `(${subtitleFormat.join(', ')} allowed)`
                else if (props.fileType === 'video') return `(${videoFormat.join(', ')} under 2GB allowed)`
                else if (props.fileType === 'termBase') return `(${termBaseFormat.join(', ')} allowed)`
            })()}</em>
        </Fragment>}
        {uploadedFile ? <h3>uploaded file<br/>{uploadedFile.name}</h3> :
            <h3>Upload {props.fileType.charAt(0).toUpperCase() + props.fileType.slice(1).toLowerCase()}</h3>}
    </div>
};

export default FileUpload
