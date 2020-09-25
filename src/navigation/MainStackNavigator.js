  
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import NodeScreen from '../screens/nodescreen'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName='Home'
      screenOptions={{
        gestureEnabled: true,
        headerShown: false
      }}>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home Screen', headerStyle: {
          },}}
        />
        <Stack.Screen
          name='nodescreen'
          component={NodeScreen}
          options={{ title: 'Node', headerStyle: {
            backgroundColor: '#ffff'
          },}}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator