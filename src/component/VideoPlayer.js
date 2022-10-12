import ReactPlayer from "react-player";

const VideoPlayer = () => {
    return <div id={'content-videoPlayer'} style={{width: '30%', display: 'none'}}>
        <ReactPlayer controls={true} width={'100%'} height={'100%'} url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
    </div>
};

export default VideoPlayer
