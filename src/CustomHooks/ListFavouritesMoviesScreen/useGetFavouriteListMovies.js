import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { favouriteMoviesSelector } from "../../redux/store/selectors/moviesSelector";

export const useGetFavouriteListMovies = () => {
  const [text, setText] = useState("");
  const movies = useSelector(favouriteMoviesSelector);
  const [moviesFilter, setMoviesFilter] = useState(movies);

  useEffect(() => {
    inputText(text);
  }, [movies]);

  const inputText = useCallback(
    (value) => {
      setText(value);
      setMoviesFilter(
        movies.filter(
          (item) =>
            !!(item.title?.toLowerCase().indexOf(value.toLowerCase()) + 1)
        )
      );
    },
    [movies]
  );
  return { moviesFilter, text, inputText };
};
