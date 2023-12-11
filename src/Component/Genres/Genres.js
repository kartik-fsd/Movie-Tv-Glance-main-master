import axios from "axios";
import React, { useEffect } from "react";
import Chip from '@mui/material-next/Chip';

function Genres(props) {
  const handleAdd = (genre) => {
    props.setSelectedGenres([...props.selectedGenres, genre]);
    props.setGenres(props.genres.filter((g) => g.id !== genre.id));
    props.setPage(1);
  };

  const handleRemove = (genre) => {
    props.setSelectedGenres(
      props.selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    props.setGenres([...props.genres, genre]);
    props.setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    props.setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      props.setGenres({}); // unmounting
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var read = Array.from(props.genres);
  return (
    <div style={{ padding: "6px 0" }}>
      {props.selectedGenres.map((genre) => (
        <Chip
          label={genre.name}
          color="tertiary"
          variant="elevated"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
          sx={{margin:1 }}
        />
      ))}
      {read.map((genre) => (
        <Chip
          label={genre.name}
          key={genre.id}
          color="tertiary"
          variant="elevated"
          clickable
          size="small"
          onDelete={() => handleAdd(genre)}
          sx={{margin:1 }}
        />
      ))}
    </div>
  );
}

export default Genres;
