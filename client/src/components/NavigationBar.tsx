import React, { useState, FC, KeyboardEvent, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Drawer, MenuList, MenuItem, ListItemText, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Paths from '../Routes';
import Logout from './Logout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'red',
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    main: {
      color: theme.palette.text.primary,
      background: theme.palette.background.paper
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      width: 300,
    },
    fullList: {
      width: 'auto',
    },
  }),
);

const withRouter = (Component: FC) => {
  const Wrapper = (props: any) => {
    const history = useNavigate();
    return (
      <Component
        history={history}
        {...props}
        />
    );
  };
  return Wrapper;
};

const NavigationBar:FC = (props: any) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open: boolean) => (
    event: KeyboardEvent | MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const activeRoute = (routeName: string) => {
    return props.history.name === routeName;
  }

  return (
    <div>
      <div className={classes.root}>
        <AppBar className={classes.main} position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Flixar
            </Typography>
            {props.themeSwitch}
          </Toolbar>
        </AppBar>
      </div>
      <Drawer classes={{ paper: classes.drawer }} open={isOpen} onClose={toggleDrawer(false)}>
        <div
          className={classes.fullList}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <MenuList>
            {Paths.map((prop, key) => {
              return (
                <NavLink to={prop.path} style={{ textDecoration: 'none'}} key={key}>
                  <MenuItem className={classes.main} selected={activeRoute(prop.path)}>
                    <ListItemText primary={prop.sidebarName} />
                  </MenuItem>
                </NavLink>
              );
            })}
            <Logout />
          </MenuList>
        </div>
      </Drawer>
    </div>
  );
};

export default withRouter(NavigationBar);
