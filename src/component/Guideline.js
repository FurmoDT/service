import {MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';

const Guideline = (props) => {
    const setInputValue = (maxLine, maxCharacter, cps) => {
        document.getElementById('inputMaxLine').value = maxLine
        document.getElementById('inputMaxCharacter').value = maxCharacter
        document.getElementById('inputCPS').value = cps
    }
    const checkBoxEvent = (e) => {
        const samples = document.getElementsByClassName('form-check-input')
        for (let i = 0; i < samples.length; i++) {
            if (samples[i] !== e.target) samples[i].checked = false
            else {
                if (e.target.checked) {
                    if (e.target.id === 'kbsWorld') {
                        setInputValue(1, 55, 30)
                    } else if (e.target.id === 'kcp') {
                        setInputValue(2, 42, 30)
                    } else if (e.target.id === 'sample') {
                        setInputValue(5, 60, 50)
                    }
                    props.setGuideline((prevState) => ({
                        ...prevState, ...{
                            inputMaxLine: Number(document.getElementById('inputMaxLine').value),
                            inputMaxCharacter: Number(document.getElementById('inputMaxCharacter').value),
                            inputCPS: Number(document.getElementById('inputCPS').value)
                        }
                    }))
                } else {
                    setInputValue(0, 0, 0)
                    props.setGuideline({
                        inputMaxLine: 0,
                        inputMaxCharacter: 0,
                        inputCPS: 0
                    })
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
        <MDBCheckbox onClick={(e) => checkBoxEvent(e)} name='inlineCheck' id='kcp' label='KCP' inline/>
        <MDBCheckbox onClick={(e) => checkBoxEvent(e)} name='inlineCheck' id='sample' label='sample' inline/>
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
