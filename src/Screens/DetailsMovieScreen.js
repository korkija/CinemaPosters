import React from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";
import { IMAGE_PATH } from "../../build.config";
import { useForDetailsMovieScreen } from "../CustomHooks/DetailsMovieScreen/useDetailsMovie";

const { width } = Dimensions.get("window");

export const DetailsMovieScreen = ({ navigation, route }) => {
  const { movie, onPressVideo } = useForDetailsMovieScreen({
    navigation,
    id: route.params?.id,
  });

  if (!movie) return null;
  return (
    <ScrollView style={styles.container}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.imageStyle}
        source={{
          uri: IMAGE_PATH + movie.poster_path,
        }}
      />
      <Text style={styles.overview}>{movie.overview}</Text>
      {movie?.videoList && (
        <TouchableOpacity style={styles.button} onPress={onPressVideo}>
          <Text style={styles.buttonText}>TRAILER</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    flex: 1,
    width: width,
    height: width,
  },
  button: {
    width: 200,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 10,
    marginLeft: 30,
    marginBottom: 50,
  },
  buttonText: {
    marginHorizontal: 10,
    fontSize: 22,
  },
  overview: {
    marginTop: 10,
    marginHorizontal: 10,
    fontSize: 22,
    paddingBottom: 40,
  },
});
