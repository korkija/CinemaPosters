import { useDispatch, useSelector } from "react-redux";
import {
  favouritesSelector,
  movieDetailsSelector,
} from "../../redux/store/selectors/moviesSelector";
import {
  getMovieDetailsThunk,
  setFavouriteMovie,
} from "../../redux/store/actions/movieActions";
import React, { useCallback, useEffect } from "react";
import { HeartIcon } from "../../components/HeartIcon";
import { Linking } from "react-native";

export const useForDetailsMovieScreen = ({ navigation, id }) => {
  const dispatch = useDispatch();
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
  return { onPressVideo, movie };
};
