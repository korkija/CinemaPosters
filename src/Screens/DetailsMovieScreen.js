import React from 'react';
import {
    View, Text,
} from 'react-native';

export const DetailsMovieScreen = ({navigation}) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'HELLO' ,
        });
    }, [navigation]);

  return (
      <View >
        <Text>DetailsMovieScreen</Text>
      </View>
  );
};
