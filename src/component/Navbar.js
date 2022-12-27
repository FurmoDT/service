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
                                       href={'https://docs.google.com/presentation/d/1fG4wnRHlrUJz9B9T7UfV4G1ekwOAUI5afmhT161O_Y0/edit?usp=sharing '}
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
