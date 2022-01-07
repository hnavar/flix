import React, {FC, SyntheticEvent} from 'react';
import { useNavigate } from 'react-router';

const DetectedText:FC<any> = (props) => {
  const {text} = props;

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    const navigate = useNavigate();
    navigate(`/search/${text}`);
  };

  return (
    <div onClick={handleClick}>
      <h4>{text}</h4>
    </div>
  )
};

export default DetectedText;
