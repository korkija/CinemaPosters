import allSettled from "promise.allsettled";
import {
  getMovies,
  getMovieDetails,
  getVideosMovie,
} from "../../../api/moviesAPI";
import {
  GET_MOVIES,
  LOAD_MORE_MOVIES,
  IS_LOADING,
  LOAD_DETAILS_MOVIE,
  SET_FAVOURITE_MOVIES,
} from "../constants";

const setIsLoading = (isLoading) => ({ type: IS_LOADING, payload: isLoading });
const setMovies = (data) => ({ type: GET_MOVIES, payload: data });

export const getMoviesThunk = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await getMovies();
    dispatch(setMovies(data));
  } catch (e) {
    dispatch(setIsLoading(false));
  }
};
const setMoreMovies = (data) => ({ type: LOAD_MORE_MOVIES, payload: data });

export const loadMoreMoviesThunk = (page) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await getMovies(page + 1);
    dispatch(setMoreMovies(data));
  } catch (e) {
    dispatch(setIsLoading(false));
  }
};

const setFavourite = (idFavouriteMovies) => ({
  type: SET_FAVOURITE_MOVIES,
  payload: idFavouriteMovies,
});

export const setFavouriteMovie = (id) => async (dispatch, getState) => {
  let idFavouriteMovies = [...getState().movieAPI.idFavouriteMovies];
  const index = idFavouriteMovies.findIndex((item) => item === id);
  if (index + 1) {
    idFavouriteMovies.splice(index, 1);
    dispatch(setFavourite(idFavouriteMovies));
  } else {
    dispatch(setFavourite([...idFavouriteMovies, id]));
  }
};

const setMovieDetails = (data) => ({
  type: LOAD_DETAILS_MOVIE,
  payload: { data },
});

export const getMovieDetailsThunk = (id) => async (dispatch, getState) => {
  try {
    const moviesDetails = [...getState().movieAPI.moviesDetails];
    const index = moviesDetails.findIndex((item) => {
      return item.id === id;
    });
    if (!(index + 1)) {
      // const data = await getMovieDetails(id);
      const values = await allSettled([
        // const values = await Promise.allSettled([
        getMovieDetails(id),
        getVideosMovie(id),
      ]);
      console.log("11111 getMovieDetailsThunk", values);
      if (values[1].status === "fulfilled") {
        dispatch(
          setMovieDetails({
            ...values[0].value,
            videoList: values[1]?.value?.results,
          })
        );
      } else {
        dispatch(setMovieDetails(values[0].value));
      }
    }
  } catch (e) {
    console.log("getMovieDetailsThunk", e);
  }
};
