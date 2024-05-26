import { Box, Slider, Typography } from '@mui/material';
import React, { useRef } from 'react';

const Step3 = ({
  activeStep,
  handleVolumeChange,
  volume,
  processKeywordsData,
}) => {
  const audioRef = useRef(null);

  const handleVolumeSliderChange = (_, value) => {
    console.log(value, 'value');
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
    handleVolumeChange(value);
  };
  return (
    <>
      {activeStep === 2 && (
        <Box
          textAlign="center"
          p={4}
          border={2}
          borderRadius="24px"
          bgcolor="#1e1e1e"
          borderColor="#9FFE27"
          height="304px"
        >
          <Typography mb={4}>
            Use our specialized volume rocker to adjust the volume according to
            your liking.
          </Typography>
          <Slider
            value={volume}
            onChange={(_, value) => {
              console.log(value);
              handleVolumeSliderChange(_, value);
            }}
            min={0}
            max={100}
          />

          <div
            style={{
              display: 'flex',
              //   alignItems: 'center',
              justifyContent: 'center',
              gap: '30px',
            }}
          >
            {processKeywordsData?.music_file && (
              <Box>
                <Typography mb={1}>Audio</Typography>
                <audio
                  width="100%"
                  controls
                  ref={audioRef}
                  src={processKeywordsData?.music_file}
                />
              </Box>
            )}
            {processKeywordsData?.video_file && (
              <Box>
                <Typography mb={1}>Video</Typography>
                <video
                  width="100%"
                  height="200px"
                  controls
                  src={processKeywordsData?.video_file}
                />
              </Box>
            )}
          </div>
        </Box>
      )}
    </>
  );
};

export default Step3;
