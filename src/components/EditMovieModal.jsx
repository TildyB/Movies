import {  useState } from "react";
import styles from "./EditMovieModal.module.css";
import {
  Input,
  NumberInput,
  NumberInputField,

  Textarea,
  Select,
} from "@chakra-ui/react";

// Edit Movie Modal - allows the user to edit the movie details and save them to the database

const EditMovieModal = ({ movie, editedMovie, setEditiedMovie }) => {

  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [foundMovie, setFoundMovie] = useState(false);

  return (
    <>
      <h1 className={styles.header2}>Edit movie</h1>
      <div>
        <h2> Edit Movie Title</h2>
        <Input
          placeholder="Add movie title"
          value={editedMovie.title}
          onChange={(e) => {
            setEditiedMovie((prevState) => ({
              ...prevState,
              title: e.target.value,
            }));
          }}
        />
      </div>
      {movieSuggestions.length > 0 &&
        movieSuggestions.map((movie,index) => (
          <div key={index}>
            <button
              onClick={(e) => {
                setEditiedMovie((prevState) => ({
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
        <h2 className={styles.header}>Movie Title</h2>
        <Textarea
          placeholder="Add description"
          value={movie.overview}
          onChange={(e) => {
            setEditiedMovie((prevState) => ({
              ...prevState,
              overview: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <h2>Movie Rating</h2>
        <NumberInput defaultValue={movie.vote_average}>
          <NumberInputField
            placeholder="Enter rating"
            onChange={(e) => {
              setEditiedMovie((prevState) => ({
                ...prevState,
                vote_average: e.target.value,
              }));
            }}
          />
        </NumberInput>
      </div>
      <div>
        <h2>Age Restriction</h2>
        <Select
          defaultValue={movie.age_restrictions}
          placeholder="Select option"
          onChange={(e) => {
            setEditiedMovie((prevState) => ({
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
      {movie.poster_path.length > 0 && (
        <img
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt=""
        />
      )}
      </div>
    </>
  );
};

export default EditMovieModal;
