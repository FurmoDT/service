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
                     playing={ReactPlayer.canPlay(props.videoUrl) && props.play} onProgress={props.onProgress}/>
        <label style={{position: 'absolute', color: 'white'}}>{props.subtitle}</label>
    </div>
};

export default VideoPlayer
