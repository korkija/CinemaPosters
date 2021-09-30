import {
  GET_MOVIES,
  LOAD_MORE_MOVIES,
  IS_LOADING,
  LOAD_DETAILS_MOVIE,
  SET_FAVOURITE_MOVIES,
} from "../constants";

const initialState = {
  movies: [],
  moviesDetails: [],
  idFavouriteMovies: [],
  page: 1,
  pageCount: null,
  token: "",
  tokenIsLoading: false,
  isLoading: false,
};

export const moviesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: payload.results,
        page: payload.page,
        pageCount: payload.total_pages,
        isLoading: false,
      };
    case LOAD_MORE_MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...payload.results],
        page: payload.page,
        pageCount: payload.total_pages,
        isLoading: false,
      };

    case IS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    case LOAD_DETAILS_MOVIE:
      return {
        ...state,
        moviesDetails: [...state.moviesDetails, payload.data],
      };
    case SET_FAVOURITE_MOVIES:
      return {
        ...state,
        idFavouriteMovies: payload,
      };
    default:
      return state;
  }
};
