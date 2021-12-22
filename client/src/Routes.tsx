import React, {FC} from 'react';
import Home from './components/Home'
import Twitter from './components/Twitter';
import SearchMovie from './components/movieSearch';

// const Home:FC = () => {
//   return (
//     <h1>Home</h1>
//   );
// };

// const Search:FC = () => {
//   return (
//     <h1>Search</h1>
//   );
// };

// const Twitter:FC = () => {
//   return (
//     <h1>Twitter</h1>
//   );
// };

// const Profile:FC = () => {
//   return (
//     <h1>Profile</h1>
//   );
// };

const Routes = [
  {
    path: '/',
    sidebarName: 'Home',
    component: Home
  },
  {
    path: '/search',
    sidebarName: 'Search',
    component: SearchMovie
  },
  {
    path: '/twitter',
    sidebarName: 'Twitter',
    component: Twitter
  },
  // {
  //   path: 'profile',
  //   sidebarName: 'Profile',
  //   component: Profile
  // }
];

export default Routes;