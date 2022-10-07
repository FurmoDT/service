import {
    MDBBtn,
    MDBCollapse,
    MDBContainer,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
} from 'mdb-react-ui-kit';
import {useState} from "react";

export default function Navbar(props) {
    const [helpModal, setHelpModal] = useState(false);
    const toggleShow = () => setHelpModal(!helpModal);

    return <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
            <MDBNavbarBrand>FurmoDT-QC</MDBNavbarBrand>
            <MDBCollapse navbar>
                <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                        <MDBNavbarLink style={{cursor: "pointer"}}
                                       onClick={() => document.getElementById('trigger').click()}>
                            Setting
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink style={{cursor: "pointer"}} onClick={toggleShow}>
                            Manual
                        </MDBNavbarLink>
                        <MDBModal show={helpModal} setShow={setHelpModal} tabIndex='-1'>
                            <MDBModalDialog>
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle>Self-QC Service Manual</MDBModalTitle>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <span align={'left'}>
                                            <h5>Setting</h5>
                                            <ul>
                                                <li>File Upload(Only .srt File)</li>
                                                <li>Select & Modify Guideline (MaxLine, MaxCharacter, CPS)</li>
                                            </ul>
                                            <br/>
                                            <h5>Worksheet</h5>
                                            <dl>Left Sheet for Grammarly
                                                <ul>
                                                    <li><b>Never change Index:0 line(Critical Error Occurs)</b></li>
                                                </ul>
                                            </dl>
                                            <dl>Right Sheet for Main
                                                <ul>
                                                    <li>Insert Rows above & below</li>
                                                    <li>Remove Rows</li>
                                                </ul>
                                                <dt>Validation</dt>
                                                <ul>
                                                    <dd><b>TC</b>
                                                        <li>Empty Cell</li>
                                                        <li>prev TC_OUT &lt;= cur TC_IN &lt;= cur TC_OUT</li>
                                                    </dd>
                                                    <br/>
                                                    <dd><b>TEXT</b>
                                                        <li>Empty Cell</li>
                                                        <li>Sentence Starts with Uppercase</li>
                                                        <li>Max Line</li>
                                                        <li>Max Character</li>
                                                        <li>Multi Spaces</li>
                                                        <li>2 or 4+ dots</li>
                                                        <li>CPS</li>
                                                        <li>Double Quotation Marks Pair</li>
                                                    </dd>

                                                </ul>
                                            </dl>
                                            <dl>
                                                <dt>All Changes Between Two Sheets Interact Right Away</dt>
                                                <dd>Left Sheet Trigger- When Cursor Index & TEXT Changes</dd>
                                                <dd>Right Sheet Trigger- TEXT Changes</dd>
                                            </dl>
                                        </span>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color='secondary' size={"sm"} onClick={toggleShow}>Close</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>
                    </MDBNavbarItem>
                </MDBNavbarNav>
                <span id={'txt-downloadError'} style={{display: 'none', width: 400, fontSize: 12, color: "red", fontWeight: 500}}/>
                <MDBBtn id={'btn-download'} className={'flex-shrink-0'} size='sm' ref={props.buttonDownload} rounded={true}>DOWNLOAD</MDBBtn>
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
}
