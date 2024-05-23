import { Box, Button, Container, Heading, Progress, Text, VStack, Input, Flex, Spacer, Img, Stack, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Circle } from "@chakra-ui/react";
import { useRef } from "react";
import logo from './assests/logoimg.png'

const Video2MusicComponent = () => {
    const fileInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
    };

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

            <Stack px={80} mt={5}>
                <Flex alignItems="center" mb={8} position="relative">
                    <Slider aria-label="slider-ex-1" defaultValue={25} size="lg" width="100%">
                        <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm" color="green.500">
                            Video Upload
                        </SliderMark>
                        <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm" color="gray.400">
                            Keyword Customization
                        </SliderMark>
                        <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm" color="gray.400">
                            Audio Customization
                        </SliderMark>
                        <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm" color="gray.400">
                            Video Download
                        </SliderMark>
                        <SliderTrack bg="gray.500">
                            <SliderFilledTrack bg="green.500" />
                        </SliderTrack>
                        <SliderThumb boxSize={6}>
                            <Circle size={8} bg="green.500" border="2px solid white" />
                        </SliderThumb>
                    </Slider>
                </Flex>
            </Stack>

        </Stack>
    );
};

export default Video2MusicComponent;
