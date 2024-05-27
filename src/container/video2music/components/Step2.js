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
import Loader from '../../../components/loader';

const Step2 = ({
  activeStep,
  addKeyword,
  responseData,
  keywords,
  removeKeyword,
  isLoader
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
          borderColor="#6d6d6d" // Updated border color
          mx="auto"
          bgcolor="#f6f6f6" // Updated background color
          height="auto"
          color="#6d6d6d" // Updated text color
        >
          {isLoader ? (
            <div>
              <Typography mb={2}>
                Audio is being generated! Please wait
              </Typography>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '40vh',
                }}
              >
                <Loader />
              </div>
            </div>
          ) : (
            <>
              <Typography mb={2}>
                These are the keywords which we believe accurately describe the mood
                and context of your content, however, feel free to add your own as
                well!
              </Typography>
              <div
                style={{
                  border: '2px solid #6d6d6d', // Updated border color
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
                    key={ind} // Added key for React list rendering
                    style={{
                      border: '2px solid #6d6d6d', // Updated border color
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
                      style: { color: '#6d6d6d' }, // Updated label color
                    }}
                    InputProps={{
                      style: { color: '#6d6d6d' }, // Updated input color
                      placeholderTextColor: '#6d6d6d', // Updated placeholder color
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: '#6d6d6d', // Updated underline color
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: '#6d6d6d', // Updated hover underline color
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#6d6d6d', // Updated focus underline color
                      },
                    }}
                    variant="filled"
                  />
                </span>
              </div>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Step2;
