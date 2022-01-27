import React, { FC, useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';

type TweetProps = { text: string }

// type SingleTweetProps = {props: any}
const SingleTweet: FC<TweetProps> = ({ text }) => {

  return (
    <Box style={{
      padding: '1rem',
      boxShadow: '2px -2px 0.25rem rgba(200, 200, 200, 0.25), -2px 2px 0.25rem rgba(200, 200, 200, 0.75)',
      marginBottom: '1rem',
      maxWidth: '768px',
      borderRadius: '0.25rem',
    }}>
      <Typography>
        {text}
      </Typography>
    </Box>

  )
};

export default SingleTweet;