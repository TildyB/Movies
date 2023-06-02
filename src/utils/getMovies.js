import axios from "axios"



export const getMovies = async() =>{
    const url = 'https://crudcrud.com/api/b11a0e31ef7142c2bfb3d25950051e96/filmek'
    try{
        const result = await axios.get(url)
        return result.data
    }catch(err){
        console.log(err)
    }
}
