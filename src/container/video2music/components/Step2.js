import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import closeIcon from './../../../assets/closeicon.svg';
const Step2 = ({
  activeStep,
  addKeyword,
  responseData,
  keywords,
  removeKeyword,
}) => {
  console.log(responseData);
  useEffect(() => {
    if (responseData?.keywords) {
    }
  }, [responseData?.keywords]);
  return (
    <>
      {activeStep === 1 && (
        <Box
          textAlign="center"
          p={4}
          border={2}
          borderRadius="24px"
          borderColor="#9FFE27"
          mx="auto"
          bgcolor="#1e1e1e"
          height="304px"
          color="white"
        >
          <Typography mb={2}>
            These are the keywords which we believe accurately describe the mood
            and context of your content, however, feel free to add your own as
            well!
          </Typography>
          <div
            style={{
              border: '2px solid white',
              height: '190px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'start',
              gap: '10px',
              padding: '18px',
              flexWrap: 'wrap',
              overflowY: 'auto',
              marginBottom: '8px',
            }}
          >
            {keywords?.map((str, ind) => (
              <span
                style={{
                  border: '2px solid #9ffe27',
                  borderRadius: '20px',
                  padding: '8px 12px',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <Typography>{str.trim()}</Typography>
                <span>
                  <img
                    src={closeIcon}
                    alt=""
                    style={{ height: '14px' }}
                    className="c-pointer"
                    onClick={() => {
                      removeKeyword(str, ind);
                    }}
                  />
                </span>
              </span>
            ))}
            <span>
              <TextField
                id="filled-basic"
                onKeyDown={e => e.key === 'Enter' && addKeyword(e.target.value)}
                label="Add new keyword"
                InputLabelProps={{
                  style: { color: 'white' }, // Label color
                }}
                InputProps={{
                  style: { color: 'white' }, // Input color
                  placeholderTextColor: 'white', // Placeholder color
                }}
                sx={{
                  '& .MuiInput-underline:before': {
                    borderBottomColor: 'white', // Underline color
                  },
                  '& .MuiInput-underline:hover:before': {
                    borderBottomColor: 'white', // Hover underline color
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white', // Focus underline color
                  },
                }}
                variant="filled"
              />
            </span>
          </div>

          {/* <Button
            pt="4px"
            pb="4px"
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
            Add new keywords
        </Button>*/}
        </Box>
      )}
    </>
  );
};

export default Step2;
