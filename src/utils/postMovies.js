import axios from "axios"
import movie from "../assets/movie.json"
export  const postMovies = () =>{
    try{
        movie.map( async(item)=>{
            await axios.post('https://crudcrud.com/api/b11a0e31ef7142c2bfb3d25950051e96/filmek',item)
        })
    }catch(err){
        console.log(err)
    }
}