import * as React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import { IMAGE_PATH } from "../../build.config";
const { width } = Dimensions.get("window");
export const CardMovie = ({ movie, openMovie }) => {
  return (
    <TouchableOpacity onPress={openMovie} style={styles.item}>
      <Text style={styles.title}>{movie.title}</Text>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={styles.image}
        source={{ uri: IMAGE_PATH + movie.backdrop_path }}
      />
      <Text style={styles.overview} numberOfLines={2}>
        {movie.overview}
      </Text>
    </TouchableOpacity>
  );
};

const styles: any = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    height: width / 2,
  },
  errorContainer: {
    padding: 30,
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
  },
  item: {
    backgroundColor: "#113",
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginHorizontal: 20,
  },
  overview: {
    marginTop: 10,
    marginHorizontal: 10,
    color: "white",
    fontSize: 18,
  },
});
