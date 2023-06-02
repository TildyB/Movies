import axios from "axios"
import movie from "../assets/movie.json"
export  const postMovies = () =>{
    try{
        movie.map( async(item)=>{
            await axios.post(`${import.meta.env.VITE_API_URL}/films`,item)
        })
    }catch(err){
        console.log(err)
    }
}