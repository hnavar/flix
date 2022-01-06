import axios from 'axios';
import React, { FC, useState, useEffect, SyntheticEvent } from 'react';



const UserPreferences:FC<any> = ({user}) => {

  const [currentUser, setCurrentUser] = useState<any>();
  const [age, setAge] = useState<number>();

  const [userPhoto, setUserPhoto] = useState<any>();
  const [coverPhoto, setCoverPhoto] = useState<any>();



  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const updateAge = () => {
    axios.patch('/api/users/:id', {'age': age})
      .then(() => { console.log('Successfully set user age'); })
      .catch((err: any) => { console.log('Unable to update age.') });
  }



  return(
    <div>
      User Preferences
    </div>
  );

};


export default UserPreferences;
