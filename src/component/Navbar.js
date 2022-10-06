import {
    MDBBtn,
    MDBCollapse,
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
} from 'mdb-react-ui-kit';

export default function Navbar(props) {
    return <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
            <MDBNavbarBrand>FurmoDT</MDBNavbarBrand>
            <MDBCollapse navbar>
                <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                        <MDBNavbarLink active={true}>
                            QC
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink style={{cursor: "pointer"}}
                                       onClick={() => document.getElementById('trigger').click()}>
                            Setting
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>
                <span id={'txt-downloadError'} style={{display: 'none', width: 400, fontSize: 12, color: "red", fontWeight: 500}}/>
                <MDBBtn id={'btn-download'} className={'flex-shrink-0'} size='sm' ref={props.buttonDownload} rounded={true}>DOWNLOAD</MDBBtn>
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
}
