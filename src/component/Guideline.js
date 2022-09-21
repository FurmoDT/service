import {MDBContainer, MDBRow, MDBCol, MDBCheckbox} from 'mdb-react-ui-kit';

const Guideline = () => {
    return <MDBContainer>
        <MDBRow>
            <MDBCol size='md'>KBS World</MDBCol>
            <MDBCol size='md'>GUIDELINE2</MDBCol>
            <MDBCol size='md'>GUIDELINE3</MDBCol>
        </MDBRow>
        <MDBCheckbox name='inlineCheck' id='inlineCheckbox1' value='option1' label='check 1' inline/>
        <MDBCheckbox name='inlineCheck' id='inlineCheckbox2' value='option2' label='check 2' inline/>
    </MDBContainer>
}

export default Guideline
