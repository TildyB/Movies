import styles from "./MovieDrawer.module.css";

// Movie Drawer Component - displays the movie details

const MovieDrawer = ({ movie }) => {
  return (
    <div
      style={{
        height: "100%",
        minHeight: "100%",
        background: `linear-gradient(0deg, #032541d5, #032541d5), url(https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.backdrop_path})`,
        backgroundSize: "cover",
      }}
      className={styles.drawerBackground}
    >
      <div className={styles.drawerContainer}>
        <div className={styles.leftReviews}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
          />
          <h3>{movie.title}</h3>
          <h4>
            {" "}
            <strong>Age Restriction:</strong> {movie.age_restrictions}
          </h4>
          <h5>
            {" "}
            <strong>Avereage vote:</strong> {movie.vote_average}
          </h5>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDrawer;
