import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Progress,
    Tag,
    TagCloseButton,
    TagLabel,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    VStack,
    Center,
    Text,
    Stack,
    Image,
    Flex,
    Icon,
} from '@chakra-ui/react';
import { FaFileUpload } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import logo from './assests/logoimg.png'

const steps = [
    { label: 'Video Upload', icon: FaFileUpload },
    { label: 'Keyword Customisation', icon: AiOutlineCheckCircle },
    { label: 'Audio Customisation', icon: AiOutlineCheckCircle },
    { label: 'Video Download', icon: AiOutlineCheckCircle },
];

const Video2Music = () => {
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const [keywords, setKeywords] = useState(["Love", "Heart", "Dream", "Night", "Sky"]);
    const [volume, setVolume] = useState(50);
    const [videoFile, setVideoFile] = useState(null);

    const handleContinue = () => {
        if (step < 4) {
            setStep(step + 1);
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
        <Center height="100vh" bg="#1a202c" color="white">
            <Box width="100%"
                minHeight="100vh" p={5} overflow="hidden" >
                <Center mb={4} mt={10}>
                    <Image src={logo} alt="Video2Music" />
                </Center>
                <Flex px={80} justify="space-between" align="center" mb={8}>
                    {steps.map((s, index) => (
                        <Flex key={index} direction="column" align="center">
                            <Icon
                                as={s.icon}
                                boxSize={6}
                                color={index + 1 <= step ? 'green.400' : 'gray.600'}
                            />
                            <Text
                                mt={2}
                                fontSize="sm"
                                fontWeight="bold"
                                color={index + 1 <= step ? 'green.400' : 'gray.600'}
                            >
                                {s.label}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
                <Stack spacing={8} borderWidth={1} borderRadius="lg" border={'2px solid #9FFE27'}>
                    {step === 1 && (
                        <Box textAlign="center" p={4} borderWidth={1} borderRadius="lg" borderColor="green.400">
                            <Input type="file" onChange={handleFileUpload} icon={<FaFileUpload />} mb={4} />
                            {videoFile && <Progress value={progress} size="sm" colorScheme="green" />}
                        </Box>
                    )}

                    {step === 2 && (
                        <Box textAlign="center" p={4} borderWidth={1} borderRadius="lg" borderColor="green.400">
                            <Text mb={2}>These are the keywords which we believe accurately describe the mood and context of your content, however, feel free to add your own as well!</Text>
                            <VStack spacing={2}>
                                {keywords.map((keyword) => (
                                    <Tag size="lg" key={keyword} borderRadius="full" variant="solid" colorScheme="green">
                                        <TagLabel>{keyword}</TagLabel>
                                        <TagCloseButton onClick={() => removeKeyword(keyword)} />
                                    </Tag>
                                ))}
                                <Input placeholder="Add new keyword" onKeyDown={(e) => e.key === 'Enter' && addKeyword(e.target.value)} />
                            </VStack>
                        </Box>
                    )}

                    {step === 3 && (
                        <Box textAlign="center" p={4} borderWidth={1} borderRadius="lg" borderColor="green.400">
                            <Text mb={4}>Use our specialized volume rocker to adjust the volume according to your liking.</Text>
                            <Slider value={volume} onChange={handleVolumeChange} min={0} max={100} colorScheme="green">
                                <SliderTrack bg="green.100">
                                    <SliderFilledTrack bg="green.400" />
                                </SliderTrack>
                                <SliderThumb boxSize={6} />
                            </Slider>
                        </Box>
                    )}

                    {step === 4 && (
                        <Box textAlign="center" p={4} borderWidth={1} borderRadius="lg" borderColor="green.400">
                            <Text mb={4}>We're almost there. Use our specialized volume rocker to adjust the volume according to your liking.</Text>
                            {videoFile && (
                                <Box mb={4}>
                                    <video width="100%" controls>
                                        <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                                    </video>
                                </Box>
                            )}
                            <Button colorScheme="green">Download</Button>
                        </Box>
                    )}
                </Stack>
                <Box textAlign="center" mt={5}>
                    {step < 4 && (
                        <Button colorScheme="green" onClick={handleContinue}>
                            Continue
                        </Button>
                    )}
                </Box>
            </Box>
        </Center>
    );
};

export default Video2Music;
