import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { ListMoviesScreen } from "../Screens/ListMoviesScreen";
import { DetailsMovieScreen } from "../Screens/DetailsMovieScreen";
import { ListFavouritesMoviesScreen } from "../Screens/ListFavouritesMoviesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getIconTabs } from "../Utils/navigationUtils";

const MoviesStack = createNativeStackNavigator();

function MoviesStackScreen() {
  return (
    <MoviesStack.Navigator>
      <MoviesStack.Screen name="MoviesList" component={ListMoviesScreen} />
    </MoviesStack.Navigator>
  );
}

const FavouritesStack = createNativeStackNavigator();

function FavouritesStackScreen() {
  return (
    <FavouritesStack.Navigator>
      <FavouritesStack.Screen
        name="FavouritesList"
        component={ListFavouritesMoviesScreen}
      />
    </FavouritesStack.Navigator>
  );
}

const MainStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{ headerShown: false }}
        name="TabNavigator"
        component={TabNavigator}
      />
      <FavouritesStack.Screen name="Details" component={DetailsMovieScreen} />
    </MainStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontSize: 20 },
        tabBarIcon: ({ focused }) => {
          let { iconName, color } = getIconTabs({
            focused,
            routeName: route.name,
          });
          return <Icon name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        // options={{ headerShown: false }}
        name="Movies"
        component={MoviesStackScreen}
      />
      <Tab.Screen
        // options={{ headerShown: false }}
        name="Favourites"
        component={FavouritesStackScreen}
      />
    </Tab.Navigator>
  );
};

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};
