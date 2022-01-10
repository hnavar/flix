import React, {FC, useState, useEffect} from "react";
import axios from 'axios';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import CarouselItem from './CarouselItem';

// using props:any because I'm not sure if I'll pass props to this component
const Home:FC = (props: any) => {
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});
  const [directorsMovies, setDirectorsMovies] = useState({});
  const [actorsMovies, setActorsMovies] = useState({});

  interface MovieObj {
    id: number;
    movie_id: string;
    title: string;
    release_date: string;
    description: string;
    trailer_url: string;
    thumbnailUrl: string;
    createdAt: string;
    updatedAt: string;
  }
  interface MovieStorage {
    [key: string]: MovieObj[];
  }

  interface Actor {
    id: number;
    actor_name: string
  }

  interface Director {
    id: number;
    director_name: string;
  }

  interface Genre {
    id: number;
    genre: string;
  }

  const userId = props.user.id;

  const getGenres = () => {
    // axios.get(`/api/users/genres/${userId}`)
    axios.get('/api/genres')
      .then(({data}) => setGenres(data))
      .catch(() => console.log('failed to get genres'));
  };

  const getDirectors = () => {
    // axios.get(`/api/users/directors/${userId}`)
    axios.get(`/api/directors/`)
      .then(({data}) => setDirectors(data))
      .catch(() => console.log('failed to get directors'));
  };

  const getActors = () => {
    // axios.get(`/api/users/actors/${userId}`)
    axios.get(`/api/actors`)
      .then(({data}) => setActors(data))
      .catch(() => console.log('failed to get actors'));
  };

  const getGenreMovies = () => {
    const movies: MovieStorage = {};
    genres.forEach(((genre: Genre) => {
      axios.get('/api/movies/genres/' + genre.id)
        .then(({data}) => movies[genre.genre] = data)
        .catch(() => console.log('failed to get movies by genre'))
        .finally(() => setGenreMovies(movies));
    }));
  };

  const getActorMovies = () => {
    const movies: MovieStorage = {};
    actors.forEach(((actor: Actor) => {
      axios.get('/api/movies/actors/' + actor.id)
        .then(({data}) => movies[actor.actor_name] = data)
        .catch(() => console.log('failed to get movies by Actor'))
        .finally(() => setActorsMovies(movies));
    }));
  };

  const getDirectorMovies = () => {
    const movies: MovieStorage = {};
    directors.forEach(((director: Director) => {
      axios.get('/api/movies/directors/' + director.id)
        .then(({data}) => movies[director.director_name] = data)
        .catch(() => console.log('failed to get movies by director'))
        .finally(() => setDirectorsMovies(movies));
    }));
  };

  useEffect(() => {
    getGenres();
    getActors();
    getDirectors();
  }, []);

  useEffect(() => {
    !!genres.length && getGenreMovies();
  }, [genres]);

  useEffect(() => {
    !!actors.length && getActorMovies();
  }, [actors]);

  useEffect(() => {
    !!directors.length && getDirectorMovies();
  }, [directors]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const buildCarousel = (moviesObj: MovieStorage) => {
    return Object.keys(moviesObj).slice(0, 7).map((key) => {
      return (
        <div className="carousel-categories">
          <h2
            style={{
              color: "gold"
            }}
          >{key}</h2>
          <Carousel
            className={`${key}-carousels`}
            responsive={responsive}
            infinite={true}
            showDots={true}
            partialVisible={true}
            ssr={true}
          >
            {
              moviesObj[key].map((movie: MovieObj) => <CarouselItem item={movie} key={movie.movie_id} />)
            }
          </Carousel>
        </div>
      );
    });
  }

  return (
    <div className='home-view'
      style={{
        margin: '10px'
      }}
    >
      <div className="genre-carousels">
        {!!Object.keys(genreMovies) && buildCarousel(genreMovies)}
      </div>
      <div className="directors-carousels">
        {!!Object.keys(directorsMovies) && buildCarousel(directorsMovies)}
      </div>
      <div className="actors-carousels">
        {!!Object.keys(actorsMovies) && buildCarousel(actorsMovies)}
      </div>
    </div>
  )
};

export default Home;
