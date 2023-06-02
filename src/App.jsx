import { useEffect,useState,useContext } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import MovieCard from './components/MovieCard';
import { postMovies } from './utils/postMovies';
import { getMovies } from './utils/getMovies';
import styles from './App.module.css'
import { useToast } from '@chakra-ui/react'
import Header from './components/Header';
import movie from './assets/movie.json'
import axios from 'axios';


function App() {

  console.log(import.meta.env.VITE_API_URL)

  const [movieList, setMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);


  useEffect(()=>{
    if (!movieList.length) {
        const init = async () =>{
            const data = await getMovies()
            setMovieList(data)
            setFilteredMovieList(data)
        }
        init()
    }
}, [movieList])

  return (
    <>
                <Header {... {movieList,setFilteredMovieList, setMovieList}} />
            <div className={styles.mainDiv}>
            <div className={styles.container}>
                {movieList.length>0 && filteredMovieList.map(movie =>(

                <MovieCard key={movie.id}{...{movie,setMovieList,setFilteredMovieList}} />
                )
                )}
            </div>
            </div>
    </>
  )
}

export default App
