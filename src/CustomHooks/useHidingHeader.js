import React, { useCallback, useRef } from "react";
import { Animated } from "react-native";
export const useHidingHeader = ({ ListHeaderComponent }) => {
  const translateY = useRef(new Animated.Value(1)).current;

  const scrollBeginDrag = useCallback(() => {
    if (ListHeaderComponent) {
      Animated.timing(translateY, {
        toValue: -200,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [translateY]);

  const scrollEndDrag = useCallback(() => {
    if (ListHeaderComponent) {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [translateY]);

  return { translateY, scrollBeginDrag, scrollEndDrag };
};
