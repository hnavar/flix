const axios = require('axios');

//sample data
// {
//   "searchType": "Movie",
//   "expression": "inception",
//   "results": [
//       {
//           "id": "tt1375666",
//           "resultType": "Title",
//           "image": "https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.7273_AL_.jpg",
//           "title": "Inception",
//           "description": "(2010)"
//       },
//       {
//           "id": "tt7321322",
//           "resultType": "Title",
//           "image": "https://imdb-api.com/images/original/MV5BYWJmYWJmNWMtZTBmNy00M2MzLTg5ZWEtOGU5ZWRiYTE0ZjVmXkEyXkFqcGdeQXVyNzkyOTM2MjE@._V1_Ratio0.7273_AL_.jpg",
//           "title": "Inception",
//           "description": "(2014) (Short)"
//       },
//     ]
//     };
const grabMovieData = (movieName: string) => {
  axios.get(`https://imdb-api.com/en/API/SearchMovie/k_4pd82hff/${movieName}`)
    .then((response: object) => {
      console.log(response);
    }).catch((error: any) => {
      console.log(error);
    });
}

// {
//   "imDbId": "tt1375666",
//   "title": "Inception",
//   "fullTitle": "Inception (2010)",
//   "type": "Movie",
//   "year": "2010",
//   "videoId": "vi2959588889",
//   "videoTitle": "10th Anniversary Dream Trailer",
//   "videoDescription": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
//   "thumbnailUrl": "https://m.media-amazon.com/images/M/MV5BMTQ1ZmIzOTAtNDcwZi00NDVkLWE4NWItYWNhZGY1MmVlZGU0XkEyXkFqcGdeQWRvb2xpbmhk._V1_.jpg",
//   "uploadDate": "08/02/2020 21:45:05",
//   "link": "https://www.imdb.com/video/vi2959588889",
//   "linkEmbed": "https://www.imdb.com/video/imdb/vi2959588889/imdb/embed",
//   "errorMessage": ""
// }


const grabMovieTrailer = (movieId: string) => {
  axios.get(`https://imdb-api.com/en/API/MovieVideos/k_4pd82hff/${movieId}`)
    .then((response: object) => {
      console.log(response);
    }).catch((error: any) => {
      console.log(error);
    });
}

