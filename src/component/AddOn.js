import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";

const AddOn = (props) => {
    return <div style={{
        flexDirection: 'row',
        display: props.display ? 'flex' : 'none',
        height: '100px',
        justifyContent: 'end',
        margin: '10px 10px 10px 10px'
    }}>
        <a style={{width: '150px', justifyContent: 'center', alignItems: 'center', display: 'flex'}} target={'_blank'}
           href={'https://docs.google.com/document'}>Google Docs</a>
        <div style={{width: '200px', flexDirection: 'column', display: 'flex'}}>
            <p><b>Double Quotation Marks</b></p>
            <label ref={props.doubleQuotationMarksPositionLabel}>0/0</label>
            <div ref={props.doubleQuotationMarksPrevNextBtn}>
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
            <label id={'termBasePosition'}>0/0</label>
            <div ref={props.termBasePrevNext}>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-left" size={'2x'} color={'dark'}/>
                </MDBBtn>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-right" size={'2x'} color={'dark'}/>
                </MDBBtn>
            </div>
        </div>
        <div>
            <span ref={props.warningMsg} style={{fontSize: 12, color: "red"}}>&#10240;<br/>&#10240;</span>
            <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', width: '200px'}}>
                <MDBBtn style={{height: '40px', width: '150px'}} className={'flex-shrink-0'} size='sm'
                        ref={props.downloadBtn} rounded={true}>DOWNLOAD</MDBBtn>
            </div>
        </div>
    </div>
};

export default AddOn
