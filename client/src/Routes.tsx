import Home from "./components/Home";
import SearchMovie from "./components/movieSearch";
import Twitter from "./components/Twitter";
import MovieByRating from "./components/MovieByRatings";
import MoviesByPerson from "./components/MoviesByPerson";
import Profile from './components/Profile';
import Discover from "./components/Discover";
import SearchByMoviePoster from "./components/SearchByMoviePoster";
import Logout from './components/Logout';

const Paths = [
  {
    path: '/',
    sidebarName: 'Home',
    component: Home
  },
  {
    path: 'search',
    sidebarName: 'Search',
    component: SearchMovie
  },
  {
    path: 'twitter',
    sidebarName: 'Twitter',
    component: Twitter
  },
  {
    path: 'discover',
    sidebarName: 'Discover',
    component: Discover
  },
  {
    path: 'rating',
    sidebarName: 'Rating',
    component: MovieByRating
  },
  {
    path: 'person',
    sidebarName: 'Actors/Directors',
    component: MoviesByPerson
  },
  {
    path: 'profile',
    sidebarName: 'Profile',
    component: Profile
  },
  {
    path: 'poster',
    sidebarName: 'Search by movie poster',
    component: SearchByMoviePoster
  }
];

export default Paths;
