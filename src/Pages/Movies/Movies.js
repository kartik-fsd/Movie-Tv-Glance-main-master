import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleComponent from "../../Component/SingleComponent/SingleComponent";
import CustomPagination from "../../Component/pagination";
import useGenre from "../../hooks/useGenre";
import Genres from "../../Component/Genres/Genres";
import useLoading from "../../loading/Useloader";
import Loader from "../../loading/loader";

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const { loading, showLoading, hideLoading } = useLoading();
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    showLoading(true); // Set loading to true while fetching data
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {loading ? ( // Display loading indicator if loading is true
           <Loader  /> 
        ) : (
          content &&
          content.map((c) => (
            <SingleComponent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))
        )}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} totalPage={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
