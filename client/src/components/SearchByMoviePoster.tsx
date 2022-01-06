import React, {FC, SyntheticEvent, useState} from 'react';
import axios from 'axios';

const SearchByMoviePoster:FC<any> = () => {
  const [image, setImage] = useState('');
  // const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState<string[]>([])

  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files![0];
    setImage(URL.createObjectURL(file));
    const data = new FormData();
    data.append('image', file, file.name);
    axios.post('/api/photos/detectText', data, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(({data}) => {
        setText(data.map((elem: any) => elem.description));
      })
      .catch((err: any) => {
        console.log('error POSTing file');
        console.error(err);
      });
  };

  const handleRemove = (e: SyntheticEvent) => {
    e.preventDefault();
    setImage('');
  };
  return (
    <>
      <h1>Upload a Movie Poster to find More Details</h1>
      {!!image && (
        <div>
        <img alt="not fount" width={"250px"} src={image} />
        <br />
        <button onClick={handleRemove}>Remove</button>
        </div>
      )}
      <br />
      <br />
      <form
        encType="multipart/form-data"
      >
        <input
          type="file"
          name="myImage"
          onChange={handleChange}
        />
      </form>
      {!!text && (
        text.map(text => {
          return (
            <div>{text}</div>
          )
        })
      )}
    </>
  );
};

export default SearchByMoviePoster;
