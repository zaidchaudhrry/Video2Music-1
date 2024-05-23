import { Box, Button, Container, Heading, Progress, Text, VStack, Input, Flex, Spacer, Img, Stack, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Circle } from "@chakra-ui/react";
import { useRef } from "react";
import logo from './assests/logoimg.png'
import { Step, StepLabel, Stepper } from "@mui/material";

const Video2MusicComponent = () => {
    const fileInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
    };

    const steps = [
        'Video Upload',
        'Keyword Customisation',
        'Audio Customisation',
        'Video Download',
    ];

    return (
        <Stack
            width="100%"
            minHeight="100vh"
            bg="gray.800"
            color="white"

        // p={6}
        // display="flex"
        // flexDirection="column"
        // alignItems="center"
        // justifyContent="center"
        >
            <Stack align={'center'} mt={10}>
                <Img src={logo} alt="logo image" />
            </Stack>


            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>


        </Stack>
    );
};

export default Video2MusicComponent;
