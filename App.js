import React from 'react';
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import store from './store'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './src/screens/LoginScreen'
import PlayGame from './src/screens/PlayGame'
import FinishScreen from './src/screens/FinishScreen'

export default function App() {

  const Stack = createStackNavigator()

  return ( 
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={ LoginScreen } options={{ headerShown:false }} />
            <Stack.Screen name="Play" component={ PlayGame } options={{ headerShown:false }} />
            <Stack.Screen name="Finish" component={ FinishScreen } options={{ headerShown:false }} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );  
}