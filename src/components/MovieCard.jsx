import React from "react";
import styles from "./MovieCard.module.css";
import axios from "axios";
import { getMovies } from "../utils/getMovies";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import MovieDrawer from "./MovieDrawer";
import EditMovie from "./EditMovie";

// Movie Card Component - displays the movie card

function MovieCard({ movie, isLoggedIn, setMovieList, setFilteredMovieList }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // Delete movie from API and update the movie list

  const deleteMovie = async () => {
    const id = JSON.parse(JSON.stringify(movie._id));
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/films/${id}`
      );
      if (response.status === 200) {
        const data = await getMovies();
        setMovieList(data);
        setFilteredMovieList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.card}>
        <div onClick={onOpen}>
          <img
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
            alt=""
          />
          <div className={styles.vote}>
            {Math.round(movie.vote_average * 10) / 10}
          </div>
          <h4>{movie.title}</h4>
          <div className={styles.restriction}>
            <p>Restriction: {movie.age_restrictions}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button onClick={deleteMovie} colorScheme="red" size="xs">
            Delete
          </Button>
          <EditMovie
            {...{ movie, isLoggedIn, setMovieList, setFilteredMovieList }}
          />
        </div>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" variant="solid" />
          <MovieDrawer {...{ onClose, movie, isLoggedIn }} />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MovieCard;
