import React, { FC, useState, useEffect } from 'react';



const UserPreferences:FC<any> = ({user}) => {

  const [currentUser, setCurrentUser] = useState<any>();
  const [age, setAge] = useState<any>();

  const verifyLoggedIn = () => {};

  return(
    <div>
      User Preferences
    </div>
  );

};


export default UserPreferences;