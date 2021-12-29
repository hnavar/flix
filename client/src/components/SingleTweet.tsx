import React, {FC, useState, useEffect} from "react";

type TweetProps = {text: string}

// type SingleTweetProps = {props: any}
const SingleTweet:FC<TweetProps> = ({text}) => {
    
    return (
      <div className="SingleTweet"
      style ={{border: '2px solid blue'}}
      >
           {text}
      </div>
    )
  };

export default SingleTweet;
  