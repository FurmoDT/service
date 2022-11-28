import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import ReactTooltip from 'react-tooltip';

const AddOn = (props) => {
    return <div style={{
        flexDirection: 'row',
        alignItems: 'center',
        display: props.display ? 'flex' : 'none',
        justifyContent: 'end',
        margin: '10px 10px 10px 10px'
    }}>
        <a target={'_blank'} rel={'noreferrer noopenner'} href={'https://docs.google.com/document'}>Google Docs</a>
        <div style={{height: '25px', border: 0, borderRight: 'solid', borderWidth: 'thin', margin: '0px 5px 0px 5px'}}/>
        <div style={{alignItems: 'center', display: 'flex'}}>
            <label><b>Double Quotation Marks</b></label>
            <label style={{marginLeft: '5px'}} ref={props.doubleQuotationMarksPositionLabel}>0/0</label>
            <div ref={props.doubleQuotationMarksPrevNextBtn}>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-left" size={'2x'} color={'dark'}/>
                </MDBBtn>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-right" size={'2x'} color={'dark'}/>
                </MDBBtn>
            </div>
        </div>
        <div style={{height: '25px', border: 0, borderRight: 'solid', borderWidth: 'thin', margin: '0px 5px 0px 5px'}}/>
        <div style={{alignItems: 'center', display: 'flex'}}>
            <label><b>Termbase</b></label>
            <label style={{marginLeft: '5px'}} ref={props.termBaseKeysPositionLabel}>0/0</label>
            <div ref={props.termBasePrevNext}>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-left" size={'2x'} color={'dark'}/>
                </MDBBtn>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-right" size={'2x'} color={'dark'}/>
                </MDBBtn>
            </div>
        </div>
        <div style={{height: '25px', border: 0, borderRight: 'solid', borderWidth: 'thin', margin: '0px 5px 0px 5px'}}/>
        <MDBBtn style={{width: '130px'}} className={'flex-shrink-0'} size='sm' data-tip data-for='warningMsgTooltip'
                ref={props.downloadBtn} rounded={true}>DOWNLOAD</MDBBtn>
        <ReactTooltip id='warningMsgTooltip' type='error'>{props.warningMsg}</ReactTooltip>
    </div>
};

export default AddOn
