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

  const handleChange = (e: SyntheticEvent) => {
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
            console.log('updated photo') });
        console.log(typeof data);
      })
      .catch((err: any) => {
        console.log('error POSTing file');
        console.error(err);
      });
  };
  console.log(currentUser);

  const handleCoverPhotoChange = (e: SyntheticEvent) => {};

  const handleRemove = (e: SyntheticEvent) => {
    e.preventDefault();
    setUserPhoto('');
  };

    /*
    first axios post the picture, then the returning data is to be an axios patch request to the user
    */

  return(
    <>
    <h1>Upload a Movie Poster to find More Details</h1>
    {!!userPhoto && (
      <div>
      <img alt="not found" width={"250px"} src={userPhoto} />
      <br />
      <Button onClick={handleRemove}>Remove</Button>
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
        onChange={handleChange}
      />
    </form>
  </>
  );

};


export default UserPreferences;
