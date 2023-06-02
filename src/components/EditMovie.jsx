import { useDisclosure } from "@chakra-ui/hooks";
import {  useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { getMovies } from "../utils/getMovies";
import EditMovieModal from "./EditMovieModal";

// Edit Movie Modal Component - displays the edit movie modal and handles the edit movie functionality

const EditMovie = ({ movie, setMovieList, setFilteredMovieList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  const [editedMovie, setEditiedMovie] = useState({
    title: movie.title,
    overview: movie.overview,
    age_restrictions: movie.age_restrictions,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
  });

  // Edit movie function - sends a put request to the API with the edited movie data
  const editMovie = async () => {
    console.log(editedMovie);
    try {
      const cleanedEditedMovie = JSON.parse(JSON.stringify(editedMovie));
      const id = JSON.parse(JSON.stringify(movie._id));
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/films/${id}`,
        cleanedEditedMovie
      );
      console.log(response);
      if (response.status === 200) {
        const data = await getMovies();
        setMovieList(data);
        setFilteredMovieList(data);
        toast({
          title: "Movie edited successfully.",
          description: "We've edited the movie for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      }

      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="xs">
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <EditMovieModal {...{ movie, editedMovie, setEditiedMovie }} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={editMovie}>
              Change
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditMovie;
