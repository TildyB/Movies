import axios from "axios"



export const getMovies = async() =>{
    const url = `${import.meta.env.VITE_API_URL}/filmek`
    try{
        const result = await axios.get(url)
        return result.data
    }catch(err){
        console.log(err)
    }
}
