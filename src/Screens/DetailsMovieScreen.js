import React, { useEffect } from "react";
import { StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-native-youtube";
import {
  getMovieDetailsThunk,
  setFavouriteMovie,
} from "../redux/store/actions/movieActions";
import { IMAGE_PATH } from "../../build.config";
import { movieDetailsSelector } from "../redux/store/selectors/moviesSelector";
import { HeartIcon } from "../components/HeartIcon";

const { width } = Dimensions.get("window");

export const DetailsMovieScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const id = route.params?.id;
  const movie = useSelector(movieDetailsSelector(id));

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
          <HeartIcon onPress={onPressHeart} isFavourite={movie?.isFavourite} />
        );
      },
    });
  }, [navigation, movie?.isFavourite]);
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
      {/*<Text style={styles.overview}>{movie.videoList[0]}</Text>*/}
      <Text style={styles.overview}>{movie.overview}</Text>
      <YouTube
        videoId="KVZ-P-ZI6W4" // The YouTube video ID
        play // control playback of video with true/false
        fullscreen // control whether the video should play in fullscreen or inline
        // loop // control whether the video should loop when ended
        // onReady={(e) => this.setState({ isReady: true })}
        // onChangeState={(e) => this.setState({ status: e.state })}
        // onChangeQuality={(e) => this.setState({ quality: e.quality })}
        // onError={(e) => this.setState({ error: e.error })}
        style={{ alignSelf: "stretch", height: 300 }}
      />
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
  overview: {
    marginTop: 10,
    marginHorizontal: 10,
    fontSize: 22,
    paddingBottom: 40,
  },
});
