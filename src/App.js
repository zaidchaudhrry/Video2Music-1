import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Video2MusicComponent from './Video2MusicComponent';
import Video2Music from './Video2Music';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Video2Music />
    </ChakraProvider>
  );
}

export default App;
