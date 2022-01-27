import React, { FC, useState, useEffect } from "react";
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SingleTweet from "./SingleTweet";

const Twitter: FC = (props: any) => {
  const [title, setTitle] = useState('');
  const [tweets, setTweets] = useState([]);

  const handleTwitterSearch = (e: any) => {
    e.preventDefault();
    // console.log(title)
    // axios()
    const options: any = {
      url: '/api/twitter/tweets',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      params: {
        title: title
      }
    }
    axios(options)
      .then(({ data }) => {
        // console.log(res.data.data)
        setTweets(data.data)
      })
      .then(() => {
        // console.log(tweets)
        setTitle('');
      })
  }

  // grab tweets for random movie on load
  useEffect(() => {
    console.log('did load');
    axios('/api/movies')
      .then((movies: any) => {
        return movies.data[Math.floor(Math.random() * movies.data.length)].title
      })
      .then((title) => {
        const options: any = {
          url: '/api/twitter/tweets',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          params: {
            title: title
          }
        }
        axios(options)
          .then((res) => {
            setTweets(res.data.data)
          })
      })
  }, []);



  return (
    <>
      <div className="formClass">
        <form
        style={{ display: 'flex', width: '768px', margin: '0.75rem auto' }}
        onSubmit={e => e.preventDefault()}>
          <TextField
          style={{ height: '100%' }}
          fullWidth variant="outlined" label="Search Movie Tweets"
            value={title}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) =>
              setTitle(e.target.value)
            }
          />
          <Button variant="contained" color="secondary" onClick={(e: any) => handleTwitterSearch(e)}>Search</Button>
        </form>
      </div>

      <div
        style={{
          width: 'fit-content',
          margin: '0 auto',
          padding: '1rem'
         }}
        className="TwitterTweets">
        {tweets.map((tweet: any) => {
          return <SingleTweet key={tweet.id} text={tweet.text} />
        })

        }
      </div>
    </>
  )
};

export default Twitter;
