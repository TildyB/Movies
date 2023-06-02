import { useDisclosure} from '@chakra-ui/hooks'
import { useEffect, useState } from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
  } from '@chakra-ui/react'
import axios from 'axios'
import { getMovies } from '../utils/getMovies'

import AddNewMovie from './AddNewMovie'

const NewMovies = ({setMovieList,setFilteredMovieList}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newMovie, setNewMovie] = useState({
      title: "",
      overview: "",
      age_restrictions: "",
      vote_average: "",
      poster_path: "",
      backdrop_path: "",
    });

    const [canSend, setCanSend] = useState(false)

    const saveMovie = async() => {
      try{
        const cleanedMovie = JSON.parse(JSON.stringify(newMovie));
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/films`, cleanedMovie)
        console.log(response)
        if(response.status === 201){
          const data = await getMovies()
          setMovieList(data)
          setFilteredMovieList(data)
        }

        onClose()
      }
      catch(error){
        console.log(error)
      }

    }
    useEffect(() => {
      if(newMovie.title.length > 4 && newMovie.poster_path !== "" && newMovie.description !== "" && newMovie.age_restrictions !== "" && newMovie.rating !== ""){
        setCanSend(true)
      }
    }, [newMovie]);
    return (
        <>
        <Button  onClick={onOpen} colorScheme="blue" variant="solid" >Add new Movie</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <AddNewMovie {...{newMovie,setNewMovie}}/>
          </ModalBody>

          <ModalFooter>
          <Button isDisabled={!canSend} colorScheme='blue' mr={3} onClick={saveMovie}>
              Save
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
    }

export default NewMovies;