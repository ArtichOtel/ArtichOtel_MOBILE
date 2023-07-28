import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainView from "./views/MainView";
import ConnectionView from "./views/ConnectionView";
import SignUpView from "./views/SignUpView";
import ProfileView from "./views/ProfileView";
import PresentChamberView from "./views/PresentChamberView";
import { UserCtx, CriteriaCtx, UserProfileCtx, BookingCtx } from "./utils/context";

import colors from "./style/colors";
import React, { useEffect, useState } from 'react';
import { criteriaType, userProfileType, userDataType, bookingType } from "./utils/types";
import OptionsView from "./views/OptionsView";
import { defaultProfile, defaultUserData } from "./utils/defaults";
import { SvgUri } from "react-native-svg";
import { View } from "react-native";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export const defaultCriteria: criteriaType = {
  startDate: null,
  endDate: null,
  roomType: null,
  roomTitle: null,
  peopleNbr: 0
}

export const defaultBooking: bookingType = {
  reservationID: null,

}

export default function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<userDataType>(defaultUserData)
  const [criteria, setCriteria] = useState<criteriaType>(defaultCriteria)
  const [userProfile, setUserProfile] = useState<userProfileType>(defaultProfile)
  const [booking, setBooking] = useState<bookingType>(defaultBooking)
  const [fontsLoaded] = useFonts({
    "Bitter-Regular": require('./assets/fonts/Bitter/Bitter-Regular.ttf'),
    "NunitoSans-Regular": require('./assets/fonts/NunitoSans/NunitoSans_7pt-Regular.ttf')
  })

  useEffect(() => {

  }, [fontsLoaded])

  const screenOptions = {
    title: 'Home',
    headerStyle: { backgroundColor: colors.primary, colors: colors.secondary },
    headerTitle: () => <Logo />
  }

  function Logo() {
    return (
      <View>
        <SvgUri
          uri='https://api.artichotel.fr/icon/artichaut-mobile-logo.svg'
        />
      </View>
    )
  }

  return (
    <UserCtx.Provider value={{ currentUser, setCurrentUser }}>
      <UserProfileCtx.Provider value={{ userProfile, setUserProfile }}>
        <CriteriaCtx.Provider value={{ criteria, setCriteria }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={MainView}
                options={screenOptions} />

              <Stack.Screen name="Connection" component={ConnectionView}
                options={screenOptions} />

              <Stack.Screen name="SignUp" component={SignUpView}
                options={screenOptions} />

              <Stack.Screen name="Options" component={OptionsView}
                options={screenOptions} />

              <Stack.Screen name="Room" component={PresentChamberView}
                options={screenOptions} />

              <Stack.Screen name="Profile" component={ProfileView}
                options={screenOptions} />
            </Stack.Navigator>
          </NavigationContainer>
        </CriteriaCtx.Provider>
      </UserProfileCtx.Provider>
    </UserCtx.Provider>
  );
}