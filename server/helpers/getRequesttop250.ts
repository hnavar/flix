import axios from 'axios';
const { IMDB_KEY } = process.env;
import app from '../index'

app.get('/IMDBTop200', (req: any, res: any) => {
    // axios
    axios(`https://imdb-api.com/en/API/Top250Movies/${IMDB_KEY}`)
    .then((data: any) => {
        // const top5movies = data.data.items;
        return data.data.items;
    })
    .then((data: any) => {
        const specificMovieInfoFunc = (movie: any) => axios(`https://imdb-api.com/en/API/Title/${IMDB_KEY}/${movie.id}`)
            .then((data: any) => {
                return data.data;
            })
        const top5map = Promise.all(data.map(async (movie: any) => await specificMovieInfoFunc(movie))).then((data: any) => data)
        top5map.then((data: any) => {
            // works
            // console.log(data)
            return data.map((movie: { id: any; title: any; plot: any; releaseDate: any; genreList: any; stars: any; directors: any; }) => {
                return {
                    movie_id: movie.id,
                    title: movie.title,
                    // trailer_url: movie,
                    description: movie.plot,
                    release_date: movie.releaseDate,
                    genres: movie.genreList,
                    actors: movie.stars,
                    directors: movie.directors
                }
            })
        })
        .then((data: any) => {
            res.status(200).json(data)
        })
        // res.sendStatus(200)
    })
});