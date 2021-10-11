import { useDispatch, useSelector } from "react-redux";
import {
  isLoadingSelector,
  moviesSelector,
} from "../../redux/store/selectors/moviesSelector";
import { useCallback, useEffect } from "react";
import {
  getMoviesThunk,
  loadMoreMoviesThunk,
} from "../../redux/store/actions/movieActions";
import { usePageAndCount } from "../usePageAndCount";

export const useGetListMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector(moviesSelector);
  const { page, pageCount } = usePageAndCount();
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(getMoviesThunk());
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoading) {
      if (page < pageCount) {
        dispatch(loadMoreMoviesThunk(page));
      }
    }
  }, [dispatch, isLoading, page, pageCount]);

  const onRefresh = useCallback(() => {
    dispatch(getMoviesThunk());
  }, [dispatch]);

  return { movies, loadMore, isLoading, onRefresh };
};
