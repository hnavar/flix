import { Height } from '@material-ui/icons';
import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';

const DetectedText:FC<any> = (props) => {
  const {text} = props;

  // const handleClick = (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   const navigate = useNavigate();
  //   navigate(`/search?q=${text}`);
  // };

  return (
    // <div onClick={handleClick}>
    //   <h4>{text}</h4>
    // </div>
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
      <NavLink to={`/search?q=${text}`} style={{color: 'gold'}}>{text}</NavLink>
    </div>
  );
};

export default DetectedText;
