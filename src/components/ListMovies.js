import { Dimensions, FlatList, RefreshControl, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "./ListItem";
import {
  getMoviesThunk,
  loadMoreMoviesThunk,
} from "../redux/store/actions/movieActions";

const { width } = Dimensions.get("window");
const keyExtractor = (item, page) => item.id.toString() + page;

export const ListMovies = ({
  movies,
  ListHeaderComponent,
  page,
  pageCount,
}) => {
  const navigation = useNavigation();
  const loadNewData = useRef(true);
  const [refresh, setRefresh] = useState(false);

  const openMovie = ({ movieId }) => {
    navigation.navigate("Details", {
      id: movieId,
    });
  };

  const loadMore = async () => {
    if (loadNewData.current) {
      if (page < pageCount) {
        loadNewData.current = false;
        await dispatch(loadMoreMoviesThunk(page));
        loadNewData.current = true;
      }
    }
  };

  const renderPicture = useCallback(
    (movie) => {
      return (
        <ListItem
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

  const onRefresh = async () => {
    setRefresh(true);
    await dispatch(getMoviesThunk());
    setRefresh(false);
  };
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
          refreshing={refresh}
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
