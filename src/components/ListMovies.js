import { Dimensions, FlatList, RefreshControl, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { CardMovie } from "./CardMovie";
import {
  getMoviesThunk,
  loadMoreMoviesThunk,
} from "../redux/store/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingSelector } from "../redux/store/selectors/moviesSelector";

const { width } = Dimensions.get("window");
const keyExtractor = (item, page) => item.id.toString() + page;

export const ListMovies = ({
  movies,
  ListHeaderComponent,
  page,
  pageCount,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(isLoadingSelector);

  const openMovie = useCallback(
    ({ movieId }) => {
      navigation.navigate("Details", {
        id: movieId,
      });
    },
    [navigation]
  );

  const loadMore = useCallback(() => {
    if (!isLoading) {
      if (page < pageCount) {
        dispatch(loadMoreMoviesThunk(page));
      }
    }
  }, [dispatch, isLoading, page, pageCount]);

  const renderPicture = useCallback(
    (movie) => {
      return (
        <CardMovie
          movie={movie.item}
          imageStyle={styles.image}
          openMovie={() => {
            openMovie({ movieId: movie.item.id, index: movie.index });
          }}
        />
      );
    },
    [movies]
  );

  const onRefresh = useCallback(() => {
    dispatch(getMoviesThunk());
  }, [dispatch]);

  return (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={1}
      ListHeaderComponent={ListHeaderComponent}
      refreshing={false}
      style={styles.page}
      data={movies}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={isLoading}
          colors={["#fa6f44"]}
          tintColor="#f28e26"
        />
      }
      renderItem={renderPicture}
      keyExtractor={keyExtractor}
      onEndThreshold={2}
    />
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "grey",
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: width / 2,
  },
  item: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
