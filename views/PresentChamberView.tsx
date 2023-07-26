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
import mainStyle from "../style/MainStyle";
import presentChamberStyle from "../style/presentChamberStyle";
import axios from "axios";

import { BookingCtx } from "../utils/context";
// @ts-ignore
import { API_URL } from "@env";

import ScrollView = Animated.ScrollView;
import React from "react";
import { CriteriaCtx, UserCtx } from "../utils/context";
import {getDiffDate} from "../utils/dates";

import optionStyle from "../style/optionsStyle";
import optionsStyle from "../style/optionsStyle";

type roomProps = {
  navigation: any,
  route: any,
};

export default function PresentChamberView(props: roomProps): JSX.Element {
  const { navigation, route } = props;
  const { criteria } = React.useContext(CriteriaCtx);
  const { currentUser } = React.useContext(UserCtx);
  const searchReservationsResult = route.params.searchReservationsResult[0];
  //console.log("searchReservationsResult",searchReservationsResult)
    const basePrice = searchReservationsResult.price * criteria.peopleNbr * getDiffDate(criteria.startDate, criteria.endDate)

  function navigationFlow() {
    //console.log("navigationFlow, currentUser", currentUser);
    currentUser.token
      ? navigation.navigate("Options", { searchReservationsResult: searchReservationsResult })
      : navigation.navigate("Connection", { nextScreen: "Options", searchReservationsResult: searchReservationsResult});
  }


  return ( !searchReservationsResult ? null :
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
        <View
          style={[
              Platform.OS === 'android' ?
                  presentChamberStyle.buttonPriceAndroid : presentChamberStyle.buttonPrice,
              presentChamberStyle.contentCenter
          ]}
        >
          <Text
            style={[presentChamberStyle.buttonTextColor, baseStyle.textTypo]}
          >
              {basePrice} €
          </Text>
        </View>
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
