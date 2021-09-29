import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useSelector } from "react-redux";
import {
  favouriteMoviesSelector,
  pageCountSelector,
  pageSelector,
} from "../redux/store/selectors/moviesSelector";
import { ListMovies } from "../components/ListMovies";

export const ListFavouritesMoviesScreen = () => {
  const [text, setText] = useState();
  const movies = useSelector(favouriteMoviesSelector);
  const page = useSelector(pageSelector);
  const pageCount = useSelector(pageCountSelector);
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
            !!(item.title.toLowerCase().indexOf(value.toLowerCase()) + 1)
        )
      );
    },
    [movies]
  );

  return (
    <ListMovies
      movies={moviesFilter}
      page={page}
      pageCount={pageCount}
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={inputText}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    backgroundColor: "white",
    fontSize: 24,
    paddingHorizontal: 10,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 20,
  },
});
