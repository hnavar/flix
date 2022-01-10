import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';

const DetectedText:FC<any> = (props) => {
  const {text} = props;

  return (
    <div
      style={{
        borderRadius: '4px',
        background: 'rgb(51, 51, 51)',
        padding: '20px',
        margin: '10px',
        height: 'fit-content',
        width: 'fit-content'
      }}
    >
      <NavLink to={`/search?q=${text}`} style={{color: 'gold', textDecoration: 'none'}}>{text}</NavLink>
    </div>
  );
};

export default DetectedText;
