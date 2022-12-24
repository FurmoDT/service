import {MDBBtn, MDBInputGroup} from 'mdb-react-ui-kit';
import {useCallback, useRef} from "react";

export default function UrlReader(props) {
    const fileUrlInput = useRef(null)
    const enterClickEvent = useCallback((event) => {
        if (props.fileType === 'subtitle') {

        } else if (props.fileType === 'video') {

        } else if (props.fileType === 'termBase' && fileUrlInput.current.value) {
            // read Google SpreadSheet and props.setTermBase(value)
        }
    }, [])
    const clearClickEvent = useCallback((event) => {
        fileUrlInput.current.value = ''
    }, [])

    return <div>
        <MDBInputGroup>
            <input className='form-control' ref={fileUrlInput}
                   placeholder={`${props.fileType.charAt(0).toUpperCase() + props.fileType.slice(1).toLowerCase()} URL`}
                   disabled={props.disabled} type={'url'}/>
            <MDBBtn disabled={props.disabled} onClick={enterClickEvent}>ENTER</MDBBtn>
            <MDBBtn disabled={props.disabled} onClick={clearClickEvent}>CLEAR</MDBBtn>
        </MDBInputGroup>
    </div>
}
