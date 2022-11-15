import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";

const Finder = () => {
    return <div style={{
        flexDirection: 'row',
        display: 'flex',
        height: '200px',
    }}>
        <div style={{width: '200px', flexDirection: 'column', display: 'flex'}}>
            <p><b>Double Quotation Marks</b></p>
            <div>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-left" size={'2x'} color={'dark'}/>
                </MDBBtn>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-right" size={'2x'} color={'dark'}/>
                </MDBBtn>
            </div>
        </div>
        <div style={{width: '200px', flexDirection: 'column', display: 'flex'}}>
            <p><b>Termbase</b></p>
            <div>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-left" size={'2x'} color={'dark'}/>
                </MDBBtn>
                <MDBBtn color={'none'} floating tag='a'>
                    <MDBIcon fas icon="angle-right" size={'2x'} color={'dark'}/>
                </MDBBtn>
            </div>
        </div>
    </div>
};

export default Finder
