export const getIconTabs = ({ focused, routeName }) => {
  let color, iconName;
  if (routeName === "Movies") {
    color = focused ? "tomato" : "grey";
    iconName = focused ? "ios-film" : "ios-film-outline";
  } else if (routeName === "Favourites") {
    color = focused ? "tomato" : "grey";
    iconName = focused ? "md-list" : "md-list-outline";
  }
  return { color, iconName };
};
