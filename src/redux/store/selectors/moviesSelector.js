import { createSelector } from "reselect";

export const moviesSelector = (state) => {
  return state.movieAPI.movies;
};
export const pageSelector = (state) => {
  return state.movieAPI.page;
};
export const pageCountSelector = (state) => {
  return state.movieAPI.pageCount;
};
export const isLoadingSelector = (state) => {
  return state.movieAPI.isLoading;
};
const moviesDetailsSelector = (state) => {
  return state.movieAPI.moviesDetails;
};
export const favouritesSelector = (state) => {
  return state.movieAPI.idFavouriteMovies;
};

export const favouriteMoviesSelector = createSelector(
  moviesSelector,
  favouritesSelector,
  (movies, favourites) => {
    return favourites.reduce((prev, itemF) => {
      const tt = movies.filter((item) => item.id === itemF);
      return [...prev, ...tt];
    }, []);
  }
);

export const movieDetailsSelector = (id) => (state) => {
  const movies = moviesDetailsSelector(state);
  return movies.find((item) => {
    return item.id === id;
  });
};
