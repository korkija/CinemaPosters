import { StyleSheet, Animated } from "react-native";
import React, { useMemo } from "react";

export const HeaderHiding = ({ ListHeaderComponent, translateY }) => {
  const headerStyle = useMemo(
    () => [
      styles.animateHeader,
      {
        transform: [{ translateY }],
      },
    ],
    [translateY]
  );

  return (
    !!ListHeaderComponent && (
      <Animated.View style={headerStyle}>{ListHeaderComponent}</Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  animateHeader: {
    position: "absolute",
    marginHorizontal: "1%",
    width: "98%",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 50,
    elevation: 50,
  },
});
