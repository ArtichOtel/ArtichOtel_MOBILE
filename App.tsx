import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainView from "./views/MainView";
import ConnectionView from "./views/ConnectionView";
import PresentChamberView from "./views/PresentChamberView";

import colors from "./style/colors";
import React, { createContext, useEffect, useState } from 'react';
import { criteriaType, userDataType } from "./utils/types";
import OptionsView from "./views/OptionsView";

const Stack = createNativeStackNavigator();

// TODO : remove when ok
const defaultUserData = {
    userId: null,
    token: null,
    customerId: null
}

const defaultCriteria = {
    arrivalDate: null,
    departureDate: null,
    roomTypes: "Chambre standard",
    peopleNbr: 2
}

export const UserContext: React.Context<any> = createContext(null)
export const CriteriaContext: React.Context<any> = createContext(null)

export default function App(): JSX.Element {
    const [currentUser, setCurrentUser] = useState<userDataType>(defaultUserData)
    const [criteria, setCriteria] = useState<criteriaType>(defaultCriteria)

  return (
       <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <CriteriaContext.Provider value={{criteria, setCriteria}}>
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Main" component={MainView}
                                options={{
                                    title: null,
                                    headerStyle: { backgroundColor: colors.primary }
                                }} />
                    <Stack.Screen name="Connection" component={ConnectionView}
                                options={{
                                    title: null,
                                    headerStyle: { backgroundColor: colors.primary }
                                }} />
                                
                    <Stack.Screen name="Room" component={PresentChamberView}
                                options={{
                                    title: null,
                                    headerStyle: { backgroundColor: colors.primary }
                                }} />
                    <Stack.Screen name="Options" component={OptionsView}
                                options={({
                                    title: null,
                                    headerStyle: { backgroundColor : colors.primary }
                                })} />
              </Stack.Navigator>
            </NavigationContainer>
          </CriteriaContext.Provider>
      </UserContext.Provider>

  );
}