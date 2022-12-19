import {MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';

const Guideline = (props) => {
    const setInputValue = (maxLine, maxCharacter, cps) => {
        document.getElementById('inputMaxLine').value = maxLine
        document.getElementById('inputMaxCharacter').value = maxCharacter
        document.getElementById('inputCPS').value = cps
    }
    const setReadOnly = (bool) => {
        document.getElementById('inputMaxLine').readOnly = bool
        document.getElementById('inputMaxCharacter').readOnly = bool
        document.getElementById('inputCPS').readOnly = bool
    }
    const checkBoxEvent = (e) => {
        const samples = document.getElementsByClassName('form-check-input')
        for (let i = 0; i < samples.length; i++) {
            if (samples[i] !== e.target) samples[i].checked = false
            else {
                if (e.target.checked) {
                    let targetLanguage = ['enUS', 'enGB']
                    if (e.target.id === 'kbsWorld') {
                        setInputValue(1, 55, 30)
                        setReadOnly(true)
                    } else if (e.target.id === 'kcp') {
                        setInputValue(2, 42, 30)
                        setReadOnly(true)
                    } else if (e.target.id === 'paramount') {
                        setInputValue(2, 16, 12)
                        setReadOnly(true)
                        targetLanguage = ['koKR']
                    } else if (e.target.id === 'engToKor') {
                        setInputValue(2, 30, 30)
                        setReadOnly(false)
                        targetLanguage = ['koKR']
                    } else if (e.target.id === 'custom') {
                        setInputValue(0, 0, 0)
                        setReadOnly(false)
                    }
                    props.setGuideline((prevState) => ({
                        ...prevState, ...{
                            name: e.target.id,
                            inputMaxLine: Number(document.getElementById('inputMaxLine').value),
                            inputMaxCharacter: Number(document.getElementById('inputMaxCharacter').value),
                            inputCPS: Number(document.getElementById('inputCPS').value),
                            targetLanguage: targetLanguage
                        }
                    }))
                } else {
                    setInputValue(0, 0, 0)
                    props.setGuideline({
                        name: null,
                        inputMaxLine: 0,
                        inputMaxCharacter: 0,
                        inputCPS: 0,
                        targetLanguage: []
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
        <MDBCheckbox onClick={(e) => checkBoxEvent(e)} name='inlineCheck' id='paramount' label='Paramount' inline/>
        <MDBCheckbox onClick={(e) => checkBoxEvent(e)} name='inlineCheck' id='engToKor' label='Eng->Kor Test' inline/>
        <MDBCheckbox onClick={(e) => checkBoxEvent(e)} name='inlineCheck' id='custom' label='Custom' inline/>
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
