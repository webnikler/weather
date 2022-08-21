import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLocation } from './core/location/location';
import HomeScreen from './screens/HomeScreen';
import TommorowScreen from './screens/TommorowScreen';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
  const { loading, coords, error } = useLocation();

  return (
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
  );
}

export default App;
