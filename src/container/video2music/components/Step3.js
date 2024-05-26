import { Box, Slider, Typography } from '@mui/material';
import React from 'react';

const Step3 = ({ activeStep, handleVolumeChange, volume }) => {
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
            onChange={(_, value) => handleVolumeChange(value)}
            min={0}
            max={100}
          />
        </Box>
      )}
    </>
  );
};

export default Step3;
