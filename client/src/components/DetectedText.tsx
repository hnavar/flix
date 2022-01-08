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
    <div>
      <NavLink to={`/search?q=${text}`}>{text}</NavLink>
    </div>
  );
};

export default DetectedText;
