import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesThunk } from "../redux/store/actions/movieActions";
import { ListMovies } from "../components/ListMovies";
import {
  moviesSelector,
  pageCountSelector,
  pageSelector,
} from "../redux/store/selectors/moviesSelector";

export const ListMoviesScreen = () => {
  const dispatch = useDispatch();
  const movies = useSelector(moviesSelector);
  const page = useSelector(pageSelector);
  const pageCount = useSelector(pageCountSelector);

  useEffect(() => {
    dispatch(getMoviesThunk());
  }, []);

  return <ListMovies movies={movies} page={page} pageCount={pageCount} />;
};
