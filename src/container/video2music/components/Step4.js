import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import download from '../../../assets/download.svg';
import { Image } from '@mui/icons-material';
const Step4 = ({ activeStep, videoFile }) => {
  return (
    <>
      {activeStep === 3 && (
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
            We're almost there. Use our specialized volume rocker to adjust the
            volume according to your liking.
          </Typography>
          {videoFile && (
            <Box mb={4}>
              <video width="100%" height="270px" controls>
                <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
              </video>
            </Box>
          )}
          <Button
            pt="2px"
            pb="2px"
            sx={{
              bgcolor: '#9FFE27',
              color: '#000000',
              fontWeight: '600',
              fontSize: '18px',
              lineHeight: '20px',
              textTransform: 'unset',
              '&:hover': {
                bgcolor: '#9FFE27',
                color: '#000000',
              },
            }}
            variant="contained"
          >
            <img src={download} alt="" style={{ paddingRight: '9px' }} />
            Download
          </Button>
        </Box>
      )}
    </>
  );
};

export default Step4;
