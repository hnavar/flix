import axios from 'axios';
import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import e from 'express';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TabsList from '@material-ui/core';
// import Panel from '@material-ui/core'
// import Typography from '@material-ui/core'



// const Panel = (props) => (
//   <div hidden={props.value !== props.index}>
//     <Typography>{props.children}</Typography>
//   </div>
// );


const UserPreferences:FC<any> = ({user}) => {

  const [currentUser, setCurrentUser] = useState<any>(user);
  const [age, setAge] = useState<number>();

  const [userPhoto, setUserPhoto] = useState<any>();
  const [coverPhoto, setCoverPhoto] = useState<any>();
  const [container, setContainer] = useState<any>();
  const [tabsValue, setTabsValue] = useState<any>();




  const handleAgeChange = (e: SyntheticEvent) => {
    e.preventDefault;
    axios.patch('/api/users/:id', {'age': age})
      .then(() => { console.log('Successfully set user age'); })
      .catch((err: any) => { console.log('Unable to update age.') });
  };

  const handleProfilePhotoChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files![0];
    setUserPhoto(URL.createObjectURL(file));
    const data = new FormData();
    data.append('image', file, file.name);
    axios.post('/api/photos/imgUpload', data, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(({data}) => {
        setUserPhoto(data);
        axios.patch(`/api/users/${currentUser.id}`, {profile_image_url: data})
          .then(() => {
            console.log('updated profile photo') });
        console.log(typeof data);
      })
      .catch((err: any) => {
        console.log('error POSTing file');
        console.error(err);
      });
  };

  const getLoggedInUser = () => {
    axios.get('/verify')
      .then(({data}) => {
        console.log('verified', data);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log('Unable to verify user', err);
      });
  };
  useEffect(() => {
    getLoggedInUser();
  }, [currentUser?.profile_image_url]);

  const handleCoverPhotoChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files![0];
    //set photo as temp url so can be set as cover photo before axios update occurs
    setCoverPhoto(URL.createObjectURL(file));
    //create FormData object to be sent back
    const data = new FormData();
    data.append('image', file, file.name);
    //set image to user cover photo entry
    axios.post('/api/photos/imgUpload', data, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(({data}) => {
        console.log('imageurl', data)
        //patch user with new url
        axios.patch(`/api/users/${currentUser.id}`, {profile_cover_photo_url: data})
        .then(() => {
          console.log('updated cover photo') });
        })
        .catch((err: any) => {
          console.log('error POSTing file');
          console.error(err);
        })
        .finally(() => {
          console.log('finally coverphoto', coverPhoto);
          //get the currently logged in user again, after the image value updates
          getLoggedInUser();
        })
      };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

  };

  const handleProfileRemove = (e: SyntheticEvent) => {
    e.preventDefault();
    setUserPhoto('');
  };

  const handleCoverRemove = (e: SyntheticEvent) => {
    e.preventDefault();
    setUserPhoto('');
  };

  const handleRemoveAge = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('age', currentUser.age);
    // setAge();
  }
    /*
    first axios post the picture, then the returning data is to be an axios patch request to the user
    */


  // const Test = () => {
  //   return(
  //     <>
  //     This is a test
  //     </>
  //   );
  // }

  // const handleTabsValue = (event: React.SyntheticEvent, index: number) => {
  //   setTabsValue(index);
  // };

  // const AgeTab:FC<any> = (value: any) => {
  //   return (

    // <div>
    // <h3>Set age: {!currentUser ? null : currentUser.age}</h3>
    // <form>
    // <input
    //     type='number'
    //     name='myAge'
    //     onChange={handleAgeChange}
    //   />
    // </form>
    // <Button onClick={handleRemoveAge}>Submit age</Button>
    // </div>

  //   );
  // }



  return(
    <>
    <div>
    <h3>Set age: {!currentUser ? null : currentUser.age}</h3>
    <form>
    <input
        type='number'
        name='myAge'
        onChange={handleAgeChange}
      />
    </form>
    <Button onClick={handleRemoveAge}>Submit age</Button>
    </div>

    <h3>Upload a profile photo</h3>
    {!!userPhoto && (
      <div>
      <img alt="not found" width={"250px"} src={userPhoto} />
      <br />
      <Button onClick={handleProfileRemove}>Remove</Button>
      </div>
    )}
    <br />
    <br />
    <form
      encType="multipart/form-data"
    >
      <input
        type="file"
        name="myImage"
        onChange={handleProfilePhotoChange}
      />
    </form>
    <h3>Upload a cover photo</h3>
    {!!coverPhoto && (
      <div>
      <img alt="not found" width={"250px"} src={coverPhoto} />
      <br />
      <Button onClick={handleCoverRemove}>Remove</Button>
      </div>
    )}
    <br />
    <br />
    <form
      encType="multipart/form-data"
    >
      <input
        type="file"
        name="myImage"
        onChange={handleCoverPhotoChange}
      />
    </form>
  </>
  );

};


export default UserPreferences;
