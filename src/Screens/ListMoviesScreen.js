import React from "react";
import { ListMovies } from "../components/ListMovies";
import { useGetListMovies } from "../CustomHooks/ListMoviesScreen/useGetListMovies";

export const ListMoviesScreen = () => {
  const { movies, loadMore, onRefresh, isLoading } = useGetListMovies();
  return (
    <ListMovies
      movies={movies}
      loadMore={loadMore}
      refresh={isLoading}
      onRefresh={onRefresh}
    />
  );
};
