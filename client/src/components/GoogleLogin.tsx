// import React, { useState, createContext, useContext } from 'react';
// // import { useGoogleLogin } from 'react-google-login';
// import { GoogleLoginButton } from 'ts-react-google-login-component';
// import axios from 'axios';


// // refresh token
// import refreshTokenSetup  from '../util/RefreshTokenSetup';

// const googleKey = require('../../../config/keys').googleOAuth.APIkey;

// const clientId = googleKey;

// function GoogleSignIn() {

//   const [currentUser, setCurrentUser] = useState<any>();

//   const onSuccess = (res) => {


//     axios.post('/api/users', res.profileObj)
//       .then((user) => {
//         // changeCurrentUser(res.profileObj);
//         console.log('User successfully saved');
//       })
//       .catch((err) => { console.log('Unable to save user', err); })
//       .finally(setCurrentUser(res.profileObj));
//     console.log(
//       `Logged in successfully to ${res.profileObj.name}. \n See console for full profile object.`
//     );
//     refreshTokenSetup(res);
//   };

//   const onFailure = (res) => {
//     console.log('Login failed: res:', res);
//     alert(
//       'Failed to login.'
//     );
//   };

//   const { signIn } = useGoogleLogin({
//     onSuccess,
//     onFailure,
//     clientId,
//     isSignedIn: true,
//     accessType: 'offline',
//   });

//   return (
//     <button onClick={signIn} className="button">
//       <img src="icons/google.svg" alt="google login" className="icon"></img>

//       <span className="buttonText">Sign in with Google</span>
//     </button>
//   );
// }

// export default GoogleSignIn;

interface clientConfig {
  client_id: string;
  cookie_policy?: string;
  scope?: string;
  fetch_basic_profile?: boolean;
  hosted_domain?: string;
  openid_realm?: string;
  ux_mode?: "popup" | "redirect";
  redirect_uri?: string;
}


import React, { FC, useState } from 'react';
import { GoogleLoginButton } from 'ts-react-google-login-component';

// const { google_clientID } = process.env;

const GoogleLogin:FC = () => {

    const preLoginTracking = () => {
        console.log('Attemp to login with google');
    }

    const errorHandler = (error: string) => {
        // handle error if login got failed...
        console.error(error)
    }

    const responseGoogle = (googleUser: gapi.auth2.GoogleUser) => {
        const id_token = googleUser.getAuthResponse(true).id_token
        const googleId = googleUser.getId()

        console.log({ googleId })
        console.log({accessToken: id_token})
        // Make user login in your system
        // login success tracking...
    }

        const clientConfig = { client_id: '' };

        return (
        <div>
                <GoogleLoginButton
                    responseHandler={responseGoogle}
                    clientConfig={clientConfig}
                    preLogin={preLoginTracking}
                    failureHandler={errorHandler}
                />
        </div>
        )

}

export default GoogleLogin;