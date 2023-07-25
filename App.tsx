import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainView from "./views/MainView";
import ConnectionView from "./views/ConnectionView";
import SignUpView from "./views/SignUpView";
import ProfileView from "./views/ProfileView";
import PresentChamberView from "./views/PresentChamberView";
import { UserCtx, CriteriaCtx, UserProfileCtx } from "./utils/context";

import colors from "./style/colors";
import React, { useState } from 'react';
import { criteriaType, userProfileType, userDataType } from "./utils/types";
import OptionsView from "./views/OptionsView";
import { defaultProfile, defaultUserData } from "./utils/defaults";
import { SvgUri } from "react-native-svg";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

export const defaultCriteria: criteriaType = {
  startDate: null,
  endDate: null,
  roomTypes: "Chambre standard",
  peopleNbr: 0,
}

export default function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<userDataType>(defaultUserData)
  const [criteria, setCriteria] = useState<criteriaType>(defaultCriteria)
  const [userProfile, setUserProfile] = useState<userProfileType>(defaultProfile)

  const screenOptions = {
    title: 'Home',
    headerStyle: { backgroundColor: colors.primary, colors: colors.secondary },
    headerTitle: () => <Logo />
  }

  function Logo () {
    return (
      <View>
        <SvgUri
          uri='https://api.artichotel.fr/icon/artichaut-mobile-logo.svg'
          color={'white'}
          fill={'white'}
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