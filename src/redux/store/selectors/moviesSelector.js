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
const moviesDetailsSelector = (state) => {
  return state.movieAPI.moviesDetails;
};
const favouritesSelector = (state) => {
  return state.movieAPI.idFavouriteMovies;
};

export const favouriteMoviesSelector = createSelector(
  moviesSelector,
  favouritesSelector,
  (movies, favourites) => {
    const arrFavoriteMovies = favourites.reduce((prev, itemF) => {
      const tt = movies
        .filter((item) => item.id === itemF)
        .reduce((prev, item) => {
          return [...prev, { ...item, isFavourite: true }];
        }, []);
      return [...prev, ...tt];
    }, []);
    return arrFavoriteMovies;
  }
);

export const moviesDetailsFavouritesSelector = createSelector(
  moviesDetailsSelector,
  favouritesSelector,
  (movies, favourites) => {
    const arrFavoriteMovies = movies.reduce((prev, itemD) => {
      const favour = favourites.find((item) => item === itemD.id);
      if (favour) {
        return [...prev, { ...itemD, isFavourite: true }];
      }
      return [...prev, itemD];
    }, []);
    return arrFavoriteMovies;
  }
);

export const movieDetailsSelector = (id) => (state) => {
  const movies = moviesDetailsFavouritesSelector(state);
  return movies.find((item) => {
    return item.id === id;
  });
};
