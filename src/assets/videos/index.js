import React from 'react';
import { Player } from 'react-tuby'
import video from './video-1.mp4';

const Video = () => {
    return (
        <Player 
        
        src={video} />
    );
}

export default Video;
