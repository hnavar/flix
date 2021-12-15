import React, {useState, useEffect} from "react";
import axios from 'axios';
import Carousel from "react-material-ui-carousel";
import CarouselItem from './CarouselItem';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

const Home = (props: any) => {
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);
  // genreMovies could be an object with {genre: arrMoviesGenre}
  const [genreMovies, setGenreMovies] = useState({});
  // directorsMovies is an object with {director: arrMoviesDirector}
  const [directorsMovies, setDirectorsMovies] = useState({});
  // actorsMovies is an object with {director: arrMoviesActor}
  const [actorsMovies, setActorsMovies] = useState({});

  interface MovieStorage {
    [key: string]: object[];
  }

  const getGenres = () => {
    axios.get('/api/genres/:id')
      .then(({data}) => setGenres(data))
      .catch(() => console.log('failed to get genres'))
  };

  const getDirectors = () => {
    axios.get('/api/directors/:id')
      .then(({data}) => setDirectors(data))
      .catch(() => console.log('failed to get directors'))
  };

  const getActors = () => {
    axios.get('/api/actors/:id')
      .then(({data}) => setActors(data))
      .catch(() => console.log('failed to get actors'))
  };

  const getGenreMovies = () => {
    const movies: MovieStorage = {};
    genres.forEach((genre => {
      axios.get('/api/movies/genres/' + genre)
        .then(({data}) => movies[genre] = data)
        .catch(() => console.log('failed to get movies by genre'))
        .finally(() => setGenreMovies(movies));
    }))
  };

  const getActorMovies = () => {
    const movies: MovieStorage = {};
    actors.forEach((actor => {
      axios.get('/api/movies/actors/' + actor)
        .then(({data}) => movies[actor] = data)
        .catch(() => console.log('failed to get movies by Actor'))
        .finally(() => setActorsMovies(movies));
    }))
  };

  const getDirectorMovies = () => {
    const movies: MovieStorage = {};
    directors.forEach((director => {
      axios.get('/api/movies/directors/' + director)
        .then(({data}) => movies[director] = data)
        .catch(() => console.log('failed to get movies by director'))
        .finally(() => setDirectorsMovies(movies));
    }))
  };

  useEffect(() => {
    getGenres();
    getActors();
    getDirectors();
  }, [])

  useEffect(() => {
    getGenreMovies();
  }, [genres])

  useEffect(() => {
    getActorMovies();
  }, [actors]);

  useEffect(() => {
    getDirectorMovies();
  }, [directors])

  const buildCarousel = (moviesObj: MovieStorage) => {
    return Object.keys(moviesObj).map((key) => {
      return (
        <Carousel
          className={`${key}-carousels`}
          NextIcon={<ArrowForwardIosOutlinedIcon />}
          PrevIcon={<ArrowBackIosOutlinedIcon />}
          animation='slide'
          autoPlay={false}
        >
          <h2 className="carousel-categories">{key}</h2>
          {
            moviesObj[key].map((movie: object) => <CarouselItem item={movie} />)
          }
        </Carousel>
      );
    });
  }

  return (
    <>
      <div className="genre-carousels">
        {!!Object.keys(genreMovies) && buildCarousel(genreMovies)}
      </div>
      <div className="actors-carousels">
        {!!Object.keys(actorsMovies) && buildCarousel(actorsMovies)}
      </div>
      <div className="directors-carousels">
        {!!Object.keys(directorsMovies) && buildCarousel(directorsMovies)}
      </div>
    </>
  )
};

export default Home;
