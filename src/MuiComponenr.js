import React, { useState } from 'react';
import { Box, Button, Input, Stack, Typography, Slider } from '@mui/material';
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import logo from './assests/logoimg.png';
import upload from './assests/upload-cloud-02.png';

const steps = ['Video Upload', 'Keyword Customisation', 'Audio Customisation', 'Video Download'];

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
        <CustomStepIconRoot ownerState={{ completed, active }} className={className}>
            {completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
        </CustomStepIconRoot>
    );
}

const Video2Music = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [keywords, setKeywords] = useState(["Love", "Heart", "Dream", "Night", "Sky"]);
    const [volume, setVolume] = useState(50);
    const [videoFile, setVideoFile] = useState(null);

    const handleContinue = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleFileUpload = (event) => {
        setVideoFile(event.target.files[0]);
        setProgress(40); // simulate upload progress
    };

    const addKeyword = (keyword) => {
        setKeywords([...keywords, keyword]);
    };

    const removeKeyword = (keywordToRemove) => {
        setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
    };

    const handleVolumeChange = (value) => {
        setVolume(value);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor="#1a202c"
            color="white"
            height="100vh"
        // width="100vw"
        // overflow="hidden"
        // m={0}
        // p={0}
        >
            <Box
                width="80%"
                // maxWidth="800px"
                // overflow="hidden"
                bgcolor="gray.900"
            // m={0}
            // p={0}
            >
                <Box mb={4} mt={7} display="flex" justifyContent="center">
                    <img src={logo} alt="Video2Music" />
                </Box>
                <Stepper alternativeLabel activeStep={activeStep} connector={<CustomConnector />}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={CustomStepIcon}>
                                <Typography variant="caption" color={index === activeStep ? '#9FFE27' : 'white'}>
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Stack spacing={8} mt={8}>
                    {activeStep === 0 && (
                        <Box
                            textAlign="center"
                            p={4}
                            border={2}
                            borderRadius="24px"
                            borderColor="#9FFE27"
                            mx="auto"
                            bgcolor="#1c1c1c"
                            color="white"
                        >
                            <Typography variant="h4" mb={2}>
                                Video2Music
                            </Typography>
                            <Typography variant="subtitle1" mb={4}>
                                Personalized Soundtracks, Made Just for Your Videos
                            </Typography>
                            <Box
                                p={2}
                                mb={4}
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
                                            cursor: 'pointer'
                                        }}
                                    />
                                </label>
                                <Input
                                    type="file"
                                    onChange={handleFileUpload}
                                    sx={{ display: 'none' }}
                                    id="file-upload"
                                />
                                <Typography variant="body1" mt={2}>
                                    <span style={{ color: '#9FFE27' }}>Click to upload</span> or drag and drop
                                </Typography>
                                <Typography variant="caption" color="grey.500">
                                    Max file size <span style={{ color: '#9FFE27' }}>1GB</span>
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {activeStep === 1 && (
                        <Box textAlign="center" p={4} border={1} borderRadius="lg" borderColor="green.400">
                            <Typography mb={2}>
                                These are the keywords which we believe accurately describe the mood and context of your content,
                                however, feel free to add your own as well!
                            </Typography>
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <Input placeholder="Add new keyword" onKeyDown={(e) => e.key === 'Enter' && addKeyword(e.target.value)} />
                            </Stack>
                        </Box>
                    )}

                    {activeStep === 2 && (
                        <Box textAlign="center" p={4} border={1} borderRadius="lg" borderColor="green.400">
                            <Typography mb={4}>Use our specialized volume rocker to adjust the volume according to your liking.</Typography>
                            <Slider value={volume} onChange={(_, value) => handleVolumeChange(value)} min={0} max={100} color="secondary" />
                        </Box>
                    )}

                    {activeStep === 3 && (
                        <Box textAlign="center" p={4} border={1} borderRadius="lg" borderColor="green.400">
                            <Typography mb={4}>
                                We're almost there. Use our specialized volume rocker to adjust the volume according to your liking.
                            </Typography>
                            {videoFile && (
                                <Box mb={4}>
                                    <video width="100%" controls>
                                        <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                                    </video>
                                </Box>
                            )}
                            <Button color="secondary" variant="contained">Download</Button>
                        </Box>
                    )}
                </Stack>
                <Box textAlign="end" mt={5} mb={10}>
                    {activeStep < steps.length - 1 && (
                        <Button color="secondary" variant="contained" onClick={handleContinue}>
                            Continue
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>

    );
};

export default Video2Music;
