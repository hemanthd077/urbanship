import * as React from 'react';
import {Image} from 'react-native'

//navigator
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//screens
import Login from './screens/scr/login'
import Signup from './screens/scr/signup'
import Home from './screens/scr/home'
import Loading from './screens/scr/Loading'
import Profile  from './screens/scr/profile'
import Cart  from './screens/scr/cart'


function Logo() {
  return (
    <Image
      source={require('./assets/logo-no-background.png')}
      style={{ width: 120, height: 25 }}
    />
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Loading"
          component={Loading}
          options={{
            headerTitle : "",
            headerBackImage: () => null, 
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        /> 
         <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: (props) => <Logo />,
            headerShadowVisible: false,
            headerBackVisible: false,
            gestureEnabled: false,
          }} 
        />
         <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{
            headerBackImage: () => null, 
            headerTitle: (props) => <Logo />,
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        /> 
        <Stack.Screen 
          name="Home" 
          component={Home.Home}
          options={{
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{
            headerBackVisible: true,
            headerTintColor:"#30c06b",
            title:null,
            headerShadowVisible: false,
          }} 
        />
        <Stack.Screen 
          name="Cart" 
          component={Cart}
          options={{
            headerShown: false
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
