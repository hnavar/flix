import axios from "axios";
const { IMDB_KEY } = process.env;
 
export const grabMovieInfo = async (movieName: string) => {
  // return axios.get(`https://imdb-api.com/en/API/SearchMovie/k_0ey76rg5/${movieName}`)
  const iD = await axios.get(`https://imdb-api.com/en/API/SearchMovie/${IMDB_KEY}/${movieName}`)
    .then((data: any) => {
      return data.data.results[0].id;
    }).catch((err: any) => {
      console.log("Error getting movie id", err);
    });
  
  const result = await axios.get(`https://imdb-api.com/en/API/Trailer/${IMDB_KEY}/${iD}`)
    .then((data: any) => {
      return data.data;
    })
    .catch((err: any) => {
      console.log("Error getting movie trailer", err);
    });

  return result;
}


export const addMovieInfo = async (movieObj: any) => {
  const result = await axios.get(`https://imdb-api.com/en/API/Title/${IMDB_KEY}/${movieObj.imDbId}`)
  .then((data: any) => {
    const newData = {
      genres: data.data.genres,
      actors: data.data.stars,
      directors: data.data.directors,
      thumbnailUrl: data.data.thumbnailUrl,
    }
    const fullData = {...newData, ...movieObj};
    console.log("dataaaa", fullData);
    return fullData;
  })
  .catch((err: any) => {
    console.log("Error getting movie info");
  });
  return result;
}