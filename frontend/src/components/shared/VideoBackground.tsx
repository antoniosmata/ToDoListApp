import React from 'react';
import './VideoBackground.css';

/**
 * Props for the VideoBackground component
 * @interface VideoBackgroundProps
 * @property videoSrc - Path to the video file to use as background
 * @property overlayOpacity - Opacity of the dark overlay on top of video (0-1)
 * @property children - Child components to render on top of the video
 * @property playOnce - Whether to play video once or loop continuously
 * @property onVideoEnd - Optional callback when video playback ends
 * @property showChildren - Whether to show child components immediately
 */
interface VideoBackgroundProps {
  videoSrc: string;
  overlayOpacity?: number;
  children: React.ReactNode;
  playOnce?: boolean;
  onVideoEnd?: () => void;
  showChildren?: boolean;
}

/**
 * Video background component that displays a fullscreen video with content overlay
 * Supports customizable overlay opacity and conditional child rendering
 * Used for creating immersive background experiences in auth and onboarding flows
 * @param props - Component props
 * @param props.videoSrc - Video file path
 * @param props.overlayOpacity - Dark overlay opacity (defaults to 0.3)
 * @param props.children - Content to display over the video
 * @param props.playOnce - Play once vs loop (defaults to false - loop)
 * @param props.onVideoEnd - Callback when video ends
 * @param props.showChildren - Whether to show children (defaults to true)
 * @returns JSX element representing the video background with overlay content
 */
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