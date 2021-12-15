const axios = require('axios');

// sample data
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


export const grabMovieData = (movieName: string) :any => {
   return axios.get(`https://imdb-api.com/en/API/SearchMovie/k_4pd82hff/${movieName}`)
    .then((data: any) => {
      return {data};
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


//will use above ID to grab
export const grabMovieTrailer = (movieId: string) => {
  axios.get(`https://imdb-api.com/en/API/MovieVideos/k_4pd82hff/${movieId}`)
    .then((data: object) => {
      console.log({data});
    }).catch((error: any) => {
      console.log(error);
    });
}





//problem with this API is I am struggling to find a list of the usable genres
//keywords: dramas, sports, action hero
// alternate history
// ambiguous ending
// americana
// anime
// anti hero
// b movie
// bank heist
// battle
// betrayal
// biker
// black comedy
// blockbuster
// bollywood
// breaking the fourth wall
// business
// caper
// car accident
// car chase
// car crash
// character name in title
// character's point of view camera shot
// chick flick
// coming of age
// competition
// conspiracy
// corruption
// criminal mastermind
// cult
// cult film
// cyberpunk
// dark hero
// deus ex machina
// dialogue driven
// dialogue driven storyline
// directed by star
// director cameo
// double cross
// dream sequence
// dystopia
// ensemble cast
// epic
// espionage
// experimental
// experimental film
// fairy tale
// famous line
// famous opening theme
// famous score
// fantasy sequence
// farce
// father daughter relationship
// father son relationship
// femme fatale
// fictional biography
// flashback
// french new wave
// futuristic
// good versus evil
// heist
// hero
// high school
// husband wife relationship
// idealism
// independent film
// investigation	
// kidnapping
// knight
// kung fu
// macguffin
// medieval times
// mockumentary
// monster
// mother daughter relationship
// mother son relationship
// multiple actors playing same role
// multiple endings
// multiple perspectives
// multiple storyline
// multiple time frames
// murder
// musical number
// neo noir
// neorealism
// ninja
// no background score
// no music
// no opening credits
// no title at beginning
// nonlinear timeline
// on the run
// one against many
// one man army
// opening action scene
// organized crime
// parenthood
// parody
// plot twist
// police corruption
// police detective
// post-apocalypse
// postmodern
// psychopath
// race against time
// redemption
// remake
// rescue
// road movie
// robbery
// robot
// rotoscoping
// satire
// self sacrifice
// serial killer
// shakespeare
// shootout
// show within a show
// slasher
// southern gothic
// spaghetti western
// spirituality
// spoof
// steampunk
// subjective camera
// superhero
// supernatural
// surprise ending
// swashbuckler
// sword and sandal
// tech-noir
// time travel
// title spoken by character
// told in flashback
// vampire
// virtual reality
// voice over narration
// whistleblower
// wilhelm scream
// wuxia
// zombie
export const grabMoviesByKeyword = (keyword: string) => {
  axios.get(`https://imdb-api.com/en/API/Keyword/k_4pd82hff/${keyword}`)
    .then((data: object) => {
      console.log({data});
    }).catch((error: any) => {
      console.log(error);
    });
}

// {
//   "keyword": "sports",
//   "items": [
//       {
//           "id": "tt9777666",
//           "title": "The Tomorrow War",
//           "year": "(2021)",
//           "image": "https://imdb-api.com/images/original/MV5BNTI2YTI0MWEtNGQ4OS00ODIzLWE1MWEtZGJiN2E3ZmM1OWI1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_Ratio0.6800_AL_.jpg",
//           "imDbRating": "6.6"
//       },
//       {
//           "id": "tt4209788",
//           "title": "Molly's Game",
//           "year": "(2017)",
//           "image": "https://imdb-api.com/images/original/MV5BNTkzMzRlYjEtMTQ5Yi00OWY3LWI0NzYtNGQ4ZDkzZTU0M2IwXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6800_AL_.jpg",
//           "imDbRating": "7.4"
//       },
//       {
//           "id": "tt3398540",
//           "title": "Haikyuu!!",
//           "year": "(2014–2020)",
//           "image": "https://imdb-api.com/images/original/MV5BNzQ1MmJjZDUtMmI5OC00ZDk2LThkODQtODgwYmU0MTIzNDhmXkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_Ratio0.6800_AL_.jpg",
//           "imDbRating": "8.7"
//       },
//       {
//           "id": "tt7518786",
//           "title": "'83",
//           "year": "(2021)",
//           "image": "https://imdb-api.com/images/original/MV5BNTMyZTYyODYtMjUwNS00NmU1LWEzY2MtNjgxMjc3MjFiNWE0XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_Ratio0.6800_AL_.jpg",
//           "imDbRating": "-"
//       }
//     ]
// };

