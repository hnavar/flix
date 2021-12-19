import React, { FC, useState } from 'react';

const GoogleLogin:FC = () => {
  const [user, setUser] = useState<object | null>();

  return (
    <div>
      Google Login
    </div>
  );
};

export default GoogleLogin;