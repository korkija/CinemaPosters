import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListMoviesScreen} from '../Screens/ListMoviesScreen';
import {DetailsMovieScreen} from '../Screens/DetailsMovieScreen';
import {ListFavouritesMoviesScreen} from '../Screens/ListFavouritesMoviesScreen';
// const RootStack = createStackNavigator();
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const MoviesStack = createNativeStackNavigator();

function MoviesStackScreen() {
    return (
        <MoviesStack.Navigator>
            <MoviesStack.Screen name="MoviesList" component={ListMoviesScreen} />
            <MoviesStack.Screen name="Details" component={DetailsMovieScreen} />
        </MoviesStack.Navigator>
    );
}

const FavouritesStack = createNativeStackNavigator();

function FavouritesStackScreen() {
    return (
        <FavouritesStack.Navigator>
            <FavouritesStack.Screen name="FavouritesList" component={ListFavouritesMoviesScreen} />
            <FavouritesStack.Screen name="Details" component={DetailsMovieScreen} />
        </FavouritesStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export const AppNavigation=()=> {
    return (
        <NavigationContainer>
            <Tab.Navigator  screenOptions={({ route }) => ({
                tabBarLabelStyle: {fontSize:20},
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'Movies') {
                        color=focused?'tomato':'grey';
                        iconName = focused
                            ? 'ios-film'
                            : 'ios-film-outline';
                    } else if (route.name === 'Favourites') {
                        color=focused?'tomato':'grey';
                        iconName = focused ? 'md-list' : 'md-list-outline';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={24} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen options={{headerShown: false}} name="Movies" component={MoviesStackScreen} />
                <Tab.Screen options={{headerShown: false}} name="Favourites" component={FavouritesStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

//
// options={{ title: 'hide' }}
//
// const RootStackNavigator = () => {
//     return (
//         <RootStack.Navigator
//             screenOptions={{cardStyle: {backgroundColor: 'transparent'}}}>
//             <RootStack.Screen
//                 name="ListMovies"
//                 component={ListPhotosScreen}
//                 options={{headerShown: false}}
//             />
//             <RootStack.Screen
//                 name="FavouritesMovies"
//                 component={DetailsPhotoScreen}
//                 options={{
//                     headerTitle: null,
//                     headerStyle: {
//                         backgroundColor: '#000',
//                     },
//                     headerTintColor: '#fff',
//                 }}
//             />
//         </RootStack.Navigator>
//     );
// };
//
// export const AppNavigation = () => {
//     return (
//         <NavigationContainer>
//             <RootStackNavigator />
//         </NavigationContainer>
//     );
// };
