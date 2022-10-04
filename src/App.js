import './App.css';
import QualityControl from "./pages/QualityControl";
import Navbar from "./component/Navbar";
import {useRef} from "react";

function App() {
    const buttonDownload = useRef(null)
    return <div className="App">
        <Navbar buttonDownload={buttonDownload}/>
        <QualityControl buttonDownload={buttonDownload}/>
    </div>;
}

export default App;
