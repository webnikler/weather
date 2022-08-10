import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title='Go to Tommorow'
        onPress={() => navigation.navigate('Tommorow')}
      />
    </View>
  );
}

export default HomeScreen;