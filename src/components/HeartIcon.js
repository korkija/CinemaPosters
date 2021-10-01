import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import React from "react";

export const HeartIcon = ({ isFavourite, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        name={isFavourite ? "ios-heart" : "ios-heart-outline"}
        size={34}
        color="red"
      />
    </TouchableOpacity>
  );
};
