import ReactPlayer from "react-player";
import {useEffect, useRef} from "react";

const VideoPlayer = (props) => {
    const layout = useRef(null)
    useEffect(() => {
        if (ReactPlayer.canPlay(props.videoUrl)) {
            layout.current.style.display = 'flex'
        } else layout.current.style.display = 'none'
    }, [props.videoUrl])
    return <div ref={layout} style={{width: '100%', height: '300px', display: 'none'}}>
        <ReactPlayer style={{backgroundColor: 'black'}} ref={props.player} playing={ReactPlayer.canPlay(props.videoUrl) && props.play}
                     controls={ReactPlayer.canPlay(props.videoUrl)} width={'100%'} height={'100%'}
                     url={props.videoUrl}/>
    </div>
};

export default VideoPlayer
