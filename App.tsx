import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainView from "./views/MainView";
import ConnectionView from "./views/ConnectionView";


import colors from "./style/colors";
import React, {createContext, useEffect, useState} from 'react';
import {userDataType} from "./utils/types";

const Stack = createNativeStackNavigator();

// TODO : remove when ok
const defaultUserData = {
    userId: null,
    token: null,
    customerId: null
}

export const UserContext: React.Context<any> = createContext(null)

export default function App(): JSX.Element {
    const [currentUser, setCurrentUser] = useState<userDataType>(defaultUserData)

  return (
       <UserContext.Provider value={{currentUser, setCurrentUser}}>
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
              </Stack.Navigator>
          </NavigationContainer>
      </UserContext.Provider>
  );
}