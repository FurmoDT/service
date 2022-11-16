import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";

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
        <div>
            <span ref={props.warningMsg} style={{fontSize: 12, color: "red", fontWeight: 500}}>&#10240;</span>
            <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', width: '300px'}}>
                <MDBBtn style={{height: '50px', width: '150px'}} className={'flex-shrink-0'} size='sm'
                        ref={props.downloadBtn} rounded={true}>DOWNLOAD</MDBBtn>
            </div>
        </div>
    </div>
};

export default AddOn
