import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { useListMovies } from "../CustomHooks/useListMovies";
import { HeaderHiding } from "./HeaderHiding";
import { useHidingHeader } from "../CustomHooks/useHidingHeader";

const keyExtractor = (item, page) => item.id.toString() + page;

export const ListMovies = ({
  movies,
  ListHeaderComponent,
  loadMore,
  onRefresh,
  refresh,
}) => {
  const { renderMovie } = useListMovies({ movies });
  const { translateY, scrollBeginDrag, scrollEndDrag } = useHidingHeader({
    ListHeaderComponent,
  });

  return (
    <>
      <HeaderHiding
        ListHeaderComponent={ListHeaderComponent}
        translateY={translateY}
      />
      <FlatList
        onEndReached={loadMore}
        onRefresh={onRefresh}
        onScrollBeginDrag={scrollBeginDrag}
        onScrollEndDrag={scrollEndDrag}
        onEndReachedThreshold={1}
        contentContainerStyle={ListHeaderComponent ? { paddingTop: 50 } : null}
        refreshing={refresh}
        style={styles.page}
        data={movies}
        renderItem={renderMovie}
        keyExtractor={keyExtractor}
        onEndThreshold={2}
      />
    </>
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
  item: {
    padding: 5,
  },
  animateHeader: {
    position: "absolute",
    marginHorizontal: "1%",
    width: "98%",
    alignItems: "center",
    // backgroundColor: "green",
    backgroundColor: "transparent",
    zIndex: 50,
    elevation: 50,
  },
});
