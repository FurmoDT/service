import React, {useState} from 'react';
import {
    MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBCollapse,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {FaBars} from "react-icons/fa";

export default function Navbar() {
    const [showBasic, setShowBasic] = useState(false);

    return <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
            <MDBNavbarBrand>FurmoDT</MDBNavbarBrand>
            <MDBNavbarToggler type='button' onClick={() => setShowBasic(!showBasic)}>
                <FaBars/>
            </MDBNavbarToggler>
            <MDBCollapse navbar show={showBasic}>
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
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
}
