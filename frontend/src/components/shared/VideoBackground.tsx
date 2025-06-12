import React from 'react';
import './VideoBackground.css';

interface VideoBackgroundProps {
  videoSrc: string;
  overlayOpacity?: number;
  children: React.ReactNode;
  playOnce?: boolean;
  onVideoEnd?: () => void;
  showChildren?: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoSrc, 
  overlayOpacity = 0.3, 
  children,
  playOnce = false,
  onVideoEnd,
  showChildren = true
}) => {
  return (
    <div className="video-background-container">
      <video
        className="video-background"
        autoPlay
        muted
        loop={!playOnce}
        playsInline
        onEnded={onVideoEnd}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div 
        className="video-overlay" 
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      ></div>
      <div className={`video-content ${showChildren ? 'show' : 'hide'}`}>
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;