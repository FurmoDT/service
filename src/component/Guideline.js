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
                        document.getElementById('inputWordCount').value = 55
                    } else if (e.target.id === 'sample') {
                        document.getElementById('inputMaxLine').value = 3
                        document.getElementById('inputWordCount').value = 60
                    } else if (e.target.id === 'sample2') {
                        document.getElementById('inputMaxLine').value = 1
                        document.getElementById('inputWordCount').value = 60
                    }
                    props.setGuideline((prevState) => ({
                        ...prevState, ...{
                            inputMaxLine: Number(document.getElementById('inputMaxLine').value),
                            inputWordCount: Number(document.getElementById('inputWordCount').value)
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
                }} label='Max Line' id='inputMaxLine' type='number' defaultValue={0}/>
            </MDBCol>
            <MDBCol size={1}>
                <MDBInput onChange={(e) => {
                    numberInputEvent(e)
                }} label='Word Count' id='inputWordCount' type='number' defaultValue={0}/>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
}

export default Guideline
