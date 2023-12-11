import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper, createTheme } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider } from "@emotion/react";

function CustomBottomNavigation() {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });


  return (
    <ThemeProvider theme={darkTheme}>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation showLabels sx={{bgcolor:""}}>
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Trending"
        icon={<TrendingUpIcon />}
        selected={isActiveLink("/")}
      />
      <BottomNavigationAction
        component={Link}
        to="/Movies"
        label="Movie"
        icon={<MovieIcon />}
        selected={isActiveLink("/Movies")}
      />
      <BottomNavigationAction
        component={Link}
        to="/Tv Series"
        label="TV Series"
        icon={<TvIcon />}
        selected={isActiveLink("/Tv Series")}
      />
      <BottomNavigationAction
        component={Link}
        to="/Search"
        label="Search"
        icon={<SearchIcon />}
        selected={isActiveLink("/Search")}
      />
    </BottomNavigation>
    </Paper>
    </ThemeProvider>
  );
}

export default CustomBottomNavigation;
