import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainView from "./views/MainView";
import ConnectionView from "./views/ConnectionView";
import SignUpView from "./views/SignUpView";
import PresentChamberView from "./views/PresentChamberView";
import colors from "./style/colors";
import React, { createContext, useEffect, useState } from 'react';
import {criteriaType, userProfileType, userDataType} from "./utils/types";

const Stack = createNativeStackNavigator();


const defaultUserData: userDataType = {
    userId: null,
    token: null,
    customerId: null
}

const defaultProfile: userProfileType = {
    dateCreated: null,
    email: null,
    pseudo: null,
    dateUpdate: null,
    //firstName: null,
    //lastName: null
}

const defaultCriteria: criteriaType = {
    arrivalDate: null,
    departureDate: null,
    roomTypes: "Chambre standard",
    peopleNbr: 2
}

export const UserContext: React.Context<any> = createContext(null)
export const CriteriaContext: React.Context<any> = createContext(null)
export const UserProfileContext: React.Context<any> = createContext(null)


export default function App(): JSX.Element {
    const [currentUser, setCurrentUser] = useState<userDataType>(defaultUserData)
    const [criteria, setCriteria] = useState<criteriaType>(defaultCriteria)
    const [userProfile, setUserProfile] = useState<userProfileType>(defaultProfile)

  return (
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <UserProfileContext.Provider value={{userProfile, setUserProfile}}>
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
                          <Stack.Screen name="SignUp" component={SignUpView}
                                        options={{
                                            title: null,
                                            headerStyle: { backgroundColor: colors.primary }
                                        }} />

                          <Stack.Screen name="Room" component={PresentChamberView}
                                        options={{
                                            title: null,
                                            headerStyle: { backgroundColor: colors.primary }
                                        }} />
                      </Stack.Navigator>
                  </NavigationContainer>
              </CriteriaContext.Provider>
          </UserProfileContext.Provider>
      </UserContext.Provider>
  );
}