import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import logo from './../../assets/logoimg.png';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import axiosInstance from '../../utils/axiosInstance';
import { showNotification } from '../../utils/error';

const steps = [
  'Video Upload',
  'Keyword Customization',
  'Audio Customization',
  'Video Download',
];

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  '&.MuiStepConnector-root': {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  '& .MuiStepConnector-line': {
    borderColor: '#eaeaf0',
    borderTopWidth: 2,
  },
}));

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: ownerState.active ? '#9FFE27' : '#eaeaf0', // Change active color to green
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.completed && {
    color: '#9FFE27', // Change completed color to green
  }),
}));

function CustomStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <CustomStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
    </CustomStepIconRoot>
  );
}

const Video2Music = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [volume, setVolume] = useState(50);
  const [videoFile, setVideoFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [isContinueDisabled, setIsContinueDisabled] = useState(false);

  const handleContinue = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
    setIsContinueDisabled(false);
  };

  const handleFileUpload = files => {
    console.log(files[0]);
    setVideoFile(files[0]);
    if (files[0]) {
      uploadFile(files[0]);
    }
    setProgress(40); // simulate upload progress
  };

  const addKeyword = keyword => {
    setKeywords([...keywords, keyword]);
  };

  const removeKeyword = (keywordToRemove, ind) => {
    setKeywords(keywords.filter((_, index) => index !== ind));
  };

  const handleVolumeChange = value => {
    setVolume(value);
  };

  const handleFileUploading = () => {
    setVideoFile(null);
    setIsUploading(false);
  };

  const uploadFile = async file => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance.post('/myapp/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response?.data?.success) {
        const key = response?.data?.keywords?.split(',').map(str => str.trim());
        setKeywords(key);
        setResponseData(response?.data);
        setIsUploaded(true);
        setIsUploading(false);
        showNotification('success', response?.data?.message);
      }
    } catch (error) {
      setIsUploaded(false);
      showNotification('error', error?.response?.data?.error || error.message);
    }
  };

  const [isLoader, setIsLoader] = useState(false);
  const [processKeywordsData, setProcessKeywordsData] = useState({});
  
  const processKeywords = async () => {
    try {
      showNotification("success",'Audio is being generated')
      setIsLoader(true);
      const formData = new FormData();
      formData.append('music_prompt', responseData?.music_prompt);
      formData.append('keywords', JSON.stringify(keywords));

      const response = await axiosInstance.post(
        `/myapp/handle_keywords/${responseData?.video_id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response?.data?.success) {
        setProcessKeywordsData(response?.data);
        setIsLoader(false);
        handleContinue();
        showNotification('success', response?.data?.message);
      }
    } catch (error) {
      setIsLoader(false);
      setIsUploaded(false);
      showNotification('error', error?.response?.data?.error || error.message);
    }
    setIsContinueDisabled(false);
  };

  const [finalVideoData, setFinalVideoData] = useState({});

  const generateFinalVideo = async () => {
    try {
      const formData = new FormData();
      formData.append('video_id', responseData?.video_id);
      formData.append('slider_value', volume);

      const response = await axiosInstance.post(
        `/myapp/generate_final_video/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response?.data?.success) {
        setFinalVideoData(response?.data);
        showNotification('success', response?.data?.message);
        handleContinue();
      }
    } catch (error) {
      showNotification('error', error?.response?.data?.error || error.message);
    }
    setIsContinueDisabled(false);
  };

  useEffect(() => {
    const handleBeforeUnload = event => {
      if (videoFile) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [videoFile]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="#343434"
      color="white"
      height="100vh"
    >
      <Box width="80%" bgcolor="gray.900">
        <Box mb={4} mt={5} display="flex" justifyContent="center">
          <img src={logo} alt="Video2Music" />
        </Box>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<CustomConnector />}
        >
          {steps.map((label, index) => (
            <Step
              key={label}
              onClick={() => {
                if (!isUploaded) {
                  return;
                }
                setActiveStep(index);
              }}
            >
              <StepLabel StepIconComponent={CustomStepIcon}>
                <Typography
                  variant="caption"
                  color={index === activeStep ? '#9FFE27' : 'white'}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Stack spacing={8} mt={7}>
          <Step1
            videoFile={videoFile}
            isUploaded={isUploaded}
            isUploading={isUploading}
            activeStep={activeStep}
            handleFileUpload={handleFileUpload}
            handleFileUploading={handleFileUploading}
          />

          <Step2
            activeStep={activeStep}
            addKeyword={addKeyword}
            responseData={responseData}
            keywords={keywords}
            removeKeyword={removeKeyword}
            isLoader={isLoader}
          />

          <Step3
            activeStep={activeStep}
            handleVolumeChange={handleVolumeChange}
            volume={volume}
            processKeywordsData={processKeywordsData}
          />

          <Step4
            activeStep={activeStep}
            videoFile={videoFile}
            finalVideoData={finalVideoData}
          />
        </Stack>

        <Box textAlign="end" mt={5}>
          {activeStep < steps.length - 1 && (
            <Button
              style={{ color: 'black', backgroundColor: '#9FFE27' }}
              variant="contained"
              disabled={isUploading || isContinueDisabled}
                sx={{
                  color: 'black',
                  backgroundColor: '#9FFE27',
                  '&.Mui-disabled': {
                    backgroundColor: 'grey !important', // Change disabled button color to grey
                  },
                }}
              onClick={() => {
                setIsContinueDisabled(true); // Disable the button when clicked
                if (activeStep === 1) {
                  if (Object.keys(processKeywordsData).length === 0) {
                    processKeywords();
                  } else {
                    handleContinue();
                  }
                  return;
                }
                if (activeStep === 2) {
                  if (Object.keys(finalVideoData).length === 0) {
                    generateFinalVideo();
                  } else {
                    handleContinue();
                  }
                  return;
                }
                handleContinue();
              }}
            >
              Continue
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Video2Music;
