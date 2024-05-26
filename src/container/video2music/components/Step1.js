import React, { useState } from 'react';
import { Box, Input, LinearProgress, Typography } from '@mui/material';

import upload from './../../../assets/upload-cloud-02.png';
import mp4File from './../../../assets/mp4file.svg';
import deleteIcon from './../../../assets/deleteIcon.svg';

const Step1 = ({
  activeStep,
  videoFile,
  handleFileUpload,
  handleFileUploading,
  isUploading,
  isUploaded,
}) => {
  function bytesToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }
  return (
    <>
      {activeStep === 0 && (
        <>
          {videoFile && isUploading ? (
            <Box
              p={4}
              border={2}
              borderRadius="24px"
              borderColor="#9FFE27"
              mx="auto"
              bgcolor="#1e1e1e"
              color="white"
              height="304px"
            >
              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'center',
                  marginTop: '100px',
                }}
              >
                <div>
                  <img src={mp4File} alt="" />
                </div>

                <div style={{ width: '100%', display: 'flex' }}>
                  <div style={{ width: '100%' }}>
                    <Typography>{videoFile?.name}</Typography>
                    <Typography>{bytesToMB(videoFile?.size)} mb</Typography>

                    <LinearProgress
                      sx={{
                        backgroundColor: 'white',
                        height: '8px',
                        borderRadius: '4px',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#9FFE27',
                        },
                      }}
                    />
                  </div>
                  <img
                    src={deleteIcon}
                    alt=""
                    className="c-pointer"
                    onClick={handleFileUploading}
                  />
                </div>
              </div>
            </Box>
          ) : videoFile && isUploaded ? (
            <Box
              p={4}
              border={2}
              borderRadius="24px"
              borderColor="#9FFE27"
              mx="auto"
              bgcolor="#1e1e1e"
              color="white"
              height="304px"
            >
              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'center',
                  marginTop: '100px',
                }}
              >
                <div>
                  <img src={mp4File} alt="" />
                </div>

                <div style={{ width: '100%', display: 'flex' }}>
                  <div style={{ width: '100%' }}>
                    <Typography>{videoFile?.name}</Typography>
                    <Typography>{bytesToMB(videoFile?.size)} mb</Typography>
                    <Typography>
                      Uploaded Successfully, Please continue your process!
                    </Typography>
                  </div>
                </div>
              </div>
            </Box>
          ) : (
            <Box
              textAlign="center"
              p={4}
              border={2}
              borderRadius="24px"
              borderColor="#9FFE27"
              mx="auto"
              bgcolor="#1e1e1e"
              color="white"
              height="304px"
            >
              <Typography variant="h4" mb={2}>
                Video2Music
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                Personalized Soundtracks, Made Just for Your Videos
              </Typography>
              <Box
                p={2}
                mb={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <label htmlFor="file-upload">
                  <Box
                    component="img"
                    src={upload}
                    alt="upload img"
                    sx={{
                      border: '2px solid #EAECF0',
                      borderRadius: '8px',
                      display: 'block',
                      p: '10px',
                      mx: 'auto',
                      width: 'auto',
                      cursor: 'pointer',
                    }}
                  />
                  <Typography variant="body1" mt={2}>
                    <span style={{ color: '#9FFE27' }} className="c-pointer">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </Typography>
                </label>
                <Input
                  type="file"
                  onChange={handleFileUpload}
                  sx={{ display: 'none' }}
                  id="file-upload"
                />
                <Typography variant="caption" color="grey.500">
                  Max file size <span style={{ color: '#9FFE27' }}>1GB</span>
                </Typography>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Step1;
