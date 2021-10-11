import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { ListMovies } from "../components/ListMovies";
import { useGetFavouriteListMovies } from "../CustomHooks/ListFavouritesMoviesScreen/useGetFavouriteListMovies";

export const ListFavouritesMoviesScreen = () => {
  const { moviesFilter, text, inputText } = useGetFavouriteListMovies();

  return (
    <ListMovies
      movies={moviesFilter}
      stickyHeaderHiddenOnScroll={true}
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
    width: "100%",
    paddingHorizontal: 10,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 20,
  },
});
