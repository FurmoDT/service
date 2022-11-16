import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import {useEffect} from "react";

const AddOn = (props) => {
    return <div style={{
        flexDirection: 'row',
        display: props.display ? 'flex' : 'none',
        height: '100px',
        justifyContent: 'end',
        margin: '0px 10px 0px 10px',
    }}>
        <div style={{width: '200px', flexDirection: 'column', display: 'flex'}}>
            <p><b>Double Quotation Marks</b></p>
            <div>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-left" size={'2x'} color={'dark'}/>
                </MDBBtn>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-right" size={'2x'} color={'dark'}/>
                </MDBBtn>
            </div>
        </div>
        <div style={{width: '200px', flexDirection: 'column', display: 'flex'}}>
            <p><b>Termbase</b></p>
            <div>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-left" size={'2x'} color={'dark'}/>
                </MDBBtn>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-right" size={'2x'} color={'dark'}/>
                </MDBBtn>
            </div>
        </div>
        <span id={'txt-downloadError'}
              style={{display: 'none', width: 400, fontSize: 12, color: "red", fontWeight: 500}}/>
        <div style={{alignItems: 'center', display: 'flex'}}>
            <MDBBtn style={{height: '50px', width: '150px'}} className={'flex-shrink-0'} size='sm'
                    ref={props.downloadBtn} rounded={true}>DOWNLOAD</MDBBtn>
        </div>
    </div>
};

export default AddOn
