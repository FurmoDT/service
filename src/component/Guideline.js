import {MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';

const Guideline = (props) => {
    const checkBoxEvent = (e) => {
        const samples = document.getElementsByClassName('form-check-input')
        for (let i = 0; i < samples.length; i++) {
            if (samples[i] !== e.target) samples[i].checked = false
            else {
                if (e.target.checked) {
                    if (e.target.id === 'kbsWorld') {
                        document.getElementById('inputMaxLine').value = 1
                        document.getElementById('inputMaxCharacter').value = 55
                        document.getElementById('inputCPS').value = 30
                    } else if (e.target.id === 'sample') {
                        document.getElementById('inputMaxLine').value = 3
                        document.getElementById('inputMaxCharacter').value = 60
                        document.getElementById('inputCPS').value = 17
                    } else if (e.target.id === 'sample2') {
                        document.getElementById('inputMaxLine').value = 1
                        document.getElementById('inputMaxCharacter').value = 60
                        document.getElementById('inputCPS').value = 25
                    }
                    props.setGuideline((prevState) => ({
                        ...prevState, ...{
                            inputMaxLine: Number(document.getElementById('inputMaxLine').value),
                            inputMaxCharacter: Number(document.getElementById('inputMaxCharacter').value),
                            inputCPS: Number(document.getElementById('inputCPS').value)
                        }
                    }))
                }
            }
        }
    }
    const numberInputEvent = (e) => {
        props.setGuideline((prevState) => ({
            ...prevState, ...{[e.target.id]: Number(e.target.value)}
        }))
    }
    return <MDBContainer fluid={true} style={{marginTop: 10, marginBottom: 10}}>
        <MDBCheckbox onClick={(e) => checkBoxEvent(e)} name='inlineCheck' id='kbsWorld' label='KBS World' inline/>
        <MDBCheckbox onClick={(e) => checkBoxEvent(e)} name='inlineCheck' id='sample' label='sample' inline/>
        <MDBCheckbox onClick={(e) => checkBoxEvent(e)} name='inlineCheck' id='sample2' label='sample2' inline/>
        <MDBRow center={true} style={{marginTop: 10}}>
            <MDBCol size={1}>
                <MDBInput onChange={(e) => {
                    numberInputEvent(e)
                }} label='MaxLine' id='inputMaxLine' type='number' defaultValue={0}/>
            </MDBCol>
            <MDBCol size={1}>
                <MDBInput onChange={(e) => {
                    numberInputEvent(e)
                }} label='MaxCharacter' id='inputMaxCharacter' type='number' defaultValue={0}/>
            </MDBCol>
            <MDBCol size={1}>
                <MDBInput onChange={(e) => {
                    numberInputEvent(e)
                }} label='CPS' id='inputCPS' type='number' defaultValue={0}/>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
}

export default Guideline
