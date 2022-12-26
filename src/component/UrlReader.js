import {MDBBtn, MDBInputGroup} from 'mdb-react-ui-kit';
import {useCallback, useRef} from "react";
import {googleSheetReader} from "../utils/xlsxReader";


const UrlReader = (props) => {
    const fileUrlInput = useRef(null)
    const enterClickEvent = useCallback((event) => {
        if (props.fileType === 'subtitle') {

        } else if (props.fileType === 'video') {

        } else if (props.fileType === 'termBase' && fileUrlInput.current.value) {
            googleSheetReader(fileUrlInput.current.value)
                .then((value) => {
                    props.setTermBase(value.termBase)
                    fileUrlInput.current.value = value.name
                    fileUrlInput.current.disabled = true
                    event.target.disabled = true
                }).catch(() => {
                fileUrlInput.current.value = ''
            })
        }
    }, [])
    const clearClickEvent = useCallback((event) => {
        if (props.fileType === 'subtitle') {

        } else if (props.fileType === 'video') {

        } else if (props.fileType === 'termBase') {
            fileUrlInput.current.value = ''
            fileUrlInput.current.disabled = false
            event.target.parentNode.children[1].disabled = false
            props.setTermBase({})
        }
    }, [])

    return <div style={{margin: '0px 5px 0px 5px'}}>
        <MDBInputGroup>
            <input className='form-control' ref={fileUrlInput}
                   placeholder={`${props.fileType.charAt(0).toUpperCase() + props.fileType.slice(1).toLowerCase()} URL`}
                   disabled={props.disabled} type={'url'}/>
            <MDBBtn disabled={props.disabled} onClick={enterClickEvent}>ENTER</MDBBtn>
            <MDBBtn disabled={props.disabled} onClick={clearClickEvent}>CLEAR</MDBBtn>
        </MDBInputGroup>
    </div>
}

export default UrlReader
