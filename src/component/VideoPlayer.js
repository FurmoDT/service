import ReactPlayer from "react-player";

const VideoPlayer = (props) => {
    return <div id={'content-videoPlayer'} style={{width: '30%', display: 'none'}}>
        <ReactPlayer ref={props.player} playing={true} controls={true} width={'100%'} height={'100%'} url={props.videoUrl}/>
    </div>
};

export default VideoPlayer
