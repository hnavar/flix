import axios from 'axios';
import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import Button from '@mui/material/Button';



const UserPreferences:FC<any> = ({user}) => {

  const [currentUser, setCurrentUser] = useState<any>();
  const [age, setAge] = useState<number>();

  const [userPhoto, setUserPhoto] = useState<any>();
  const [coverPhoto, setCoverPhoto] = useState<any>();




  const updateAge = () => {
    axios.patch('/api/users/:id', {'age': age})
      .then(() => { console.log('Successfully set user age'); })
      .catch((err: any) => { console.log('Unable to update age.') });
  };

  const handleUserPhotoChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files![0];
    setUserPhoto(URL.createObjectURL(file));
    const data = new FormData();
    data.append('image', file, file.name);
    console.log('data', data)
    console.log('file', file)

  };

  const handleCoverPhotoChange = (e: SyntheticEvent) => {};

  const handleRemove = (e: SyntheticEvent) => {
    e.preventDefault();
    setUserPhoto('');
  };


  return(
    <>
    <div>
      User prefs
    </div>
    </>
  );

};


export default UserPreferences;
