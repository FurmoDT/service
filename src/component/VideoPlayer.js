import ReactPlayer from "react-player";
import {useEffect, useRef} from "react";

const VideoPlayer = (props) => {
    const layout = useRef(null)
    useEffect(() => {
        layout.current.style.display = ReactPlayer.canPlay(props.videoUrl) ? 'flex' : 'none'
    }, [props.videoUrl])
    return <div ref={layout} style={{width: '100%', height: '250px', justifyContent: 'center', alignItems: 'end'}}>
        <ReactPlayer style={{backgroundColor: 'black'}} ref={props.player} width={'100%'} height={'100%'}
                     controls={ReactPlayer.canPlay(props.videoUrl)} progressInterval={1} url={props.videoUrl}
                     onProgress={props.onProgress} onSeek={props.onSeek} onPlay={props.onPlay} onPause={props.onPause}
                     config={{file: {attributes: {controlsList: 'nodownload'}}}}/>
        <label ref={props.subtitle} style={{position: 'absolute', color: 'white', pointerEvents: 'none', whiteSpace:'pre', fontSize: 12}}/>
    </div>
};

export default VideoPlayer
