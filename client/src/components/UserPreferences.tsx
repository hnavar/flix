import axios from 'axios';
import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import e from 'express';



const UserPreferences:FC<any> = ({user}) => {

  const [currentUser, setCurrentUser] = useState<any>(user);
  const [age, setAge] = useState<number>();

  const [userPhoto, setUserPhoto] = useState<any>();
  const [coverPhoto, setCoverPhoto] = useState<any>();
  const [container, setContainer] = useState<any>();




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
    setCoverPhoto(URL.createObjectURL(file));
    const data = new FormData();
    data.append('image', file, file.name);
    axios.post('/api/photos/imgUpload', data, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(({data}) => {
        console.log('imageurl', data)
        // console.log('cover photo', coverPhoto);
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

  return(
    <>
    <div>
    <h2>set age: {!currentUser ? null : currentUser.age}</h2>
    <form>
    <input
        type='number'
        name='myAge'
        onChange={handleAgeChange}
      />
    </form>
    <Button onClick={handleRemoveAge}>Submit age</Button>
    </div>
    <h1>profile photo</h1>
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
    <h1>cover photo</h1>
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
