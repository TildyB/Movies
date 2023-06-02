import { useEffect, useState } from "react";
import styles from "./AddNewMovie.module.css";
import axios from "axios";
import {
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  Select,
} from "@chakra-ui/react";

// New Movie Modal

const AddNewMovie = ({ newMovie, setNewMovie }) => {
  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [foundMovie, setFoundMovie] = useState(false);

  // Get movie suggestions from API and set them to state if the title is longer than 4 characters

  useEffect(() => {
    const addNewTitle = async () => {
      if (newMovie.title.length > 4 && foundMovie === false) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=fe81cd2556cf074a1a365d166ccba87c&language=en-US&query=${newMovie.title}&page=1&include_adult=false`
        );
        setMovieSuggestions(response.data.results);
      } else {
        setMovieSuggestions([]);
      }
      if (newMovie.title.length < 4) {
        setFoundMovie(false);
        setNewMovie((prevState) => ({
          ...prevState,
          poster_path: " movie.poster_path",
        }));
      }
    };
    addNewTitle();
  }, [newMovie.title]);

  return (
    <>
      <h1 className={styles.header}>Add new movie</h1>
      <div>
        <h2>Movie Title</h2>
        <Input
          placeholder="Add movie title"
          value={newMovie.title}
          onChange={(e) => {
            setNewMovie((prevState) => ({
              ...prevState,
              title: e.target.value,
            }));
          }}
        />
        <h5 className={styles.min}>min 4 characters</h5>
      </div>
      {movieSuggestions.length > 0 &&
        movieSuggestions.map((movie,index) => (
          <div key={index}>
            <button
              onClick={(e) => {
                setNewMovie((prevState) => ({
                  ...prevState,
                  poster_path: movie.poster_path,
                  title: movie.original_title,
                  backdrop_path: movie.backdrop_path,
                })),
                  setFoundMovie(true);
              }}
            >
              {movie.title}
            </button>
          </div>
        ))}
      <div>
        <h2>Movie Description</h2>
        <Textarea
          placeholder="Add description"
          onChange={(e) => {
            setNewMovie((prevState) => ({
              ...prevState,
              overview: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <h2>Movie Rating</h2>
        <NumberInput>
          <NumberInputField
            placeholder="Enter rating"
            onChange={(e) => {
              setNewMovie((prevState) => ({
                ...prevState,
                vote_average: e.target.value,
              }));
            }}
          />
        </NumberInput>
      </div>
      <div>
        <h2>Age Ristriction</h2>
        <Select
          placeholder="Select option"
          onChange={(e) => {
            setNewMovie((prevState) => ({
              ...prevState,
              age_restrictions: e.target.value,
            }));
          }}
        >
          <option value="No One 17 and Under Admitted">
            No One 17 and Under Admitted
          </option>
          <option value="General Audiences - All ages admitted">
            General Audiences - All ages admitted
          </option>
          <option value="Parents Strongly Cautioned">
            Parents Strongly Cautioned
          </option>
          <option value="Parental Guidance Suggested">
            Parental Guidance Suggested
          </option>
        </Select>
      </div>
      <div className={styles.poster}>
      {newMovie.poster_path.length > 0 && (
        <img
          src={`https://image.tmdb.org/t/p/w200/${newMovie.poster_path}`}
          alt=""
        />
      )}
      </div>
    </>
  );
};

export default AddNewMovie;
