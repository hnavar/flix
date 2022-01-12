import React, {FC, useState, useEffect} from "react";
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';

type TweetProps = {text: string}

// type SingleTweetProps = {props: any}
const SingleTweet:FC<TweetProps> = ({text}) => {

    return (
      // <div className="SingleTweet"
      // style ={{border: '2px solid purple', backgroundColor: '#F5F5F5'}}
      // >
      //      {text}
      // </div>
      <>
      <Box>
      <Typography>
        {text}
      </Typography>
      </Box>
      </>
    )
  };

export default SingleTweet;