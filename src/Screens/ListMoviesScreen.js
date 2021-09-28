import React from 'react';
import {
  View, Text,
} from 'react-native';

export const ListMoviesScreen = ({navigation}) => {

    const onPressText=()=>{
        navigation.navigate('Details');
    }

  return (
    <View >
      <Text onPress={onPressText}>ListMoviesScreen</Text>
    </View>
  );
};


