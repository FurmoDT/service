import {MDBBtn, MDBIcon, MDBPopover, MDBPopoverBody} from "mdb-react-ui-kit";
import ReactTooltip from 'react-tooltip';

const AddOn = (props) => {
    return <div style={{flexDirection: 'row', alignItems: 'center', display: props.display ? 'flex' : 'none', justifyContent: 'end', margin: '10px 10px 10px 10px'}}>
        <div style={{flexDirection: 'column', alignItems: 'center', display: 'flex', margin: '-5px 5px -5px 5px', fontSize: 13}}>
            <a target={'_blank'} rel={'noreferrer'} href={'https://docs.google.com/document'}>Google Docs</a>
            <a target={'_blank'} rel={'noreferrer'} href={'https://www.superookie.com/en-grammarcheck'}>Superookie</a>
        </div>
        <div style={{height: '25px', border: 0, borderRight: 'solid', borderWidth: 'thin', margin: '0px 5px 0px 5px'}}/>
        <div style={{alignItems: 'center', display: 'flex'}}>
            <label>Double Quotation Marks</label>
            <label style={{marginLeft: '5px'}} ref={props.doubleQuotationMarksPositionLabel}>0/0</label>
            <div ref={props.doubleQuotationMarksPrevNextBtn}>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="chevron-left" color={'dark'}/>
                </MDBBtn>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="chevron-right" color={'dark'}/>
                </MDBBtn>
            </div>
        </div>
        <div style={{height: '25px', border: 0, borderRight: 'solid', borderWidth: 'thin', margin: '0px 5px 0px 5px'}}/>
        <div style={{alignItems: 'center', display: 'flex'}}>
            <MDBPopover tag={'label'} btnChildren={<label ref={props.termBasePopover}>Termbase</label>} placement='bottom' dismiss poperStyle={{backgroundColor: 'aliceblue', whiteSpace: 'pre-wrap'}}>
                <MDBPopoverBody style={{display: props.termBasePopoverText ? '' : 'none'}}>{props.termBasePopoverText}</MDBPopoverBody>
            </MDBPopover>
            <label style={{marginLeft: '5px'}} ref={props.termBaseKeysPositionLabel}>0/0</label>
            <div ref={props.termBasePrevNext}>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="chevron-left" color={'dark'}/>
                </MDBBtn>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="chevron-right" color={'dark'}/>
                </MDBBtn>
            </div>
        </div>
        <div style={{height: '25px', border: 0, borderRight: 'solid', borderWidth: 'thin', margin: '0px 5px 0px 5px'}}/>
        <MDBBtn style={{width: '130px'}} className={'flex-shrink-0'} size='sm' data-tip data-for='warningMsgTooltip'
                ref={props.downloadBtn} rounded={true}>DOWNLOAD</MDBBtn>
        {props.warningMsg ? <ReactTooltip id='warningMsgTooltip' type='error'>{props.warningMsg}</ReactTooltip> : null}
    </div>
};

export default AddOn
