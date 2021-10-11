import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { CardMovie } from "../components/CardMovie";
export const useListMovies = ({ movies }) => {
  const navigation = useNavigation();

  const openMovie = useCallback(
    ({ movieId }) => {
      navigation.navigate("Details", {
        id: movieId,
      });
    },
    [navigation]
  );

  const renderMovie = useCallback(
    (movie) => {
      const { item } = movie;
      return (
        <CardMovie
          movie={item}
          openMovie={() => {
            openMovie({ movieId: item.id });
          }}
        />
      );
    },
    [movies]
  );
  return { renderMovie };
};
