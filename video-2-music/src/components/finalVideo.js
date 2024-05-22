import React from 'react';

const FinalVideo = ({ videoUrl }) => {
  return (
    <div className="final-video">
      <h2>Final Video</h2>
      <video controls src={videoUrl} />
      <a href={videoUrl} download="final_video.mp4">Download Video</a>
    </div>
  );
};

export default FinalVideo;