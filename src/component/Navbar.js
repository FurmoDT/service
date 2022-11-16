import {
    MDBCollapse,
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
} from 'mdb-react-ui-kit';

export default function Navbar() {
    return <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
            <MDBNavbarBrand>FurmoDT-QC</MDBNavbarBrand>
            <MDBCollapse navbar>
                <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                    <MDBNavbarItem>
                        <MDBNavbarLink style={{cursor: "pointer"}}
                                       href={'https://docs.google.com/presentation/d/1ufx5PEX-QEAwfSYF2Y1qrY1123BJRHduZqSwqD0V3LU/edit#slide=id.g167e2001608_0_7'}
                                       target={'_blank'}>
                            Manual
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink style={{cursor: "pointer"}}
                                       onClick={() => document.getElementById('trigger').click()}>
                            Setting
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
}
