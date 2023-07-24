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

// @ts-ignore
const Stack = createNativeStackNavigator();


export const defaultUserData: userDataType = {
    userId: null,
    token: null,
    customerId: null
}

export const defaultProfile: userProfileType = {
    dateCreated: null,
    email: null,
    pseudo: null,
    dateUpdate: null,
    firstName: null,
    lastName: null
}

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

    return (
        <UserCtx.Provider value={{ currentUser, setCurrentUser }}>
            <UserProfileCtx.Provider value={{ userProfile, setUserProfile }}>
                <CriteriaCtx.Provider value={{ criteria, setCriteria }}>
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

                        <Stack.Screen name="Profile" component={ProfileView}
                                      options={{
                                          title: null,
                                          headerStyle: { backgroundColor: colors.primary }
                                      }} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </CriteriaCtx.Provider>
            </UserProfileCtx.Provider>
        </UserCtx.Provider>
    );
}