import { StyleSheet } from "react-native";
import colors from "./colors";
import { color, withTiming } from "react-native-reanimated";

const presentChamberStyle = StyleSheet.create({
  contentCenter: {
    alignItems: "center",
    gap: 5,
  },

  advantagesContainer: {
    flexDirection: "row",
  },

  columnContainer: {
    marginRight: 15,
  },

  itemContainer: {
    flexDirection: "row",
    marginTop: 30,
  },

  arrivalHourContainer: {
    flexDirection: "row",
    marginTop: 15,
  },

  centerContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  infoBox: {
    display: "flex",
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 350,
    height: 50,
    borderRadius: 10,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: colors.primary,
  },

  scrollContainer: {
    //TODO :delete backgroundColor
    backgroundColor: "red",
  },

  scrollText: {
    lineHeight: 30,
  },

  scrollImage: {
    backgroundColor: "blue",
    marginTop: 15,
    width: "auto",
    height: 150,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },

  buttonPrice: {
    justifyContent: "center",
    backgroundColor: colors.tertiary,
    marginLeft: 25,
    marginBottom: 0,
    borderRadius: 5,
    height: 40,
    width: 110,

  },

  buttonPriceAndroid: {
    justifyContent: "center",
    backgroundColor: colors.tertiary,
    marginLeft: 8,
    marginBottom: 0,
    height: 40,
    width: 110,
  },

  buttonValid: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tertiary,
    marginRight: 15,
    marginLeft: 10,
    marginBottom: 0,
    borderRadius: 5,
    height: 40,
    width: 220,
  },

  buttonTextColor: {
    color: colors.primary,
    fontWeight: "bold",
  },

  buttonBackgroundContainer: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 75,
    flexDirection: "row",
  },
});

export default presentChamberStyle;
