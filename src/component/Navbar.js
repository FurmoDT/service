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
                                            <h4>Setting Layout</h4>
                                            <ul>
                                                <li>File Upload(*.fsp *.srt File)</li>
                                                <li>Select & Modify Guideline (MaxLine, MaxCharacter, CPS)</li>
                                            </ul>
                                            <br/>
                                            <h4>Work Layout</h4>
                                            <dl>
                                                <h6> - <b>Left</b> for Grammar Check</h6>
                                                <ul>
                                                    <li><b>Never change Index:0 line(Critical Error Occurs)</b></li>
                                                </ul>
                                            </dl>
                                            <dl>
                                                <h6> - <b>Right</b> for Main</h6>
                                                <ul>
                                                    <li>Insert/Remove Rows</li>
                                                    <li>Validation</li>
                                                    <ul>
                                                        <li>Empty Cell</li>
                                                        <li>TC In Order</li>
                                                        <li>Sentence Starts with Uppercase</li>
                                                        <li>Max Line, Max Character</li>
                                                        <li>CPS</li>
                                                        <li>2 or 4+ dots</li>
                                                        <li>Multi Spaces</li>
                                                        <li>Double Quotation Marks Pair</li>
                                                    </ul>
                                                </ul>
                                            </dl>
                                            <p><b>* Two Work Layouts Share Changes</b></p>
                                        </span>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color='secondary' size={"sm"} onClick={toggleShow}>Close</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink style={{cursor: "pointer"}}
                                       onClick={() => document.getElementById('trigger').click()}>
                            Setting
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>
                <span id={'txt-downloadError'}
                      style={{display: 'none', width: 400, fontSize: 12, color: "red", fontWeight: 500}}/>
                <MDBBtn id={'btn-download'} className={'flex-shrink-0'} size='sm' ref={props.buttonDownload}
                        rounded={true}>DOWNLOAD</MDBBtn>
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
}
