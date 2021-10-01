import React, { useCallback, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieDetailsThunk,
  setFavouriteMovie,
} from "../redux/store/actions/movieActions";
import { IMAGE_PATH } from "../../build.config";
import {
  movieDetailsSelector,
  favouritesSelector,
} from "../redux/store/selectors/moviesSelector";
import { HeartIcon } from "../components/HeartIcon";

const { width } = Dimensions.get("window");

export const DetailsMovieScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const id = route.params?.id;
  const movie = useSelector(movieDetailsSelector(id));
  const favourites = useSelector(favouritesSelector);

  const onPressHeart = () => {
    dispatch(setFavouriteMovie(id));
  };

  useEffect(() => {
    dispatch(getMovieDetailsThunk(id));
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: movie?.title,
      headerRight: () => {
        return (
          <HeartIcon
            onPress={onPressHeart}
            isFavourite={favourites.find((item) => item === movie?.id)}
          />
        );
      },
    });
  }, [navigation, favourites, movie?.title]);

  const onPressVideo = useCallback(() => {
    Linking.openURL(
      "https://www.youtube.com/watch?v=" + movie?.videoList?.[0]?.key
    );
  }, [movie?.videoList?.[0]?.key]);

  console.log("movie", movie);
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
