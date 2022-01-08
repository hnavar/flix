import axios from 'axios';
import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import Button from '@mui/material/Button';



const UserPreferences:FC<any> = ({user}) => {

  const [currentUser, setCurrentUser] = useState<any>(user);
  const [age, setAge] = useState<number>();

  const [userPhoto, setUserPhoto] = useState<any>();
  const [coverPhoto, setCoverPhoto] = useState<any>();




  const updateAge = () => {
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
        axios.patch(`/api/users/${currentUser.id}`, {profile_image_url: data})
          .then(() => {
            setUserPhoto(data);
            console.log('updated profile photo') });
        console.log(typeof data);
      })
      .catch((err: any) => {
        console.log('error POSTing file');
        console.error(err);
      });
  };

  const handleCoverPhotoChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files![0];
    setCoverPhoto(URL.createObjectURL(file));
    const data = new FormData();
    data.append('image', file, file.name);
    axios.post('/api/photos/imgUpload', data, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(({data}) => {
        axios.patch(`/api/users/${currentUser.id}`, {profile_cover_photo_url: data})
          .then(() => {
            setCoverPhoto(data);
            console.log('updated cover photo') });
      })
      .catch((err: any) => {
        console.log('error POSTing file');
        console.error(err);
      });
  };



  const handleProfileRemove = (e: SyntheticEvent) => {
    e.preventDefault();
    setUserPhoto('');
  };

  const handleCoverRemove = (e: SyntheticEvent) => {
    e.preventDefault();
    setUserPhoto('');
  };

    /*
    first axios post the picture, then the returning data is to be an axios patch request to the user
    */

  return(
    <>
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
    {!!userPhoto && (
      <div>
      <img alt="not found" width={"250px"} src={userPhoto} />
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
