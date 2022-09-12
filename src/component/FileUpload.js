import {Fragment, useCallback, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'
import languageEncoding from "detect-file-encoding-and-language";


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
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            if (file.name.endsWith('.srt')) {
                const reader = new FileReader()

                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = () => {
                    // Do whatever you want with the file contents
                    let binaryStr = new ArrayBuffer(0)
                    binaryStr = reader.result
                    languageEncoding(file).then((fileInfo) => {
                        const decoder = new TextDecoder(fileInfo.encoding);
                        const str = decoder.decode(binaryStr)
                        props.setFile({'filename': file.name, 'data': str})
                    });
                }
                reader.readAsArrayBuffer(file)
            }
        })
    }, [props])
    const {getRootProps, getInputProps, isFocused, isDragActive} = useDropzone({
        onDrop,
        accept: {'text/plain': ['.srt']},
        multiple: false
    })
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragActive ? activeStyle : {}),
    }), [
        isFocused,
        isDragActive
    ]);
    return (
        <div className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the file here ...</p> :
                        <Fragment>
                            <p>Drag & Drop here, or click to select file</p>
                            <em>(Only .srt will be accepted)</em>
                        </Fragment>
                }
                {
                    props.file ?
                        <h3>uploaded file<br/>{props.file.filename}</h3> : null
                }
            </div>
        </div>
    )
};

export default FileUpload
