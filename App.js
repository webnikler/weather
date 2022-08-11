import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Api from './core/api/Api';
import HomeScreen from './screens/HomeScreen';
import TommorowScreen from './screens/TommorowScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Api.Provider value={new Api()}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Tommorow"
            component={TommorowScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Api.Provider>
  );
}

export default App;
