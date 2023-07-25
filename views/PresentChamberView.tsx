import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBed,
  faShower,
  faTelevision,
  faSmokingBan,
  faBellConcierge,
  faClock,
  faKitchenSet,
} from "@fortawesome/free-solid-svg-icons";
import baseStyle from "../style/baseStyle";
import presentChamberStyle from "../style/presentChamberStyle";

import ScrollView = Animated.ScrollView;
import React from "react";
import { CriteriaCtx, UserCtx } from "../utils/context";

type roomProps = {
  navigation: any;
  route: any;
};

export default function PresentChamberView(props: roomProps): JSX.Element {
  const { navigation, route } = props;
  const { criteria } = React.useContext(CriteriaCtx);
  const { currentUser, setCurrentUser } = React.useContext(UserCtx);
  const searchReservationsResult = route.params.searchReservationsResult[0];

  function navigationFlow() {
    console.log("navigationFlow, currentUser", currentUser);
    currentUser.token
      ? navigation.navigate("Options")
      : navigation.navigate("Connection");
  }

  // console.log('search', route.params.searchReservationsResult)

  return (
    <View style={presentChamberStyle.centerContainer}>
      <View style={[presentChamberStyle.infoBox]}>
        <Text>{criteria.peopleNbr} personnes - </Text>
        <Text>{criteria.startDate.toDateString()} - </Text>
        <Text>{criteria.endDate.toDateString()}</Text>
      </View>

      <ScrollView>
        <Image
          source={require("../assets/images/chambreHotel.jpg")}
          style={[presentChamberStyle.scrollImage]}
        />
        <Text
          style={[
            baseStyle.title,
            {
              fontSize: 25,
              alignItems: "flex-start",
              marginBottom: 5,
            },
          ]}
        >
          {searchReservationsResult?.title["fr_FR"]}
        </Text>

        <Text style={[baseStyle.textTypo, presentChamberStyle.scrollText]}>
          {searchReservationsResult?.description["fr_FR"]}
        </Text>

        <View
          style={[
            presentChamberStyle.arrivalHourContainer,
            presentChamberStyle.contentCenter,
          ]}
        >
          <FontAwesomeIcon
            icon={faClock}
            size={40}
            style={{ marginRight: 15 }}
          />
          <Text style={baseStyle.textTypo}> Arrivée entre 13h00 et 18h00</Text>
        </View>

        <View style={[presentChamberStyle.advantagesContainer]}>
          <View style={[presentChamberStyle.columnContainer]}>
            <View
              style={[
                presentChamberStyle.itemContainer,
                presentChamberStyle.contentCenter,
              ]}
            >
              <FontAwesomeIcon
                icon={faShower}
                size={40}
                style={{ marginRight: 15 }}
              />
              <Text style={baseStyle.textTypo}>Douche</Text>
            </View>
            <View
              style={[
                presentChamberStyle.itemContainer,
                presentChamberStyle.contentCenter,
              ]}
            >
              <FontAwesomeIcon
                icon={faBed}
                size={40}
                style={{ marginRight: 15 }}
              />
              <Text style={baseStyle.textTypo}>Grand lit</Text>
            </View>
            <View
              style={[
                presentChamberStyle.itemContainer,
                presentChamberStyle.contentCenter,
              ]}
            >
              <FontAwesomeIcon
                icon={faSmokingBan}
                size={40}
                style={{ marginRight: 10 }}
              />
              <Text style={baseStyle.textTypo}>Ne pas fumer</Text>
            </View>
          </View>
          <View style={[presentChamberStyle.columnContainer]}>
            <View
              style={[
                presentChamberStyle.itemContainer,
                presentChamberStyle.contentCenter,
              ]}
            >
              <FontAwesomeIcon
                icon={faTelevision}
                size={40}
                style={{ marginRight: 15 }}
              />
              <Text style={baseStyle.textTypo}>Télévision</Text>
            </View>
            <View
              style={[
                presentChamberStyle.itemContainer,
                presentChamberStyle.contentCenter,
              ]}
            >
              <FontAwesomeIcon
                icon={faKitchenSet}
                size={40}
                style={{ marginRight: 15 }}
              />
              <Text style={baseStyle.textTypo}>Frigo et Cuisine</Text>
            </View>
            <View
              style={[
                presentChamberStyle.itemContainer,
                presentChamberStyle.contentCenter,
              ]}
            >
              <FontAwesomeIcon
                icon={faBellConcierge}
                size={40}
                style={{ marginRight: 5 }}
              />
              <Text style={baseStyle.textTypo}>Service Chambre</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          presentChamberStyle.buttonBackgroundContainer,
          presentChamberStyle.contentCenter,
        ]}
      >
        <TouchableOpacity
          style={[
            presentChamberStyle.buttonPrice,
            presentChamberStyle.contentCenter,
          ]}
        >
          <Text
            style={[presentChamberStyle.buttonTextColor, baseStyle.textTypo]}
          >
            {searchReservationsResult.price * criteria.peopleNbr}€
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[presentChamberStyle.buttonValid]}
          onPress={navigationFlow}
        >
          <Text
            style={[presentChamberStyle.buttonTextColor, baseStyle.textTypo]}
          >
            Sélectionner
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
