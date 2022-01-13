import React, { FC } from 'react';
import Link from '@mui/material/Link';




const Logout:FC = () => {



  return(
    <>
    <Link href="/logout"
          color='inherit'
          variant='subtitle1'
          paddingLeft={2}
    >Logout</Link>
    </>
  );
}


export default Logout;

