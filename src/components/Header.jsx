import { Select} from "@chakra-ui/react";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import NewMovies from "./NewMovies";

const Header = ({ movieList, setFilteredMovieList, setMovieList }) => {

  const [ageRestrictionsArray, setAgeRestrictionsArray] = useState([]);

  // Fill up the dropdown with the age restrictions
  useEffect(() => {
    const ageRestrictionsArray = [
      ...new Set(movieList.map((movie) => movie.age_restrictions)),
    ];

    setAgeRestrictionsArray(ageRestrictionsArray);
  }, [movieList]);

  // Handle the select change
  const handleSelectChange = (e) => {
    const ageRestriction = e.target.value;
    console.log(ageRestriction);
    if (ageRestriction === "All Movies") return setFilteredMovieList(movieList);
    else {
      const filteredMovies = movieList.filter(
        (movie) => movie.age_restrictions === ageRestriction
      );
      setFilteredMovieList(filteredMovies);
    }
  };

  return (
    <div className={styles.headerContainer}>
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
        alt=""
        className={styles.logoImg}
      />
      <div className={styles.rightHeaderDiv}>    
        <Select width="200px" colorScheme={"red 600"} onChange={handleSelectChange}>
          <option value="All Movies">All Movies</option>
          {ageRestrictionsArray.map((ageRestriction) => (
            <option key={ageRestriction} index={ageRestriction} value={ageRestriction}>
              {ageRestriction}
            </option>
          ))}
        </Select>
        <NewMovies {...{ setMovieList, setFilteredMovieList }} />
      </div>
    </div>
  );
};

export default Header;
